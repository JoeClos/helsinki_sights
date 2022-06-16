import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../marker.service';
import { EventsService } from '../events.service';
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
  selector: 'app-events-map',
  templateUrl: './events-map.component.html',
  styleUrls: ['./events-map.component.css']
})
export class EventsMapComponent implements OnInit {
  private eventsMap: any;
  subsVar!: Subscription;

  constructor(private markerService: MarkerService, private eventsService: EventsService) {
    this.subsVar = this.eventsService.getClickEvent().subscribe((res) => {
      this.centerByMarker(res);
    })
   }

  ngOnInit(): void {
  }

    // centers the map to marker chosen from list
    centerByMarker(event: any): void {
      this.eventsMap.setView([event.location.lat, event.location.lon], 17);
    }
  

  // create leaflet map and add layer to map
  private initMap(): void {
    this.eventsMap = L.map('map').locate({setView: true, maxZoom: 16});
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.eventsMap);
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeMyLocationMarker(this.eventsMap);
    this.markerService.makeEventsMarkers(this.eventsMap);
  }

}
