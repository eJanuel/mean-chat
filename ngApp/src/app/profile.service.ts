import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProfileService {

  private _profileUrl = 'http://localhost:3000/api/profile';
  constructor(private http: HttpClient) { }

  getFriends() {
    return this.http.get<any>(this._profileUrl)
  }
}
