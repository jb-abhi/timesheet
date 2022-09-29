import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminhomeComponent } from './admin/pages/adminhome/adminhome.component';
import { UserformsComponent } from './admin/pages/userprofiles/userforms/userforms.component';
import { UserprofilesComponent } from './admin/pages/userprofiles/userprofiles.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserpageComponent } from './userpage/userpage.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: RegistrationComponent },

  { path: 'dashboard/home', component: UserpageComponent },
  {
    path: '',
    // canActivate:[AdminAuthGuard],
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
