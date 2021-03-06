import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {};
  constructor(private _auth: AuthService,
    private _router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
    .subscribe (
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this._router.navigate(['/chatbox']);
      },
      err => this.sendError(err)
    )
  }
  
  sendError(err) {
    if (err = 401) {
      document.querySelector('span').classList.remove('d-none')
    } else {
      console.log('unknown error')
    }
  }
}
