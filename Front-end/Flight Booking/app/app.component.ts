import { Component } from '@angular/core';

declare var jQuery:any;

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
                <li><a class="dropdown-button" href="#!" data-activates="dropdown1">Admin
                        <i class="material-icons right">arrow_drop_down</i>
                    </a>
                    <!-- Dropdown Structure -->
                    <ul id='dropdown1' class='dropdown-content'>
                        <li><a routerLink="add-flight">Add flight</a></li>
                        <li><a routerLink="check-ticket">Check ticket</a></li>
                    </ul>
                </li>
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
    ngAfterViewInit(): void {
        jQuery('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrain_width: false, // Does not change width of dropdown to that of the activator
            hover: true, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: false, // Displays dropdown below the button
            alignment: 'left' // Displays dropdown with edge aligned to the left of button
            }
        );
    }
 }
