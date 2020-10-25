import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserListCrudService } from 'src/app/services/user-list-crud.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  newUserForm: FormGroup;

  users$:Observable<User[]>
  constructor(private userListCrudService:UserListCrudService) { }

  ngOnInit(): void {
    this.users$ = this.userListCrudService.fetchAll()
    this.newUserForm = this.createFormGroup();
  }

  createFormGroup():FormGroup{
    return new FormGroup({
      email: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required])
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

  post():void{
    //console.log(this.newUserForm.value);
    this.userListCrudService.post(this.newUserForm.value).subscribe();
    window.location.reload();
  }
}
