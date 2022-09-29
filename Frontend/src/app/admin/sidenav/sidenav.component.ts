import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/localstorage.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  constructor(
    private localStorage: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLogout() {
    this.localStorage.removeToken();
    this.router.navigate(['']);
  }
}
