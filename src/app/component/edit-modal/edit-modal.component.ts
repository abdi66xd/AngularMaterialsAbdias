import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: HttpClient,
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
      // Make the HTTP PUT request for editing
      const apiUrl = `http://localhost:8080/users/editUser/${this.data.id}`;
      const userPayload = this.userForm.value;

      this.http.put(apiUrl, userPayload).subscribe(
        (response) => {
          console.log('User edited successfully:', response);
          this.dialogRef.close(userPayload);
        },
        (error) => {
          console.error('Error editing user:', error);
          // Optionally, provide user feedback about the error
        }
      );
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
