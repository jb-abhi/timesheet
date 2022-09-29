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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminhomeComponent } from './admin/pages/adminhome/adminhome.component';
import { UserprofilesComponent } from './admin/pages/userprofiles/userprofiles.component';
import { UserformsComponent } from './admin/pages/userprofiles/userforms/userforms.component';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ConfirmationService, MessageService } from 'primeng/api';
import { JwtInterceptor } from './interceptor';
import { HeaderComponent } from './userpage/header/header.component';
import { UserdashboardComponent } from './userpage/pages/userdashboard/userdashboard.component';
import { TasklistComponent } from './userpage/pages/userdashboard/tasklist/tasklist.component';

const ADMIN_MODULE = [
  ConfirmDialogModule,
  TableModule,
  ToolbarModule,
  CardModule,
  ToastModule,
  ScrollTopModule,
  DialogModule,
];

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
    HeaderComponent,
    UserdashboardComponent,
    TasklistComponent,
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
    ...ADMIN_MODULE,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
