import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private apiUrl = 'https://helsinki-sights.onrender.com'; 
  private subject = new Subject<any>();

  constructor(private http: HttpClient) { }

  sendClickEvent(event:any) {
    this.subject.next(event);
  }

  getClickEvent() {
    return this.subject.asObservable();
  }

  // getAllEvents(): any {
  //   const events = this.http.get('assets/data/events.json');
  //   return events;
  // }

  // Get data from Api
  getAllEvents(): Observable<any> {
    const events = this.http.get(this.apiUrl + '/v1/events');
    return events;
  }

  // Markers from Api
  apiEventsMarkers() {
    return this.http.get(this.apiUrl + '/v1/events');
  }
}
