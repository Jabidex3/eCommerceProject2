import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {User} from '../models/User'
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserListCrudService {

  private url = "http://localhost:3000/all";

  constructor(private http: HttpClient) { }

  fetchAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url, {responseType:"json"});//.pipe(tap((_)=>console.log("fetched groceries")));
  }
}
