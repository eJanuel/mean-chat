import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SearchService {

  private _searchUrl = 'http://localhost:3000/api/search';
  constructor(private http: HttpClient) { }

  search(searchData) {
    return this.http.post<any>(this._searchUrl, searchData)
  }
}
