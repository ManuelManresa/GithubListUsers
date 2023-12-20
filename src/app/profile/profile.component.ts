import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import moment from 'moment-mini';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  public user$: Observable<User> | null = null;

  constructor(private profileService: ProfileService, private router: Router) {}
  ngOnInit(): void {
    const username = this.router.url.split('?user=')[1];
    this.user$ = this.profileService.getUser(`users/${username}`);
  }

  public momentFormatter(date: string | undefined, format: string) {
    return moment(date).format(format);
  }

  public getRepos() {
    // TODO example url to get repos https://api.github.com/users/${user}/repos
  }

  public getCommits() {
    // TODO exaple URL to get commits https://api.github.com/repos/${user}/${repo.name}/commits
  }
}
