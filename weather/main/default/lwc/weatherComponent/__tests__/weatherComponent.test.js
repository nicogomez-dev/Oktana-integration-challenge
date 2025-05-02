// weatherComponent.test.js

import { createElement } from 'lwc';
import WeatherComponent from 'c/weatherComponent';
import getLocations from '@salesforce/apex/WeatherTodayController.getLocations';

// Mock Apex wire adapter
const mockLocations = ['Paris', 'New York'];

jest.mock(
    '@salesforce/apex/WeatherTodayController.getLocations',
    () => {
        const { createApexTestWireAdapter } = require('@salesforce/sfdx-lwc-jest');
        return { default: createApexTestWireAdapter(jest.fn()) };
    },
    { virtual: true }
);

jest.mock('c/weatherToday');
jest.mock('c/weatherForecast');

afterEach(() => {
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
    }
    jest.clearAllMocks();
});

describe('c-weather-component', () => {
    beforeEach(() => {
        jest.spyOn(console, 'log')
        console.log.mockImplementation(() => null);
        jest.spyOn(console, 'warn')
        console.warn.mockImplementation(() => null);
        jest.spyOn(console, 'error')
        console.error.mockImplementation(() => null);
    });

    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllMocks();
        console.log.mockRestore();
        console.warn.mockRestore();
        console.error.mockRestore();
    });
    it('renders locations picklist correctly when data is returned', async () => {
        const element = createElement('c-weather-component', {
            is: WeatherComponent
        });
        document.body.appendChild(element);
        getLocations.emit(mockLocations);
        return Promise.resolve().then(()=>{
            const combobox = element.shadowRoot.querySelector('lightning-combobox');
            expect(combobox).not.toBeNull();
            const options = combobox.options;
            expect(options.length).toBe(mockLocations.length);
            expect(options[0].label).toContain('Paris');
            expect(options[0].value).toContain('Paris');
            expect(options[1].label).toContain('New York');
        });
    });


    it('renders child components when given a location', async () => {
        const element = createElement('c-weather-component', {
            is: WeatherComponent
        });
        document.body.appendChild(element);
        getLocations.emit(mockLocations);
        await Promise.resolve();
        const combobox = element.shadowRoot.querySelector('lightning-combobox');
        combobox.value = 'Paris';
        combobox.dispatchEvent(new CustomEvent('change', {
            detail: { value: 'Paris' }
        }));
        return Promise.resolve().then(()=>{
            const weatherToday = element.shadowRoot.querySelector('c-weather-today');
            expect(weatherToday).not.toBeNull();
            expect(weatherToday.selectedLocation).toBe('Paris');
            const weatherForecast = element.shadowRoot.querySelector('c-weather-forecast');
            expect(weatherForecast).not.toBeNull();
            expect(weatherForecast.selectedLocation).toBe('Paris');
        });
    });

    it ('does not render child components when not given a location', async () => {
        const element = createElement('c-weather-component', {
            is: WeatherComponent
        });
        document.body.appendChild(element);
        getLocations.emit(mockLocations);
        await Promise.resolve();
        return Promise.resolve().then(()=>{
            const weatherToday = element.shadowRoot.querySelector('c-weather-today');
            expect(weatherToday).toBeNull();
            const weatherForecast = element.shadowRoot.querySelector('c-weather-forecast');
            expect(weatherForecast).toBeNull();
        });
    });

    it ('updates forecast todays-weather when received gotweather event', async () => {
        const element = createElement('c-weather-component', {
            is: WeatherComponent
        });
        document.body.appendChild(element);
        getLocations.emit(mockLocations);
        await Promise.resolve();

        const combobox = element.shadowRoot.querySelector('lightning-combobox');
        combobox.value = 'Paris';
        combobox.dispatchEvent(new CustomEvent('change', {
            detail: { value: 'Paris' }
        }));
        await Promise.resolve();

        const weatherToday = element.shadowRoot.querySelector('c-weather-today');
        weatherToday.dispatchEvent(new CustomEvent('gotweather', {
            detail: {
                message: 'Sunny'
            }
        }));

        return Promise.resolve().then(()=>{
            const weatherForecast = element.shadowRoot.querySelector('c-weather-forecast');
            expect(weatherForecast).not.toBeNull();
            expect(weatherForecast.todaysWeather).toBe('Sunny');
        });
    });

});
