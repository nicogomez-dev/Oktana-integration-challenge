import { LightningElement, api, track } from 'lwc';

import getWeatherForecast from '@salesforce/apex/WeatherForecastController.getWeatherForecast';
import { weatherFormatMap } from 'c/commonConstants';

export default class WeatherForecast extends LightningElement {
    @track forecastData;

    _selectedLocation;
    maxAttempts=5; //Max attempts to query the data

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
    
    _todaysWeather;

    @api todaysWeather = '';

    handleLocationChange() {
        this.isLoading = true;
        this.showErrorMessage = false;
        this.getForecast(0);
    }


    @track showErrorMessage = false;
    @track errorMessage = '';
    isLoading = false;
    weatherFormatMap = weatherFormatMap;

    getForecast(attempt) {
        getWeatherForecast({ location: this.selectedLocation })
            .then(result => {
                this.forecastData = result.map((item, index) => ({
                    id: index,
                    weatherLogo: this.populateWeatherLogo(item.description),
                    dayShort: item.day.substring(0, 3).toUpperCase(),
                    ...item
                }));
                this.isLoading = false;
            })
            .catch(error => {
                console.error('Callout failed', error);
                if (attempt < this.maxAttempts) {
                    this.getForecast(attempt + 1);
                } else {
                    this.errorMessage = error?.body?.message + '. Please contact your administrator.';
                    this.showErrorMessage = true;
                    this.isLoading = false;
                }
            });
    }
    populateWeatherLogo(description){
        return this.weatherFormatMap[description]?.logo;
    }

    get cardClass() {
        if (!this.todaysWeather) return "slds-is-relative";
        return "slds-is-relative " + this.weatherFormatMap[this.todaysWeather]?.class;
    }

    get tempUrl() {
        return this.weatherFormatMap[this.todaysWeather]?.tempLogo;
    }
}