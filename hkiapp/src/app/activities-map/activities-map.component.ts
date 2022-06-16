import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../marker.service';
import { ActivitiesService } from '../activities.service';
import { Subscription } from 'rxjs';

// defines the marker
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-activities-map',
  templateUrl: './activities-map.component.html',
  styleUrls: ['./activities-map.component.css']
})
export class ActivitiesMapComponent implements AfterViewInit {
  private map: any;
  subsVar!: Subscription;

  constructor(private markerService: MarkerService, private activitiesService: ActivitiesService) { 
    this.subsVar = this.activitiesService.getClickEvent().subscribe((res) => {
      this.centerByMarker(res);
    })
   }

  ngOnInit(): void {
  }

  // centers the map to marker chosen from list
  centerByMarker(activity: any): void {
    this.map.setView([activity.location.lat, activity.location.lon], 17);
  }
  

  private initMap(): void {
    this.map = L.map('map').locate({setView: true, maxZoom: 16});
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeMyLocationMarker(this.map);
    this.markerService.makeActivitiesMarkers(this.map);
  }


}
