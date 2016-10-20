import { Component } from '@angular/core';

declare var jQuery:any;

@Component({
    selector: 'select-form',
    styles: [`
        
    `],
    template: `
    <h2 class="header center-align">Departure Flight Options</h2>
    <table class="container">
        <thead>
          <tr>
              <th data-field="id">ID</th>
              <th data-field="from">From</th>
              <th data-field="to">To</th>
              <th data-field="date">Start date</th>
              <th data-field="time">Start time</th>
              <th data-field="class">Class</th>
              <th data-field="price">Price</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td><p>
                <input name="select" type="radio" id="test1" />
                <label for="test1">BL326</label>
            </p></td>
            <td>SGN</td>
            <td>TBB</td>
            <td>2016-10-05</td>
            <td>08:45</td>
            <td>A</td>
            <td>100000</td>
            <td><p>
            </p></td>
          </tr>
          <tr>
            <td><p>
                <input name="select" type="radio" id="test2" />
                <label for="test2">BL326</label>
            </p></td>
            <td>SGN</td>
            <td>TBB</td>
            <td>2016-10-05</td>
            <td>08:45</td>
            <td>A</td>
            <td>100000</td>
          </tr>
          <tr>
            <td><p>
                <input name="select" type="radio" id="test3" />
                <label for="test3">BL326</label>
            </p></td>
            <td>SGN</td>
            <td>TBB</td>
            <td>2016-10-05</td>
            <td>08:45</td>
            <td>A</td>
            <td>100000</td>
          </tr>
          <tr>
            <td><p>
                <input name="select" type="radio" id="test4" />
                <label for="test4">BL326</label>
            </p></td>
            <td>SGN</td>
            <td>TBB</td>
            <td>2016-10-05</td>
            <td>08:45</td>
            <td>A</td>
            <td>100000</td>
          </tr>
          <tr>
            <td><p>
                <input name="select" type="radio" id="test5" />
                <label for="test5">BL326</label>
            </p></td>
            <td>SGN</td>
            <td>TBB</td>
            <td>2016-10-05</td>
            <td>08:45</td>
            <td>A</td>
            <td>100000</td>
          </tr>
        </tbody>
      </table>
      <div class="row right-align container">
        <a class="waves-effect waves-light btn">Booking</a>
      </div>
    `
})
export class SelectComponent {
    ngAfterViewInit() { 
    }
 }
