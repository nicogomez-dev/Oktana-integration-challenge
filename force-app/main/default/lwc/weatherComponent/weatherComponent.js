import { LightningElement, track, wire } from 'lwc';
import getLocations from '@salesforce/apex/WeatherTodayController.getLocations';
import { weatherFormatMap } from 'c/commonConstants';

export default class WeatherComponent extends LightningElement {
    @track locations = [];
    @track selectedLocation = '';
    locationSelected =false;
    @track currentWeather='';

    weatherFormatMap= weatherFormatMap;

    @wire(getLocations)
    wiredLocations({ error, data }) {
        if (data) {
            this.locations = data.map(loc => ({ label: loc, value: loc }));
        } else if (error) {
            console.error('Error fetching locations', error);
        }
    }

    handleChange(event) {
        this.selectedLocation = event.detail.value;
        this.locationSelected = true;
    }

    handleGotWeather(event){
        this.currentWeather = event.detail.message;
    }

    get cardClass(){
        if (!this.currentWeather) return "slds-p-around_medium slds-is-relative"
        return `slds-is-relative ${this.weatherFormatMap[this.currentWeather].class}`;
    }

}