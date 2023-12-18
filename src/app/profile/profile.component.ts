import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Observable } from 'rxjs';
import { User } from '../auth/user';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  @Input() private userURL: string = 'https://api.github.com/users/mojombo';

  public user$: Observable<User> | null = null;
  constructor(private profileService: ProfileService) {}
  ngOnInit(): void {
    this.user$ = this.profileService.getUser(this.userURL);
  }
}
