import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'result',
    styles: [`
        .result {
            height: 400px;
        }
    `],
    template: `
    <div class="row result center">
        <h1>{{msgResut}}</h1>
    </div>
    `
})

export class ResultComponent implements OnInit { 
    

    constructor(
        private route: ActivatedRoute,
        private location: Location
    ) {}

    msgResut: string;
  
    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let result = params['result'];
            if (result === '1') {
                this.msgResut = "Successful!";
            } else {
                this.msgResut = "Error, please try again!"
            }
        });
    }
}