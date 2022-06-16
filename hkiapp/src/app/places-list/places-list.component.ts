import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { PlacesService } from '../places.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { Place, Places, Tag, Tags } from '../place';
import {MatSelectModule} from '@angular/material/select';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MapComponent } from '../map/map.component';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.css']
})
export class PlacesListComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport, {static:false})
  public viewPort!: CdkVirtualScrollViewport;
  term='';
  title = 'Paikat'
  currentCoords: number[] = [];
  // places: any = []
  places: Places[] = [];
  placesTags: any = [];
  name = "";
  selected = "";
  tag = "";
  faMapLocationDot = faMapLocationDot;
  
  constructor(public placesService: PlacesService) { }

  ngOnInit(): void {
    this.getAllPlaces();
    this.getCurrentCoords();
  }

  // send coordinates from list-item
  sendCoordinates(place: any) {
    this.placesService.sendClickEvent(place);
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
    // return d;
    // if(d >= 1) {
    //   return d.toFixed(2) + " km";
    // } else {
    //   var m = d*1000;
    //   return Math.round(m) + " m";
    // }
    // console.log(d);
    return d;
  }

  toRad(value: number) {
    return value * (Math.PI / 180);
  }

  
    getAllPlaces(): void {
      this.placesService.getAllPlaces().subscribe((res: Places) => {
        // this.apiResponse.push(res);
        this.places.push(res);
        // this.apiResponse.push(res);
              // this.places.sort((a: { age: number; }, b: { age: number; }) => (a.age < b.age) ? 1 : (a.age === b.age) ? ((a.age < b.age) ? 1 : -1) : -1 );

        for(const place of this.places[0].data) {
          place.distance = this.calculateDistance(this.currentCoords, [place.location.lat, place.location.lon]);
        }
        this.places[0].data.sort((a: { distance: number; }, b: { distance: number; }) => a.distance - b.distance);
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





