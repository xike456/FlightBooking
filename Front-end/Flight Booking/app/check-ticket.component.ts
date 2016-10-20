import { Component } from '@angular/core';

declare var jQuery:any;

@Component({
    selector: 'check-ticket',
    styles: [`
        .ticket {
            margin: 25px 25px 0 25px;
        }
    `],
    template: `
    <h2 class="header center-align">Check Ticket</h2>
    <div class="col s12 container">
        <div class="row">
            <div class="input-field col s8">
            <input id="search" type="text" class="validate">
            <label for="search">Search</label>
            </div>
            <div class="file-field input-field s4">
                <a class="waves-effect waves-light btn-large"><i class="material-icons left">search</i>Find ticket</a>
            </div>
        </div>
    </div>
    <div class="col s12">
        <div class="card ticket hoverable">
            <div class="card-content">
                <span class="card-title"><h3>Sai Gon To Ha Noi</h3></span>
                <div class="row">
                    <div class="col s5">
                        <h5 class="header">AXYAEZ - NGUYEN VAN THANH</h5>
                    </div>
                    <div class="col s2">
                        <h5 class="header">15/06/1995</h5>
                    </div>
                    <div class="col s3">
                        <h5 class="header">5B/126 Nguyen Du, HCM</h5>
                    </div>
                    <div class="col s2">
                        <h5 class="header">281 232 123</h5>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th data-field="id">ID</th>
                            <th data-field="date">Start date</th>
                            <th data-field="time">Start time</th>
                            <th data-field="class">Class</th>
                            <th data-field="price">Price</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>BL235</td>
                            <td>2016-10-05</td>
                            <td>08:45</td>
                            <td>A</td>
                            <td>100000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    `
})
export class CheckTicketComponent {
    ngAfterViewInit() { 
    }
 }
