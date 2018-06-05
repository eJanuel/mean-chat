import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FriendService {

  private _friendsUrl = 'http://localhost:3000/api/friends';
  private _usersUrl = 'http://localhost:3000/api/users';
  constructor(private http: HttpClient) { }

  getFriends() {
    return this.http.get<any>(this._usersUrl)
  }

  sendRequest(userData) {
    return this.http.post<any>(this._friendsUrl + '/id', userData)
  }
}