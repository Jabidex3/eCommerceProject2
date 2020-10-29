import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { UserListCrudService } from 'src/app/services/user-list-crud.service';
import { Router } from "@angular/router";
import { async, Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { TestBed } from '@angular/core/testing';
import { flatMap, isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user$:Observable<User[]>;
  test$:User;
  test2$:User[];
  loginForm: FormGroup;
  constructor(private userListCrudService:UserListCrudService,private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.createFormGroup();
    this.user$ = null;
    // this.user$ = [
    //   {
    //     "id":1,
    //     "email":"test",
    //     "password":"test",
    //     "role": "user"
    //   }
    // ];
  }

  createFormGroup():FormGroup{
    return new FormGroup({
      email: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required]),
    });
  }

  div1:boolean=false;

  async checkUser():Promise<void>{
    const inpOne = this.loginForm.controls['email'].value.trim()
    const inpTwo = this.loginForm.controls['password'].value.trim()
    if(!inpOne || !inpTwo){
      return;
    }
    console.log(this.loginForm.value);
    console.log(inpOne);
    console.log(inpTwo);
    this.user$ = this.userListCrudService.checkUser(inpOne,inpTwo);
    
    //  localStorage.setItem('currentUserEmail', inpOne);
    //  localStorage.setItem('currentUserPass', inpTwo);

   // this.user$ .forEach(value => console.​log(value));
    this.user$ .forEach(value => console.​log([value][0][0]));
    this.user$ .forEach(value => console.​log([value][0][1]));
    this.user$ .forEach(value => console.​log([value][0].length));
   try{
    await this.user$ .forEach(value => sessionStorage.setItem('currentUser',JSON.stringify([value][0][0])));
   }
   catch{
    this.div1 = true;
    console.log('invalid credentials');
   }
    
    var tester = JSON.parse(sessionStorage.getItem('currentUser'));

    if(tester==null){
      console.log('invalid credentials');
    }
    else if(tester.role.toLowerCase()=="admin"){
      this.div1 = false;
      this.router.navigate(["admin"]);
      //localStorage.removeItem('currentUser');
    }
    else{
      this.div1 = false;
      this.router.navigate(["user"]); //localStorage.removeItem('currentUser');
    }
  }

}
