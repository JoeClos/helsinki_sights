import { Injectable } from '@angular/core';
import { PlacesListComponent } from './places-list/places-list.component';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  // private apiUrl = 'https://hki-springboot.herokuapp.com'; 
  private apiUrl = 'https://helsinki-sights.onrender.com';

  private subject = new Subject<any>();

  constructor(private http: HttpClient) { }


  sendClickEvent(place:any) {
    this.subject.next(place);
  }

  getClickEvent() {
    return this.subject.asObservable();
  }
  // getAllPlaces(): any {
  //   const places = this.http.get('assets/data/places.json');
  //   return places;
  // }

  // Get data from Api
  getAllPlaces(): Observable<any> {
    const places = this.http.get(this.apiUrl + '/v1/places');
    return places;
  }

  // Markers from Api
  apiPlaceMarkers() {
    return this.http.get(this.apiUrl + '/v1/places');
  }

}




