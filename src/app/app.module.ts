import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { AddUserComponent } from './component/add-user/add-user.component';
import { UserListingComponent } from './component/user-listing/user-listing.component';
import { CreateModalComponent } from './component/create-modal/create-modal.component';
import {MatButtonModule} from "@angular/material/button";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import { UsersTableComponent } from './component/users-table/users-table.component';
import {MatTableModule} from "@angular/material/table";
import { EditModalComponent } from './component/edit-modal/edit-modal.component';

@NgModule({
  declarations: [AppComponent, AddUserComponent, UserListingComponent, CreateModalComponent, UsersTableComponent, EditModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
