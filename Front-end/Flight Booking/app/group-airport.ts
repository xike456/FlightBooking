import { Airport } from './Airport'

export class GroupAirport {
    public group: string;
    public airports: Array<Airport>;

    constructor() {
        this.group = "";
        this.airports = new Array<Airport>();
    }
}