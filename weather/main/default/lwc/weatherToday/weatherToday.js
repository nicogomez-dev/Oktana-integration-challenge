import { LightningElement, wire, track, api } from 'lwc';
import getWeatherToday from '@salesforce/apex/WeatherTodayController.getWeatherToday';
import { weatherFormatMap } from 'c/commonConstants';

export default class WeatherToday extends LightningElement {
    @track weatherData;
    @track showErrorMessage = false;
    @track errorMessage='';
    @track isLoading = false;
    weatherFormatMap= weatherFormatMap;
    maxAttempts=5; //Max attempts to query the data
    
    _selectedLocation;

    @api
    get selectedLocation() {
        return this._selectedLocation;
    }
    set selectedLocation(newVal) {
        if (this._selectedLocation !== newVal) {
            this._selectedLocation = newVal;
            this.handleLocationChange(newVal);
        }
    }

    //Since location is passed from parent, We have to make a "custom listener"
    handleLocationChange(event) { 
        this.isLoading = true;
        this.showErrorMessage = false;
        this.getWeather(0);
    }
    
    //Calls the getWeatherToday function from the controller. Max 3 Attempts
    getWeather(attempt){
        getWeatherToday({ location: this.selectedLocation })
        .then(result => {
            //If successful, populate the data and raise an event to tell the weather
            this.weatherData = result;
            this.dispatchEvent(new CustomEvent('gotweather', {
                detail: {
                    message: this.weatherData.description
                }
            }));
            this.isLoading = false;
        })
        .catch(error => {
            //If not successful, raise an error and retry
            console.error('Callout failed', error);
            if (attempt < this.maxAttempts){
                this.getWeather(attempt+1);
            }else{
            //If max attempts are exceeded, show a message on the LWC
                this.errorMessage = error.body.message+'. Please contact your administrator.';
                this.showErrorMessage = true;
                this.isLoading = false;
            }
        });
    }

    //Getters to format the LWC depending on the weather
    get cardClass(){
        if (!this.weatherData) return "slds-is-relative"
        return "slds-is-relative " + this.weatherFormatMap[this.weatherData.description].class;
    }
    get weatherLogo() {
        return this.weatherFormatMap[(this.weatherData.description)].logo;
    }
    get tempUrl(){
        return this.weatherFormatMap[(this.weatherData.description)].tempLogo;
    }
    get dropUrl(){
        return this.weatherFormatMap[(this.weatherData.description)].dropLogo;
    }
}