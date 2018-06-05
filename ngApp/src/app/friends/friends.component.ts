import { Component, OnInit } from '@angular/core';
import { FriendService } from '../friend.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  userData = {}
  friends = []
  constructor(private _friendService: FriendService,
    private _router: Router,) { }

  ngOnInit() {
    this._friendService.getFriends()
    .subscribe(
      res => this.friends = res,
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(['/login']);
          }
        }
      }
    )
  }

  sendRequest(userData) {
    console.log('1' + userData)
    this._friendService.sendRequest(userData)
    .subscribe(
      err => console.log(err),
      res => console.log(res)
    )
  }
}
