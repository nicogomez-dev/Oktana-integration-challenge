import { createElement } from '@lwc/engine-dom';
import WeatherForecast from 'c/weatherForecast';
import getWeatherForecast from '@salesforce/apex/WeatherForecastController.getWeatherForecast';

const mockWeatherForecast = require('./data/weatherForecast.json')
const mockForecastError = {
    body: {message: 'Test Error'}
}

jest.unmock('c/weatherForecast');
jest.mock(
    '@salesforce/apex/WeatherForecastController.getWeatherForecast',
    () => ({
        default: jest.fn()
    }),
    { virtual: true }
);


describe('c-weather-forecast', () => {
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
    async function flushPromises() {
        return Promise.resolve();
    }

    it('shows data when received, no error message', async ()=>{
        getWeatherForecast.mockResolvedValue(mockWeatherForecast);
        const element = createElement('c-weather-forecast', {
            is: WeatherForecast
        });
        
        document.body.appendChild(element);
        element.selectedLocation='Paris';

        await flushPromises();

        //Assertions
        const forecastData = element.shadowRoot.querySelector('[data-id="forecast-container"]');
        const firstDay = element.shadowRoot.querySelector('[data-id="Monday"]');
        const secondDay = element.shadowRoot.querySelector('[data-id="Tuesday"]');
        const lastDay = element.shadowRoot.querySelector('[data-id="Friday"]');
        const errorBlock = element.shadowRoot.querySelector('[data-id="error-block"]');
        
        expect(forecastData).not.toBeNull();
        expect(firstDay).not.toBeNull();
        expect(secondDay).not.toBeNull();
        expect(lastDay).not.toBeNull();
        expect(firstDay.innerHTML).toContain("MON");
        expect(secondDay.innerHTML).toContain("TUE");
        expect(lastDay.innerHTML).toContain("FRI");
        expect(errorBlock).toBeNull();

    });

    it('shows error when received, no data', async ()=>{
        getWeatherForecast.mockRejectedValue(mockForecastError);
        const element = createElement('c-weather-forecast', {
            is: WeatherForecast
        });
        
        document.body.appendChild(element);
        element.selectedLocation='Paris';

        await flushPromises();
        await flushPromises();
        await flushPromises();
        await flushPromises();
        await flushPromises();


        //Assertions
        const forecast = element.shadowRoot.querySelector('[data-id="forecast-container"]');
        const errorBlock = element.shadowRoot.querySelector('[data-id="error-block"]');
        
        expect(forecast).toBeNull();
        expect(errorBlock).not.toBeNull();
        expect(errorBlock.innerHTML).toContain(mockForecastError.body.message);
    });
});