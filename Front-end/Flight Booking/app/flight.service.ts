import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Airport } from './airport';
import { GroupAirport } from './group-airport'
import { Flight } from './flight'

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

    listFlights: Promise<Array<Flight[]>>;

    getFlights(fromAirport: string, toAirpot: string, startDate: string, 
            endDate: string, seat: string, priceClass: string, amount: number): Promise<Array<Flight[]>> {
        const url = this.baseUrl + 'flights?start=' + fromAirport + '&end=' + toAirpot + '&amount=' + amount
            + '&dayStart=\'' + startDate + '\'&dayEnd=\'' + endDate + '\'&seat=' + seat + '&price=' + priceClass;
        console.log(url);
        this.listFlights = this.http.get(url)
            .toPromise()
            .then(response => response.json() as Array<Flight[]>)
            .catch(this.handleError);
        return this.listFlights;
    }

    getFlightsOnSelectForm(): Promise<Array<Flight[]>> {
        return this.listFlights;
    };

    booking: Promise<any>;
    
    createBooking(): Promise<any> {
        const url = this.baseUrl + 'bookings' 
        var body = {
            day: Date.now()
        }
        this.booking = this.http.post(url, body)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
        return this.booking;
    }

    addBookingFlight(flight: Flight): Promise<any> {
        if (this.booking == null)
            return;
        this.booking.then(data => {
            var url = this.baseUrl + 'bookings/' + data._id + '/flights'
            
            return this.http.post(url, flight)
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
        }).catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}