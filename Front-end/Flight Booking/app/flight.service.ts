import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Airport } from './airport';
import { GroupAirport } from './group-airport'

@Injectable()
export class FlightService {

    private startAirportsUrl = 'http://192.168.2.6:3000/api/start-airports';  // URL to web api

    constructor(private http: Http) { }

    private headers = new Headers({'Content-Type': 'application/json'});

    getFromAirports(): Promise<GroupAirport[]> {
        return this.http.get(this.startAirportsUrl)
            .toPromise()
            .then(response => response.json() as GroupAirport[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
  }
}