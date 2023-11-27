import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {CreateModalComponent} from "../create-modal/create-modal.component";


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  constructor(private dialog: MatDialog) { }

  openFormModal(): void {
    const dialogRef = this.dialog.open(CreateModalComponent, {
      width: '400px', // Set the width according to your design
      data: {
        // Pass any data you want to the modal here
      }
    });

    // Handle data returned from the modal if needed
    dialogRef.afterClosed().subscribe(result => {
      // Handle the result here
      console.log('Dialog closed with result:', result);
    });
  }
}
