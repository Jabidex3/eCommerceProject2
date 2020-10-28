import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './components/user-list/user-list.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"user", component: UserComponent},
  {path:"admin", component: UserListComponent},
  {path:"register", component: SignupComponent},
  {path:"login", component: LoginComponent},
  {path:"**", redirectTo: ""},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
