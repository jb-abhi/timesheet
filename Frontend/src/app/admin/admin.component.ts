import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LocalstorageService } from '../localstorage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  username: string;

  constructor(
    private localStorage: LocalstorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.localStorage.getUserId();

    this.authService.getUser(userId).subscribe((user: any) => {
      this.username = user.name;
    });
  }
}
