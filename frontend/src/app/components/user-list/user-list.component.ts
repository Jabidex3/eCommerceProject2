import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserListCrudService } from 'src/app/services/user-list-crud.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$:Observable<User[]>
  constructor(private userListCrudService:UserListCrudService) { }

  ngOnInit(): void {
    this.users$ = this.userListCrudService.fetchAll()
  }

}
