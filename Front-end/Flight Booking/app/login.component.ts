import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from './flight.service';
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';

declare var jQuery:any;

@Component({
    selector: 'login',
    styles: [`
        .info-form {
            margin: 50px 20%;
        }
    `],
    template: `
        <div class="row">
            <div class="col s12">
                <div class="card info-form">
                    <div class="card-content">
                    <span class="card-title">Login</span>
                    <div class="row">
                        <div class="input-field col s12">
                        <input type="text" id="username" class="validate">
                        <label for="username">Username</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                        <input id="password" type="password" class="validate">
                        <label for="password">Password</label>
                        </div>
                    </div>
                    </div>
                    <div class="card-action">
                        <a (click)="login()">Login</a>
                        <a (click)="cancel()">Cancel</a>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class LoginComponent implements OnInit {

    ngAfterViewInit() { 

    }

    constructor(private router: Router, private flightService: FlightService, private storage:LocalStorageService) { }

    ngOnInit(): void {
    }

    login(): void {
        var username = jQuery("#username").val();
        var password = jQuery("#password").val();
        this.flightService.login(username, password)
            .then(data => {
                if (data.success == false) {
                    alert("Login false");
                    this.storage.store("isLogin", false);
                    return;
                } else {
                    this.storage.store("token", data.token);
                    alert("Successful");
                    this.storage.store("isLogin", true);
                    this.router.navigate(['home']);
                }
            });
    }

    cancel():void {
        this.router.navigate(['home']);
    }

 }
