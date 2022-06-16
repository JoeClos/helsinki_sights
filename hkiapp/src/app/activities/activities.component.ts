import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivitiesService } from '../activities.service';
import { faMinus, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Activities } from '../activity';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport, {static:false})
  public viewPort!: CdkVirtualScrollViewport;
  
  title = 'Aktiviteetit'
  // activities: any = [];
  faMinus = faMinus;
  faMapLocationDot = faMapLocationDot;
  activities: Activities[]= [];
  term='';
  currentCoords: number[] = [];
  name = "";
  selected = "";
  tag = "";
  selectedSort: string = '';
  activitiesList: any;
  isFav = false;

  constructor(public activitiesService: ActivitiesService) { }

  ngOnInit(): void {
    this.getAllActivities();
    this.getCurrentCoords();
   }

  // send coordinates from list-item
  sendCoordinates(activity: any) {
    this.activitiesService.sendClickEvent(activity);
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

  // getAllActivities(): void {
  //   this.activitiesService.getAllActivities().subscribe((res: any) => {
  //     this.activities = res
  //     console.log(this.activities);
  //   });
  // }

  // Get activities from Open Api
  getAllActivities(): void {
    this.activitiesService.getAllActivities().subscribe((res: Activities) => {
      this.activities.push(res);
      this.activitiesList = res;
      console.log(this.activities);
      for(const activity of this.activities[0].data) {
        activity.distance = this.calculateDistance(this.currentCoords, [activity.location.lat, activity.location.lon]);
        console.log(activity.distance)
      }
     
      
      this.activities[0].data.sort((a: { name: { fi: string; }; },b: { name: { fi: string; };}) => (a.name.fi.trim() < b.name.fi.trim() ) ? -1 : 1)
      // this.activities[0].data.sort((a: { distance: number; }, b: { distance: number; }) => a.distance - b.distance);
    });
  } 

  hasProp(o:any, name:any) {
    return o.hasOwnProperty(name);
  }

  public get inverseOfTranslation(): string {
    if (!this.viewPort || !this.viewPort["_renderedContentOffset"]) {
      return "-0px";
    }
    let offset = this.viewPort["_renderedContentOffset"];
    return `-${offset}px`;
  }
}
