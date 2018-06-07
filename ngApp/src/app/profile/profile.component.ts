import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile = {}
  constructor(private _profileService: ProfileService,
    private _router: Router,
    private _authService: AuthService) { }

  ngOnInit() {
    this._profileService.getProfile()
    .subscribe(
      res => this.profile = res,
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(['/login']);
          }
        }
      }
    )
  }

  updateProfile() {
    this._profileService.updateProfile(this.profile)
    .subscribe (
      res => console.log(res),
      err => console.log(err)
    )
  }

  deleteProfile() {
    this._profileService.deleteProfile(this.profile)
    .subscribe (
      res => console.log(res),
      err => console.log(err)
    )
    this._authService.logoutUser()
  }

}
