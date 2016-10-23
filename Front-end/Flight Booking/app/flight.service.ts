import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Airport } from './airport';
import { GroupAirport } from './group-airport'

@Injectable()
export class FlightService {

    private baseUrl = 'http://localhost:3000/api/'

    private startAirportsUrl = 'http://localhost:3000/api/start-airports';  // URL to web api

    constructor(private http: Http) { }

    private headers = new Headers({'Content-Type': 'application/json'});

    getFromAirports(): Promise<GroupAirport[]> {
        return this.http.get(this.startAirportsUrl)
            .toPromise()
            .then(response => {
                var res = response.json();
                var arrayGroupAirport: Array<GroupAirport> = new Array<GroupAirport>();
                res.forEach(function (group: any) {
                    var groupAirport: GroupAirport = new GroupAirport;
                    groupAirport.group = group.group.toString();
                    group.airports.forEach(function (data: any) {
                        var airport: Airport = new Airport();
                        airport.id = data.id;
                        airport.name = data.name;
                        groupAirport.airports.push(airport);
                    });
                    arrayGroupAirport.push(groupAirport);
                });
                return arrayGroupAirport;
            })
            .catch(this.handleError);
    }

    getToAirports(fromAirport: string): Promise<GroupAirport[]> {
        const url = this.baseUrl + 'end-airports?startPos=' + fromAirport;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as GroupAirport[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
  }
}