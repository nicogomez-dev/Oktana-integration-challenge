import { LightningElement, api } from 'lwc';

export default class WeatherForecast extends LightningElement {
    @api selectedLocation;

    @api todaysWeather = '';

}
