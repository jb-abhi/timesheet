import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminhomeComponent } from './admin/pages/adminhome/adminhome.component';
import { UserformsComponent } from './admin/pages/userprofiles/userforms/userforms.component';
import { UserprofilesComponent } from './admin/pages/userprofiles/userprofiles.component';
import { Adminguard } from './guards/adminguard.service';
import { AuthGuard } from './guards/authguard.service';
import { Roleguard } from './guards/roleguard.service';
import { RegistrationComponent } from './registration/registration.component';
import { UnderconstructionComponent } from './userpage/pages/underconstruction/underconstruction.component';
import { UserdashboardComponent } from './userpage/pages/userdashboard/userdashboard.component';
import { UserpageComponent } from './userpage/userpage.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: RegistrationComponent },
  {
    path: '',
    canActivate: [AuthGuard, Roleguard],
    data: { expectedRoles: 'user' },
    children: [
      {
        path: 'dashboard',
        component: UserpageComponent,
        children: [
          { path: 'home', component: UserdashboardComponent },
          { path: 'info', component: UnderconstructionComponent },
          { path: 'overview', component: UnderconstructionComponent },
        ],
      },
    ],
  },

  {
    path: '',
    canActivate: [AuthGuard, Roleguard],
    data: { expectedRoles: 'admin' },
    children: [
      {
        path: 'admin',
        component: AdminComponent,
        children: [
          { path: 'home', component: AdminhomeComponent },
          { path: 'userprofiles', component: UserprofilesComponent },
          { path: 'userprofiles/forms', component: UserformsComponent },
          { path: 'userprofiles/forms/:id', component: UserformsComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
