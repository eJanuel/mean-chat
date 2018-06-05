import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { SearchComponent } from './search/search.component';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _authService: AuthService,
    private _searchComponent: SearchComponent,
    private _profileService: ProfileService) {}
}
