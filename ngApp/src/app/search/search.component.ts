import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchData = {}
  constructor(private _searchService: SearchService,
    private _router: Router) { }

  ngOnInit() { }

  search() {
    this._searchService.search(this.searchData)
    .subscribe(
      res => this.updateData(res),
      err => console.log(err)
    )
  }

  updateData(res) {
    this.searchData = res
    console.log(this.searchData)
  }

  showData() {
    console.log(this.searchData)
  }
}
