import { Component, OnInit } from '@angular/core';
import { UserListCrudService } from 'src/app/services/user-list-crud.service';
import { Router } from "@angular/router";
import { User } from 'src/app/models/User';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  loggedInUser$:User;
  updateUserForm: FormGroup;
  constructor(private userListCrudService:UserListCrudService,private router: Router) { }

  ngOnInit(): void {
    this.loggedInUser$=JSON.parse(sessionStorage.getItem('currentUser'));
    this.updateUserForm = this.createFormGroup();
    this.userName();
  }

  createFormGroup():FormGroup{
    return new FormGroup({
      id: new FormControl(this.loggedInUser$.id,[Validators.required]),
      email: new FormControl(this.loggedInUser$.email,[Validators.required]),
      password: new FormControl(this.loggedInUser$.password,[Validators.required]),
      role: new FormControl(this.loggedInUser$.role,[Validators.required])
    });
  }

  deleteSessionUserInfo():void{
    sessionStorage.removeItem('currentUser');
  }

  displayPerson():void{
    console.log(this.loggedInUser$);
    let myContainer = document.getElementById('last') as HTMLElement;
    myContainer.innerHTML = "hello";
  }

  userName():void{
    console.log(this.loggedInUser$);
    let myContainer2 = document.getElementById('hiName') as HTMLElement;
    myContainer2.innerHTML = "Hello <b>" + this.loggedInUser$.email + "</b> !!!";
  }
  

  delete():void{
    this.userListCrudService.delete(this.loggedInUser$.id).subscribe();
    sessionStorage.removeItem('currentUser');
    this.router.navigate([""]);
  }
  update():void{
    console.log(this.updateUserForm.value);
    // this.userListCrudService.update(this.loggedInUser$.id).subscribe();
    // sessionStorage.removeItem('currentUser');
    // this.router.navigate([""]);
    this.userListCrudService.update(this.updateUserForm.value).subscribe();
    sessionStorage.setItem('currentUser',JSON.stringify(this.updateUserForm.value));
   // window.location.reload();
  }

  showDetails:boolean=false;
  showUserDetailfunc():void{
    if(this.showDetails==false){
      this.showDetails = true;
    }
    else{
      this.showDetails=false;
    }
  }

  
}
