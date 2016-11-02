import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule }    from '@angular/http';
import {Ng2Webstorage} from 'ng2-webstorage';

import { FlightService } from './flight.service';
import { AppComponent }  from './app.component';
import { HomeComponent }  from './home.component';
import { SearchFormComponent } from './search-form.component';
import { SelectComponent } from './select-form.component';
import { SearchCardComponent } from './select-card.component';
import { CustomerInfoComponent } from './customer-info.component';
import { AddFlightComponent } from './add-flight.component';
import { CheckTicketComponent } from './check-ticket.component';
import { ResultComponent } from './result.component';
import { LoginComponent } from './login.component';



@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule,
    HttpModule,
    Ng2Webstorage,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'search',
        component: SearchFormComponent
      },
      {
        path: 'select',
        component: SelectComponent
      },
      {
        path: 'select-card',
        component: SearchCardComponent
      },
      {
        path: 'home/search',
        component: SearchFormComponent
      },
      {
        path: 'customer-info',
        component: CustomerInfoComponent
      },
      {
        path: 'add-flight',
        component: AddFlightComponent
      },
      {
        path: 'check-ticket',
        component: CheckTicketComponent
      },
      {
        path: 'result/:result',
        component: ResultComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ])
  ],
  declarations: [ AppComponent, SearchFormComponent, HomeComponent, SelectComponent, SearchCardComponent, CustomerInfoComponent, 
                  AddFlightComponent, CheckTicketComponent, ResultComponent, LoginComponent ],
  providers: [ FlightService],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
