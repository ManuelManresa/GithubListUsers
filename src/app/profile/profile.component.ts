import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Observable, map, take, tap } from 'rxjs';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import moment from 'moment-mini';
import {
  GeneralCommitsUser,
  RepositoriesUser,
} from '../../interfaces/responsesInterfaces';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  public user$: Observable<User> | null = null;

  public userRepos$: Observable<RepositoriesUser[]> | null = null;
  public userGeneralCommits$: Observable<GeneralCommitsUser[]> | null = null;

  constructor(private profileService: ProfileService, private router: Router) {}
  ngOnInit(): void {
    const username = this.router.url.split('?user=')[1];
    this.user$ = this.profileService.getUser(`users/${username}`);

    this.user$.pipe(take(1)).subscribe((user) => {
      this.userRepos$ = this.profileService.getRepos(user.repos_url);

      this.userRepos$.pipe(take(1)).subscribe((user) => {
        this.userGeneralCommits$ = this.profileService.getCommits(
          user[0].commits_url
        );

        return this.userGeneralCommits$;
      });

      return this.userRepos$;
    });
  }

  public momentFormatter(date: string | undefined, format: string) {
    return moment(date).format(format);
  }
}
