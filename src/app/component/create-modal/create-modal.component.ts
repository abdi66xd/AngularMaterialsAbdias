// create-modal.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss']
})
export class CreateModalComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: HttpClient,
    private userService: UserService
  ) {
    this.userForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      id: [this.data.id],
      username: [this.data.username, Validators.required],
      password: [this.data.password, Validators.required],
      email: [this.data.email, [Validators.required, Validators.email]],
      firstName: [this.data.firstName],
      lastName: [this.data.lastName],
      age: [this.data.age, [Validators.min(0)]],
      birthDay: [this.data.birthDay],
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const apiUrl = 'http://localhost:8080/users/createUser';
      const userPayload = this.userForm.value;
      console.log(userPayload);

      this.http.post(apiUrl, userPayload).subscribe(
        (response) => {
          console.log('User created successfully:', response);
          this.userService.updateUserList(response);
          this.dialogRef.close(userPayload);

        },
        (error) => {
          console.error('Error creating user:', error);
        }
      );
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
