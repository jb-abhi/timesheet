import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { AdminComponent } from './admin/admin.component';
import { SidenavComponent } from './admin/sidenav/sidenav.component';
import { UserpageComponent } from './userpage/userpage.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminhomeComponent } from './admin/pages/adminhome/adminhome.component';
import { UserprofilesComponent } from './admin/pages/userprofiles/userprofiles.component';
import { UserformsComponent } from './admin/pages/userprofiles/userforms/userforms.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    AdminComponent,
    SidenavComponent,
    UserpageComponent,
    AdminhomeComponent,
    UserprofilesComponent,
    UserformsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
