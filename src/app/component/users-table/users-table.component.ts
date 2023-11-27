import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { UserService } from "../../services/user.service";

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  birthDay: Date;
}

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit {
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'username', 'password', 'email', 'firstName', 'lastName', 'age', 'birthDay', 'actions'];

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchUserData();

    // Subscribe to user data changes from the service
    this.userService.userData$.subscribe(data => {
      // Update the data source with the new data
      this.dataSource.data = [...this.dataSource.data, ...data];
    });
  }

  fetchUserData() {
    const apiUrl = 'http://localhost:8080/users/getUsers?includeDetails=true';

    this.http.get<User[]>(apiUrl).subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource<User>(data);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  openEditDialog(user: User): void {
    const dialogRef = this.dialog.open(EditModalComponent, {
      width: '400px',
      data: user,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle edit logic, e.g., update user on the backend
        const editUrl = `http://localhost:8080/users/editUser/${result.id}`;
        this.http.put(editUrl, result).subscribe(
          (response) => {
            console.log('User edited successfully:', response);
            this.fetchUserData(); // Refresh data after edit
          },
          (error) => {
            console.error('Error editing user:', error);
            // Optionally, provide user feedback about the error
          }
        );
      }
    });
  }

  deleteRow(user: User): void {
    const deleteUrl = `http://localhost:8080/users/deleteUser/${user.id}`;
    this.http.delete(deleteUrl).subscribe(
      (response) => {
        console.log('User deleted successfully:', response);
        this.fetchUserData();

      },
      (error) => {
        console.error('Error deleting user:', error);
        window.location.reload();
      }
    );
  }
}
