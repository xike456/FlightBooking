import { Component, OnInit } from '@angular/core';
import { Class } from './class';
import { Airport } from './airport';
import { GroupAirport } from './group-airport';
import { FlightService } from './flight.service';



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
                <div class="input-field col s6">
                    <select>
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
                    <select>
                        <option value="" disabled selected>To airport</option>
                        <option *ngFor="let airport of toAirports" 
                            value="{{airport.id}}">{{airport.id}} - {{airport.name}}
                        </option>
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
                    <select>
                        <option value="" disabled selected>How many people?</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    <label>People</label>
                </div>
                <div class="input-field col s2">
                    <select>
                        <option value="" disabled selected>Ticket class?</option>
                        <option value="1">A</option>
                        <option value="2">B</option>
                        <option value="3">C</option>
                        <option value="4">D</option>
                    </select>
                    <label>Ticket class</label>
                </div>
                <div class="input-field col s2">
                    <select>
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
                    <a class="waves-effect waves-light btn-large"><i class="material-icons left">search</i>Find flights</a>
                </div>
            </div>
        </form>
    </div>
    `
})

export class SearchFormComponent implements OnInit {

    classTickets: Class[] = [{ id: 'A', name: '123'}, { id: 'A', name: '456'}, { id: 'A', name: '789'}];

    fromAirports: GroupAirport[];

    
    toAirports: Airport[] = [
        { id: 'abc', name: 'Sai Gon' },
        { id: 'xyz', name: 'Ha Noi' },
        { id: 'tel', name: 'Da Nang' }
    ];

    constructor(private flightService: FlightService) { }

    getFromAirport(): void {
        this.flightService.getFromAirports().then(function(data) {
            this.fromAirports = data;
        });
        this.fromAirports = [ 
            {   group: "Viet Nam", 
                airports: [ 
                    { id: 'abc', name: 'Sai Gon' },
                    { id: 'xyz', name: 'Ha Noi' },
                    { id: 'tel', name: 'Da Nang' } 
                ] 
            }, {
                group: "America", 
                airports: [ 
                    { id: 'abc', name: 'Amarica E' },
                    { id: 'xyz', name: 'Los Angles' },
                    { id: 'tel', name: 'Texas' } 
                ]
            }
         ]
    }

    ngOnInit(): void {
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
 }
