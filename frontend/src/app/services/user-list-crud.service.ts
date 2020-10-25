import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {User} from '../models/User'
import { Observable } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserListCrudService {

  private url = "http://localhost:3000/all";
  private urltwo = "http://localhost:3000/register";

  httpOptions: {headers: HttpHeaders} = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  };

  constructor(private http: HttpClient) { }

  fetchAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url, {responseType:"json"});//.pipe(tap((_)=>console.log("fetched users")));
  }

  // post(email: String, password: String): Observable<any>{
  //   return this.http.post<any>(this.urltwo,{email:email,password:password},this.httpOptions);
  // }

  post(user: Omit<User, "id">): Observable<User>{
    return this.http.post<User>(this.urltwo,user,this.httpOptions).pipe(first());
  }
}
