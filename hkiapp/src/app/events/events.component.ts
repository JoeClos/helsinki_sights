import { Component, OnInit, ViewChild } from '@angular/core';
import { EventsService } from '../events.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { Events } from '../event';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport, {static:false})
  public viewPort!: CdkVirtualScrollViewport;

  title = 'Tapahtumat'
  // events: any = []
  events: Events[] = [];
  term='';
  currentCoords: number[] = [];
  selected = "";
  tag = "";
  today!: Date;
  faMapLocationDot = faMapLocationDot;

  constructor(public eventsService: EventsService) { }

  ngOnInit(): void {
    this.getAllEvents();
    this.getCurrentCoords();
    this.today = new Date();
  }

  // send coordinates from list-item
  sendCoordinates(event: any) {
    this.eventsService.sendClickEvent(event);
  }
  

  getCurrentCoords() {
    navigator.geolocation.getCurrentPosition((position) => {
      const currentLat = position.coords.latitude;
      const currentLon = position.coords.longitude;
      this.currentCoords.push(currentLat);
      this.currentCoords.push(currentLon);
      console.log(this.currentCoords[0]);
      console.log(this.currentCoords[1]);
    });
  }

  calculateDistance(current: number[], place: number[]) {
    var R = 6371; // km
    var dLat = this.toRad(place[0]-current[0]);
    var dLon = this.toRad(place[1]-current[1]);
    var lat1 = this.toRad(current[0]);
    var lat2 = this.toRad(place[0]);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    
    return d;
  }

  toRad(value: number) {
    return value * (Math.PI / 180);
  }

   // Get places from Open Api
   getAllEvents(): void {
    this.eventsService.getAllEvents().subscribe((res: Events) => {
      this.events.push(res);
      
      // calculate and add property 'distance' to event 
      for(const event of this.events[0].data) {
        event.distance = this.calculateDistance(this.currentCoords, [event.location.lat, event.location.lon]);
        if(new Date(event.event_dates.starting_day) < this.today) {
          event.event_dates.current_day = this.today;
          event.event_dates.jatkuva = true;
        } else {
          event.event_dates.current_day = event.event_dates.starting_day;
        }
        
      }
      // sort events by starting date
      this.events[0].data.sort((x: { event_dates: { starting_day: Date; }; }, y: { event_dates: { starting_day: Date; }; }) => +new Date(x.event_dates.starting_day) - +new Date(y.event_dates.starting_day));

      for(var i = this.events[0].data.length -1; i >= 0; i--) {
        if(this.events[0].data[i].event_dates.starting_day == null) {
          this.events[0].data.push(this.events[0].data.splice(i, 1)[0]);
        }
      }
    })
  }

  public get inverseOfTranslation(): string {
    if (!this.viewPort || !this.viewPort["_renderedContentOffset"]) {
      return "-0px";
    }
    let offset = this.viewPort["_renderedContentOffset"];
    return `-${offset}px`;
  }
}


