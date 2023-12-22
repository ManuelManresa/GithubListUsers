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
import { HttpRequestInterceptor } from '../interceptors/httpRequests.interceptor';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';
import { NgIconsModule } from '@ng-icons/core';
import { bootstrapBuilding } from '@ng-icons/bootstrap-icons';
import { octPersonFill, octLocation } from '@ng-icons/octicons';
import { SplitPipe } from './pipes/split.pipe';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { NotificationPopUpComponent } from './notification-pop-up/notification-pop-up.component';
import { TableComponent } from './home/table/table.component';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    SpinnerComponent,
    SplitPipe,
    FormatDatePipe,
    NotificationPopUpComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ProfileModule,
    HttpClientModule,
    FormsModule,
    HomeModule,
    NgIconsModule.withIcons({
      octPersonFill,
      bootstrapBuilding,
      octLocation,
    }),
  ],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
