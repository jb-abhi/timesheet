import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth.service';
import { LocalstorageService } from 'src/app/localstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  username: string;
  constructor(
    private authService: AuthService,
    private localStorage: LocalstorageService
  ) {}

  ngOnInit(): void {
    const userId = this.localStorage.getUserId();

    this.authService.getUser(userId).subscribe((user) => {
      this.username = user.name!;
    });
  }

  logoutUser() {
    this.authService.logout();
  }
}
