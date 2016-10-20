import { Component } from '@angular/core';

import { Airport } from './airport'
import { Class } from './class'


@Component({
    selector: 'search-cards',
    styles: [`
        .ticket {
            margin: 25px 25px 0 25px;
        }
    `],
    template: `
        <div class="row">
            <div class="col s12">
                <div class="card ticket hoverable">
                    <div class="card-content">
                        <span class="card-title">Sai Gon To Ha Noi</span>
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
                    <div class="card-action right-align">
                        <a href="#">Booking</a>
                        <a href="#">Cancel</a>
                    </div>
                </div>
            </div>

            <div class="col s12">
                <div class="card ticket hoverable">
                    <div class="card-content">
                        <span class="card-title">Sai Gon To Ha Noi</span>
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
                    <div class="card-action right-align">
                        <a href="#">Booking</a>
                        <a href="#">Cancel</a>
                    </div>
                </div>
            </div>

            <div class="col s12">
                <div class="card ticket hoverable">
                    <div class="card-content">
                        <span class="card-title">Sai Gon To Ha Noi</span>
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
                    <div class="card-action right-align">
                        <a href="#">Booking</a>
                        <a href="#">Cancel</a>
                    </div>
                </div>
            </div>
        </div>
    `
})

export class SearchCardComponent {
  
 }
