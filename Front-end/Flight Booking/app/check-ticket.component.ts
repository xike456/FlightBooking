import { Component, OnInit } from '@angular/core';
import { FlightService } from './flight.service';
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';
import { Router } from '@angular/router';
declare var jQuery:any;

@Component({
    selector: 'check-ticket',
    styles: [`
        .ticket {
            margin: 25px 25px 0 25px;
        }

        .form-search {
            margin-bottom: 50px;
        }
    `],
    template: `
    <h2 class="header center-align">Check Ticket</h2>
    <div class="col s12 container form-search">
        <div class="row">
            <div class="input-field col s8">
            <input id="search" type="text" class="validate">
            <label for="search">Ticket code</label>
            </div>
            <div class="file-field input-field s4">
                <a class="waves-effect waves-light btn-large" (click)="searchTicket()"><i class="material-icons left">search</i>Find ticket</a>
            </div>
        </div>
    </div>
    <div class="col s12">
        <div class="card ticket hoverable" *ngIf="listTicket">
            <div class="card-content">
                <span class="card-title"><h3>Ticket</h3></span>
                <div class="row" *ngFor="let passenger of listTicket.passengers">
                    <div class="col s5">
                        <h5 class="header">{{passenger.firstName}}</h5>
                    </div>
                    <div class="col s5">
                        <h5 class="header">{{passenger.lastName}}</h5>
                    </div>
                    <div class="col s2">
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th data-field="id">ID</th>
                            <th data-field="date">Start date</th>
                            <th data-field="time">Seat</th>
                            <th data-field="class">Price</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr *ngFor="let flight of listTicket.flightDetails">
                            <td>{{flight.id}}</td>
                            <td>{{flight.day}}</td>
                            <td>{{flight.seatClass}}</td>
                            <td>{{flight.priceClass}}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="row">
                    <h1>{{listTicket.price}}</h1>
                </div>
            </div>
        </div>
    </div>
    `
})
export class CheckTicketComponent {

    constructor(private router: Router, private flightService: FlightService, private storage:LocalStorageService) {}

    ngAfterViewInit() { 
    }

    isLogin: boolean;

    ngOnInit(): void {
        this.isLogin = this.storage.retrieve('isLogin');
        if (this.isLogin == false || this.isLogin == null) {
            this.router.navigate(['login']);
        }
    }

    listTicket: any;

    searchTicket(): void {
        var token =  this.storage.retrieve('token');
        this.flightService.searchTicket(token, jQuery('#search').val())
            .then(data => { 
                if (data.success == false) {
                    this.storage.store("isLogin", false);
                    this.storage.store("token", "");
                    this.router.navigate(['login']);
                } else {
                    if (data.length > 0) {
                        this.listTicket = data[0];
                    }
                }
            })
            .catch(err => console.log(err));
    }
 }
