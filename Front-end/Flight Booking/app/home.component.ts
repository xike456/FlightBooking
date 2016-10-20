import { Component } from '@angular/core';

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
            <a routerLink="search" class="waves-effect waves-light blue darken-4 btn-large" ><i class="material-icons left">search</i>Find flights</a>
        </div>
        <div class="carousel-item" href="#one!">
            <img src="http://didsomestuff.com/wp-content/uploads/2014/09/nice2-1024x576.jpg">
        </div>
        <div class="carousel-item" href="#two!">
           <img src="http://didsomestuff.com/wp-content/uploads/2014/09/nice2-1024x576.jpg">
        </div>
        <div class="carousel-item" href="#three!">
            <img src="http://didsomestuff.com/wp-content/uploads/2014/09/nice2-1024x576.jpg">
        </div>
        <div class="carousel-item" href="#four!">
            <img src="http://didsomestuff.com/wp-content/uploads/2014/09/nice2-1024x576.jpg">
        </div>
    </div>
    `
})
export class HomeComponent {
    ngAfterViewInit() { 
        jQuery('.carousel.carousel-slider').carousel({full_width: true});
    }
 }
