import { Observable } from 'rxjs';
import { DashboardService } from './dashboard.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../auth/user';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  public users$: Observable<User[]> | null = null;
  constructor(private dashboardService: DashboardService) {}
  ngOnInit(): void {
    this.users$ = this.dashboardService.getAllUsers();
  }
}
