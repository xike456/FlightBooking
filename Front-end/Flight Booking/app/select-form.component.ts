import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from './flight.service';
import { Flight } from './flight';
declare var jQuery:any;

@Component({
    selector: 'select-form',
    styles: [`
        
    `],
    template: `
    <h2 class="header center-align">{{title}}</h2>
    <table class="container">
        <thead>
          <tr>
              <th data-field="id">ID</th>
              <th data-field="from">From</th>
              <th data-field="to">To</th>
              <th data-field="date">Start date</th>
              <th data-field="class">Seat Class</th>
              <th data-field="class">Price Class</th>
              <th data-field="price">Price</th>
          </tr>
        </thead>

        <tbody>
          <tr *ngFor="let flight of listFlightsForBinding">
            <td><p>
                <input name="select" type="radio" id="id" value="{{flight.id}}"/>
                <label for="id">{{flight.id}}</label>
            </p></td>
            <td>{{flight.startPos}}</td>
            <td>{{flight.endPos}}</td>
            <td>{{flight.day}}</td>
            <td>{{flight.seatClass}}</td>
            <td>{{flight.priceClass}}</td>
            <td>{{flight.price}}</td>
            <td><p>
            </p></td>
          </tr>
        </tbody>
      </table>
      <div class="row right-align container">
        <a class="waves-effect waves-light btn" (click)="bookingFlight()">Booking</a>
      </div>
    `
})
export class SelectComponent implements OnInit {

    oneWay: boolean;

	title: string = 'Departure Flight Options';
    
    listFlights: Array<Flight[]>;

    listFlightsForBinding: Flight[];


    constructor(private router: Router, private flightService: FlightService) { }

    getFlight(): void {
        this.flightService.getFlightsOnSelectForm()
            .then(data => {
                this.listFlights = data;
                if (this.listFlights.length > 0) {
                    this.listFlightsForBinding = this.listFlights[0];
                    if (this.listFlightsForBinding.length == 0)
                        this.router.navigate(['result', 0]);
                    console.log(this.listFlights);
                    this.oneWay = true;
                }
            }).catch(error => { console.log(error) });

        this.flightService.createBooking()
          .then(data => console.log(data));
    }

    ngOnInit(): void {
        this.getFlight();

    }

    ngAfterViewInit() { 
    }

    bookingFlight(): void {
		var id = jQuery('input[name="select"]:checked').val();
		var selectItem = this.listFlightsForBinding.find(function(data) {
			return data.id === id;
		});
		if (selectItem === undefined)
			return;
		console.log(selectItem);
		this.flightService.addBookingFlight(selectItem);
		if (this.oneWay == true) {
			if (this.listFlights[1] != null && this.listFlights[1].length > 0) {
				this.title = "Return Flight Options";
				this.listFlightsForBinding = this.listFlights[1];
                if (this.listFlightsForBinding.length == 0)
                    this.router.navigate(['customer-info']);
				this.oneWay = false;
			} else {
				this.router.navigate(['customer-info']);
			}
		} else {
			this.router.navigate(['customer-info']);
		}
    }
 }
