import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Observable, map, take, tap } from 'rxjs';
import {
  User,
  commitsMojomboAsteroids,
  reposMojombo,
} from '../../interfaces/user';
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
  public mockmojombo = {
    login: 'mojombo',
    id: 1,
    node_id: 'MDQ6VXNlcjE=',
    avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/mojombo',
    html_url: 'https://github.com/mojombo',
    followers_url: 'https://api.github.com/users/mojombo/followers',
    following_url:
      'https://api.github.com/users/mojombo/following{/other_user}',
    gists_url: 'https://api.github.com/users/mojombo/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/mojombo/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/mojombo/subscriptions',
    organizations_url: 'https://api.github.com/users/mojombo/orgs',
    repos_url: 'https://api.github.com/users/mojombo/repos',
    events_url: 'https://api.github.com/users/mojombo/events{/privacy}',
    received_events_url: 'https://api.github.com/users/mojombo/received_events',
    type: 'User',
    site_admin: false,
    name: 'Tom Preston-Werner',
    company: '@chatterbugapp, @redwoodjs, @preston-werner-ventures ',
    blog: 'http://tom.preston-werner.com',
    location: 'San Francisco',
    email: null,
    hireable: null,
    bio: null,
    twitter_username: 'mojombo',
    public_repos: 66,
    public_gists: 62,
    followers: 23716,
    following: 11,
    created_at: '2007-10-20T05:24:19Z',
    updated_at: '2023-09-18T18:49:27Z',
  };

  public mockReposMojombo = reposMojombo;

  public mockCommitsmojombo = commitsMojomboAsteroids;

  constructor(private profileService: ProfileService, private router: Router) {}
  ngOnInit(): void {
    const username = this.router.url.split('?user=')[1];
    // this.user$ = this.profileService.getUser(`users/${username}`);

    // this.user$.pipe(take(1)).subscribe((user) => {
    //   this.userRepos$ = this.profileService.getRepos(user.repos_url);

    //   this.userRepos$.pipe(take(1)).subscribe((user) => {
    //     this.userGeneralCommits$ = this.profileService.getCommits(
    //       user[0].commits_url
    //     );

    //     return this.userGeneralCommits$;
    //   });

    //   return this.userRepos$;
    // });
  }

  public momentFormatter(date: string | undefined, format: string) {
    return moment(date).format(format);
  }
}
