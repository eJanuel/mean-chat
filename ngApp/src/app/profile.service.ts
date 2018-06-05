import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProfileService {

  private _profileUrl = 'http://localhost:3000/api/profile';
  constructor(private http: HttpClient) { }

  getProfile() {
    return this.http.get<any>(this._profileUrl)
  }

  updateProfile(updateProfileData) {
    return this.http.post<any>(this._profileUrl, updateProfileData)
  }

  deleteProfile(deleteProfileData) {
    return this.http.delete<any>(this._profileUrl, deleteProfileData)
  }
}
