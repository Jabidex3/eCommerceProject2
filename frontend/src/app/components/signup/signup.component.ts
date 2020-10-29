import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { UserListCrudService } from 'src/app/services/user-list-crud.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private userListCrudService:UserListCrudService,private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.createFormGroup();
  }

  createFormGroup():FormGroup{
    return new FormGroup({
      email: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required]),
      reenterPassword: new FormControl("",[Validators.required]),
      role: new FormControl("user")
      //, role: new FormControl("user")
    });
  }

  div1:boolean=false;
  post():void{
    const inpOne = this.registerForm.controls['email'].value.trim()
    const inpTwo = this.registerForm.controls['password'].value.trim()
    const inpThree = this.registerForm.controls['reenterPassword'].value.trim()
    this.registerForm.controls['role'].setValue("user");
    if(!inpOne || !inpTwo || !inpThree){
      return;
    }

    if(this.registerForm.controls['password'].value ==  this.registerForm.controls['reenterPassword'].value){
      this.registerForm.removeControl('reenterPassword');
      console.log(this.registerForm.value);
      this.userListCrudService.post(this.registerForm.value).subscribe();
      this.router.navigate(["login"]);
    }
    else{
      this.div1=true;
      console.log("Invalid Inputs! Try Again!");
      console.log(this.registerForm.value);
    }
    
  }
}
