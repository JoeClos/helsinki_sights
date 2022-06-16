import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { PlacesListComponent } from './places-list/places-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BackButtonComponent } from './back-button/back-button.component';
import { BackButtonDirective } from './back-button.directive';
import { AppRoutingModule } from './app-routing.module';
import { PlacesDetailComponent } from './places-detail/places-detail.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './map/map.component';
import { MarkerService } from './marker.service';
import { PopupService } from './popup.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { MatExpansionModule } from '@angular/material/expansion';
import { EventsComponent } from './events/events.component';
import { EventsMapComponent } from './events-map/events-map.component';
import { SortDatePipe } from './sort-date.pipe';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivitiesMapComponent } from './activities-map/activities-map.component';
import { TopnavComponent } from './topnav/topnav.component';
import { WeatherComponent } from './weather/weather.component';
import {MatSelectModule} from '@angular/material/select';
import { FilterTagPipe } from './filter-tag.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderByNamePipe } from './order-by-name.pipe';
import { StripHtmlPipe } from './strip-html.pipe';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { BoardUserComponent } from './board-user/board-user.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    PlacesListComponent,
    BackButtonComponent,
    BackButtonDirective,
    PlacesDetailComponent,
    FooterComponent,
    MapComponent,
    EventsComponent,
    EventsMapComponent,
    SortDatePipe,
    ActivitiesComponent,
    ActivitiesMapComponent,
    TopnavComponent,
    WeatherComponent,
    FilterTagPipe,
    OrderByNamePipe,
    StripHtmlPipe,
    RegisterComponent,
    ProfileComponent,
    LoginComponent,
    BoardUserComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ScrollingModule,
    CdkScrollableModule,
    MatExpansionModule,
    MatSelectModule,
    Ng2SearchPipeModule,
    MatIconModule
  ],
  providers: [MarkerService, PopupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
