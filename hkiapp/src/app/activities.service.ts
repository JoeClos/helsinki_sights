import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  private apiUrl = 'https://hki-springboot.herokuapp.com'; 
  private subject = new Subject<any>();

  constructor(private http: HttpClient) { }

  sendClickEvent(activity:any) {
    this.subject.next(activity);
  }

  getClickEvent() {
    return this.subject.asObservable();
  }

  // getAllActivities(): any {
  //   const activities = this.http.get('assets/data/activities.json');
  //   return activities;
  // }

   // Get data from Api
  getAllActivities(): Observable<any> {
    const activities = this.http.get(this.apiUrl + '/v1/activities');
    return activities;
  }

  //  Markers from Api
   apiActivitiesMarkers() {
    return this.http.get(this.apiUrl + '/v2/activities');
  }
}
