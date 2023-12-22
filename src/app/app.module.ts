import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileModule } from './profile/profile.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthTokenInterceptor } from '../interceptors/tokenBearer.interceptor';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';
import { NgIconsModule } from '@ng-icons/core';
import { bootstrapTwitter, bootstrapBuilding } from '@ng-icons/bootstrap-icons';
import { octPersonFill } from '@ng-icons/octicons';
import { SplitPipe } from './split.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    SpinnerComponent,
    SplitPipe,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ProfileModule,
    HttpClientModule,
    FormsModule,
    NgIconsModule.withIcons({
      bootstrapTwitter,
      octPersonFill,
      bootstrapBuilding,
    }),
  ],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
