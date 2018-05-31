import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FriendService {

  private _friendsUrl = 'http://localhost:3000/api/friends';
  constructor(private http: HttpClient) { }

  getFriends() {
    return this.http.get<any>(this._friendsUrl)
  }
}