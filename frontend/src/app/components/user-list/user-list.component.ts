import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserListCrudService } from 'src/app/services/user-list-crud.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { stringify } from 'querystring';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  newUserForm: FormGroup;

  users$:Observable<User[]>
  constructor(private userListCrudService:UserListCrudService,private router: Router) { }

  ngOnInit(): void {
    this.users$ = this.userListCrudService.fetchAll()
    this.newUserForm = this.createFormGroup();
  }

  createFormGroup():FormGroup{
    return new FormGroup({
      email: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required]),
      role: new FormControl("",[Validators.required])
      //, role: new FormControl("user")
    });
  }

  // post(email: String, password:String):void{
  //   const inpOne = email.trim();
  //   const inpTwo = password.trim();
  //   if(!inpOne || !inpTwo){
  //     return;
  //   }

  //   console.log(inpOne);
  //   console.log(inpTwo);
  //   //this.users$ = 
  //   this.userListCrudService.post(inpOne,inpTwo);
  // }

  div1:boolean=false;
  div2:boolean=false;
  post():void{
    const inpOne = this.newUserForm.controls['email'].value.trim()
    const inpTwo = this.newUserForm.controls['password'].value.trim()
    const inpThree = this.newUserForm.controls['role'].value.trim()

    if(!inpOne || !inpTwo || !inpThree){
      return;
    }

    if(inpThree.toLowerCase() === "user" || inpThree.toLowerCase() === "admin"){
      console.log(this.newUserForm.value);
      console.log(inpOne);
      console.log(inpTwo);
      console.log(inpThree);
      this.userListCrudService.post(this.newUserForm.value).subscribe();
      this.div2=true;
      if(this.div1==true){
        this.div1 = false;
      }
    }
    else{
      console.log("invalid input");
      console.log(this.newUserForm.value);
      console.log(inpOne);
      console.log(inpTwo);
      console.log(inpThree);
      this.div1=true;
      if(this.div2==true){
        this.div2 = false;
      }
    }
    //this.userListCrudService.post(this.newUserForm.value).subscribe();
    //window.location.reload();
  }

  // div1:boolean=false;
  // div1func(){
  //   if(this.div1==false){
  //     this.div1=true;
  //   }
  //   else{
  //     this.div1=false;
  //   }
    
  // }

  addUser:boolean=false;
  addUserfunc(){
    if(this.addUser==false){
      this.addUser=true;
    }
    else{
      this.addUser=false;
    }
    
  }

  showUser:boolean=false;
  showUserfunc(){
    if(this.showUser==false){
      this.showUser=true;
    }
    else{
      this.showUser=false;
    }
    
  }
  
  delete(id:number):void{
    this.userListCrudService.delete(id).subscribe();
    var loggedInUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if(loggedInUser.id==id){
      sessionStorage.removeItem('currentUser');
      this.router.navigate([""]);
    }
    else{
      window.location.reload();
    }
    
  }

  deleteSessionUserInfo():void{
    sessionStorage.removeItem('currentUser');
  }
}
