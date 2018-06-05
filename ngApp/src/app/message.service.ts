import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MessageService {

  private _shoutUrl = 'http://localhost:3000/api/shout';
  private _checkMessage = 'http://localhost:3000/api/checkMessage';
  constructor(private http: HttpClient) { }

  shoutMessage(messageData) {
    return this.http.post<any>(this._shoutUrl, messageData)
  }

  getShouts() {
    return this.http.get<any>(this._shoutUrl)
  }
}
