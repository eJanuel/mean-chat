import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

  shoutData = {}
  shouts = []
  constructor(private _messageService: MessageService,
    private _router: Router) { }

  ngOnInit() {
    this._messageService.getShouts()
    .subscribe(
      res => this.shouts = res,
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(['/login']);
          }
        }
      }
    )
  }

  shoutMessage() {
    this._messageService.shoutMessage(this.shoutData)
    .subscribe (
      res => console.log(res),
      err => console.log(err)
    )
  }
}
