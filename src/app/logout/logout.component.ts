import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from 'services/auth-guard.service';
@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})

export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthGuardService
  ) { }

  ngOnInit(): void {
    this.authService.logout();
  }

}
