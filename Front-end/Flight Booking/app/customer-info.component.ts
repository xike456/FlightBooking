import { Component } from '@angular/core';

declare var jQuery:any;

@Component({
    selector: 'customer-info',
    styles: [`
        .info-form {
            margin: 25px 25px 0 25px;
        }
    `],
    template: `
        <h2 class="header center-align">Your information</h2>
        <div class="row">
            <div class="col s12">
                <div class="card info-form">
                    <div class="card-content">
                    <span class="card-title">Customer 1</span>
                    <div class="row">
                        <form class="col s12">
                            <div class="row">
                                <div class="input-field col s2">
                                    <select>
                                        <option value="1">Mr. </option>
                                        <option value="2">Mrs. </option>
                                        <option value="3">Ms. </option>
                                    </select>
                                    <label>Title</label>
                                </div>
                                <div class="input-field col s5">
                                    <input id="first_name" type="text" class="validate">
                                    <label for="first_name">First Name</label>
                                </div>
                                <div class="input-field col s5">
                                    <input id="last_name" type="text" class="validate">
                                    <label for="last_name">Last Name</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <input id="address" type="text" class="validate">
                                    <label for="address">Address</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s3">
                                    <select>
                                        <option value="1">Male</option>
                                        <option value="2">Felmale</option>
                                    </select>
                                    <label>Sex</label>
                                </div>
                                <div class="input-field col s3">
                                    <input id="birthday" type="date" class="datepicker">
                                    <label for="birthday">Birthday</label>
                                </div>
                                <div class="input-field col s3">
                                    <input id="phone-number" type="text" class="validate">
                                    <label for="phone-number">Phone number</label>
                                </div>
                                <div class="input-field col s3">
                                    <input id="email" type="email" class="validate">
                                    <label for="email">Email</label>
                                </div>
                            </div>
                        </form>
                    </div>

                    </div>
                </div>
            </div>
        </div>

         <div class="row info-form">
            <div class="file-field input-field right">
                <a class="waves-effect waves-light btn-large"><i class="material-icons left">done</i>Finish</a>
            </div>
        </div>
    `
})
export class CustomerInfoComponent {
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
