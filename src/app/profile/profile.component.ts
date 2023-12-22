import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ProfileService } from './profile.service';
import { Observable, map, of, take, tap } from 'rxjs';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import moment from 'moment-mini';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit, OnChanges {
  public user$: Observable<User> | null = null;

  public userRepos$: Observable<any> | null = null;
  public userGeneralCommits$: Observable<any> | null = null;

  public activeTab: 'repos' | 'commits' = 'repos';
  @Input() usernameURL: string = '';

  constructor(private profileService: ProfileService, private router: Router) {}
  ngOnInit(): void {
    this.showTab(this.activeTab);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usernameURL'].currentValue) {
      this.user$ = this.profileService.getUser(
        `users/${changes['usernameURL'].currentValue}`
      );

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
  }

  public showTab(tab: 'repos' | 'commits'): void {
    this.activeTab = tab;

    if (tab === 'repos') {
      //  this.profileService.getRepos(this.mockmojombo.repos_url);
    } else if (tab === 'commits') {
      // this.profileService.getCommits(this.mockCommitsmojombo[0].url).pipe(tap(commit));
    }
  }
}
