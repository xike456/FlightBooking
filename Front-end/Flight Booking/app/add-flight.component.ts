import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Class } from './class';
import { Airport } from './airport';
import { GroupAirport } from './group-airport';
import { FlightService } from './flight.service';
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';



declare var jQuery:any;

@Component({
    selector: 'add-flight',
    styles: [`
        .add-flight {
            margin: 35px;
        }
    `],
    template: `
    <div class="row add-flight">
        <h2 class="header center-align">Add flight</h2>
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
                        <optgroup *ngFor="let group of fromAirports" label="{{group.group}}">
                            <option *ngFor="let airport of group.airports" 
                                value="{{airport.id}}">{{airport.id}} - {{airport.name}}
                            </option>
                        </optgroup>
                    </select>
                    <label>To</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s2">
                    <input id="id" type="text" class="validate">
                    <label for="id">ID flight</label>
                </div>
                <div class="input-field col s2">
                    <input id="startDate" type="date" class="datepicker">
                    <label for="startDate">Start date</label>
                </div>
                <div class="input-field col s2">
                    <select id="seatClass">
                        <option value="" disabled selected>Ticket class?</option>
                        <option value="Y">Y</option>
                        <option value="C">C</option>
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
                <div class="input-field col s2">
                    <input id="price" type="text" class="validate">
                    <label for="price">Price</label>
                </div>
                <div class="input-field col s2">
                    <input id="amount" type="text" class="validate">
                    <label for="amount">Amount</label>
                </div>
            </div>
            <div class="row">
                <div class="file-field input-field right">
                    <a class="waves-effect waves-light btn-large" (click)="addFlights()"><i class="material-icons left">done</i>Add flight</a>
                </div>
            </div>
        </form>
    </div>
    `
})

export class AddFlightComponent implements OnInit {

    fromAirports: GroupAirport[];

    classTickets: Class[] = [{ id: 'E', name: 'First class'}, { id: 'C', name: 'Business class'}, { id: 'C', name: 'Premium economy class'} , { id: 'D', name: 'Economy class'}];
    
    toAirports: Airport[];

    isLogin: Boolean;

    constructor(private router: Router, private flightService: FlightService, private storage:LocalStorageService) {}

    ngOnInit(): void {
        this.isLogin = this.storage.retrieve('isLogin');
        if (this.isLogin == false) {
            this.router.navigate(['login']);
        }
        this.getFromAirport();
    }

    ngAfterViewInit() {
        jQuery(document).ready(function() {
                jQuery('select').material_select();
        });

        jQuery('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        });
    }

    afterUpdateSource(): void {
        setTimeout(function() {
            jQuery('select').material_select();
        }, 500);
        
    }

    getFromAirport(): void {
        this.flightService.getFromAirports()
            .then(data => {
                this.fromAirports = data;
                this.afterUpdateSource();
            }).catch(error => { console.log(error) });
    }

    addFlights(): void {
        var fromAirport = jQuery('#sFrom').val();
        var toAirport = jQuery('#sTo').val();
        var startDate = jQuery('#startDate').val();
        var id = jQuery('#id').val();
        var priceClass = jQuery('#priceClass').val();
        var seatClass = jQuery('#seatClass').val();
        var amount = jQuery('#amount').val();
        var price = jQuery('#price').val();

        var token =  this.storage.retrieve('token');

        if (fromAirport == "" || toAirport == "" || startDate == "" || priceClass == "" || seatClass == "" || amount == "" || price == "")
                return;
        this.flightService.addFlights(token, fromAirport, toAirport, startDate, id, seatClass, priceClass, amount, price)
            .then(data => {
                if (data.success == false) {
                    this.storage.store("isLogin", false);
                    this.storage.store("token", "");
                    this.router.navigate(['login']);
                } else {
                    alert("Successful");
                }
            }).catch(error => { console.log(error) });

        fromAirport = jQuery('#sFrom').val('');
        toAirport = jQuery('#sTo').val('');
        startDate = jQuery('#startDate').val('');
        id = jQuery('#id').val('');
        priceClass = jQuery('#priceClass').val('');
        seatClass = jQuery('#seatClass').val('');
        amount = jQuery('#amount').val('');
        price = jQuery('#price').val('');
    }
 }
