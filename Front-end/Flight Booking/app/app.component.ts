import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    styles: [`
        .brand-logo {
            margin-left: 35px;
        }
    `],
    template: `
    <nav>
        <div class="nav-wrapper teal">
            <a href="#" class="brand-logo">Booking Flights</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><a routerLink="home">Home</a></li>
                <li><a routerLink="search">Find flights</a></li>
                <li><a routerLink="#">About</a></li>
            </ul>
        </div>
    </nav>

    <router-outlet></router-outlet>

    <footer class="page-footer teal">
        <div class="container">
        <div class="row">
            <div class="col l6 s12">
            <h5 class="white-text">Booking Flights</h5>
            <p class="grey-text text-lighten-4">Lorem Ipsum is simply dummy text of the printing 
            and typesetting industry. Lorem Ipsum has been the industry's standard dummy text 
            and scrambled it to make a type specimen book.</p>
            </div>
            <div class="col l4 offset-l2 s12">
            
            </div>
        </div>
        </div>
        <div class="footer-copyright">
            <div class="container">
            © 2016 Copyright
            </div>
        </div>
    </footer>
    `
})
export class AppComponent {
    
 }
