import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from './flight.service';
import { SelectComponent } from './select-form.component'
import { Class } from './class';
import { Airport } from './airport';
import { GroupAirport } from './group-airport';
import { Flight } from './flight';


declare var jQuery:any;

@Component({
    selector: 'search-form',
    styles: [`
        .search-form {
            margin: 35px;
        }
    `],
    template: `
    <div class="row search-form">
        <h2 class="header center-align">Find flights</h2>
        <form class="col s12">
            <div class="row">
                <div class="input-field col s6" id="pickerContainer">
                    <select id="sFrom">
                        <option value="" disabled selected>From airport</option>
                        <optgroup *ngFor="let group of fromAirports" label="{{group.group}}">
                            <option *ngFor="let airport of group.airports" 
                                value="{{airport.id}}">{{airport.id}} - {{airport.name}}
                            </option>
                        </optgroup>
                    </select>
                    <label>From</label>
                </div>
                <div class="input-field col s6">
                    <select id="sTo">
                        <option value="" disabled selected>To airport</option>
                        <optgroup *ngFor="let group of toAirports" label="{{group.group}}">
                            <option *ngFor="let airport of group.airports" 
                                value="{{airport.id}}">{{airport.id}} - {{airport.name}}
                            </option>
                        </optgroup>
                    </select>
                    <label>To</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s3">
                    <input id="startDate" type="date" class="datepicker">
                    <label for="startDate">Start date</label>
                </div>
                <div class="input-field col s3">
                    <input id="endDate" type="date" class="datepicker">
                    <label for="endDate">End date</label>
                </div>
                <div class="input-field col s2">
                    <select id="amount">
                        <option value="" disabled selected>How many people?</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    <label>People</label>
                </div>
                <div class="input-field col s2">
                    <select id="seatClass">
                        <option value="" disabled selected>Ticket class?</option>
                        <option value="Y">Y</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>
                    <label>Ticket class</label>
                </div>
                <div class="input-field col s2">
                    <select id="priceClass">
                        <option value="" disabled selected>Enter class?</option>
                        <option *ngFor="let class of classTickets" 
                            value="{{class.id}}">{{class.name}}
                        </option>
                    </select>
                    <label>Class</label>
                </div>
            </div>
            <div class="row">
                <div class="switch left">
                    <label>
                        One way
                        <input type="checkbox">
                        <span class="lever"></span>
                        Return
                    </label>
                </div>
                <div class="file-field input-field right">
                    <a class="waves-effect waves-light btn-large" (click)="findFlights()"><i class="material-icons left">search</i>Find flights</a>
                </div>
            </div>
        </form>
    </div>
    `
})

export class SearchFormComponent implements OnInit {

    classTickets: Class[] = [{ id: 'E', name: 'First class'}, { id: 'C', name: 'Business class'}, { id: 'C', name: 'Premium economy class'} , { id: 'D', name: 'Economy class'}];

    fromAirports: GroupAirport[] = new Array<GroupAirport>();

    selectedFrom: Airport = null;
    
    toAirports: GroupAirport[] = [];

    constructor(private router: Router, private flightService: FlightService) { }

    getFromAirport(): void {
        this.flightService.getFromAirports()
            .then(data => {
                this.fromAirports = data;
                this.afterUpdateSource();
            }).catch(error => { console.log(error) });
    }
    

    ngOnInit(): void {
        this.getFromAirport();
    }

    afterUpdateSource(): void {
        setTimeout(function() {
            jQuery('select').material_select();
        }, 500);
        
    }
 
    ngAfterViewInit() {
        jQuery(document).ready(function() {
                jQuery('select').material_select();
        });

        jQuery('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        });

        jQuery('#sFrom').change(() => this.getToAirports(jQuery('#sFrom').val()) );
    }

    getToAirports(fromAirport: string): void {
        this.flightService.getToAirports(fromAirport)
            .then(data => {
                this.toAirports = data;
                this.afterUpdateSource();
            }).catch(error => { console.log(error) });
    }

    listFlights: Array<Flight[]>;
   
    findFlights(): void {
        var fromAirport = jQuery('#sFrom').val();
        var toAirport = jQuery('#sTo').val();
        var startDate = jQuery('#startDate').val();
        var endDate = jQuery('#endDate').val();
        var priceClass = jQuery('#priceClass').val();
        var seatClass = jQuery('#seatClass').val();
        var amount = jQuery('#amount').val();

        if (fromAirport == "" || toAirport == "" || startDate == "" || priceClass == "" || seatClass == "")
                return;
        this.flightService.getFlights(fromAirport, toAirport, startDate, endDate, seatClass, priceClass, amount)
            .then(data => {
                this.listFlights = data;
                console.log(this.listFlights);
            }).catch(error => { console.log(error) });
        let link = ['/select'];
        this.router.navigate(link);
    }
}
