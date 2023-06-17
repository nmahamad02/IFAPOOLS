import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SharedModule } from '../../archive/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const authenticationRoutes = [
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    component: SigninComponent
  }
];

@NgModule({
  declarations: [
    SigninComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(authenticationRoutes)
  ]
})
export class AuthenticationModule { }
