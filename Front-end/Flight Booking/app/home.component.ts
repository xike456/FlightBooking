import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var jQuery:any;

@Component({
    selector: 'home',
    styles: [`
        .home-slider {
            height: 500px !important;
            margin-bottom: -20px;
        }
    `],
    template: `
    <div class="carousel carousel-slider center home-slider" data-indicators="true">
        <div class="carousel-fixed-item center">
            <a class="waves-effect waves-light blue darken-4 btn-large" (click)="navigateToSearchPage()"><i class="material-icons left">search</i>Find flights</a>
        </div>
        <div class="carousel-item" href="#one!">
            <img src="app/img/1.png">
        </div>
        <div class="carousel-item" href="#two!">
           <img src="app/img/2.jpg">
        </div>
        <div class="carousel-item" href="#three!">
            <img src="app/img/1.png">
        </div>
        <div class="carousel-item" href="#four!">
            <img src="app/img/2.jpg">
        </div>
    </div>
    `
})
export class HomeComponent {
    ngAfterViewInit() { 
        jQuery('.carousel.carousel-slider').carousel({full_width: true});
    }

    constructor(private router: Router) { }
    
    navigateToSearchPage(): void {
        this.router.navigate([ 'search' ])
    }
 }
