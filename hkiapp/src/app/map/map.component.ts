import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../marker.service';
import { PlacesListComponent } from '../places-list/places-list.component';
import { Place } from '../place';
import { PlacesService } from '../places.service';
import { Subscription } from 'rxjs/internal/Subscription';


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
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: any;
  // place!: Place;
  subsVar!: Subscription;  

  constructor(private markerService: MarkerService, private placesService: PlacesService) {
    this.subsVar = this.placesService.getClickEvent().subscribe((res) => {
      this.centerByMarker(res);
    })
   }

  ngOnInit(): void {
  }

  // centers the map to markes chosen from list
  centerByMarker(place: any): void {
    this.map.setView([place.location.lat, place.location.lon], 17);
  }

  // create leaflet map and add layer to map
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
    this.markerService.makePlacesMarkers(this.map);
  }

  

}
