import { createElement } from 'lwc';
import WeatherToday from 'c/weatherToday';
import getWeatherToday from '@salesforce/apex/WeatherTodayController.getWeatherToday';

const mockWeatherToday = {
    location: 'Paris',
    description: 'Sunny',
    temperature: '12',
    humidity:'12'
}
const mockWeatherError = {
    body: {message: 'Test Error'}
}

jest.unmock('c/weatherToday');
jest.mock(
    '@salesforce/apex/WeatherTodayController.getWeatherToday',
    () => ({
        default: jest.fn()
    }),
    { virtual: true }
);


describe('c-weather-today', () => {
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
        getWeatherToday.mockResolvedValue(mockWeatherToday);
        const element = createElement('c-weather-today', {
            is: WeatherToday
        });
        
        document.body.appendChild(element);
        element.selectedLocation=mockWeatherToday.location;

        await flushPromises();

        //Assertions
        const description = element.shadowRoot.querySelector('[data-id="weather-description"]');
        const temperatureData = element.shadowRoot.querySelector('[data-id="temp-data"]');
        const humidityData = element.shadowRoot.querySelector('[data-id="humid-data"]');
        const errorBlock = element.shadowRoot.querySelector('[data-id="error-block"]');
        
        expect(description).not.toBeNull();
        expect(description.innerHTML).toContain(mockWeatherToday.location);
        expect(description.innerHTML).toContain(mockWeatherToday.description);
        expect(temperatureData.innerHTML).toContain(mockWeatherToday.temperature);
        expect(humidityData.innerHTML).toContain(mockWeatherToday.humidity);
        expect(errorBlock).toBeNull();

    });

    it('shows error when received, no data', async ()=>{
        getWeatherToday.mockRejectedValue(mockWeatherError);
        const element = createElement('c-weather-today', {
            is: WeatherToday
        });
        
        document.body.appendChild(element);
        element.selectedLocation=mockWeatherToday.location;

        await flushPromises();
        await flushPromises();
        await flushPromises();
        await flushPromises();
        await flushPromises();

        //Assertions
        const description = element.shadowRoot.querySelector('[data-id="weather-description"]');
        const errorBlock = element.shadowRoot.querySelector('[data-id="error-block"]');
        
        expect(description).toBeNull();
        expect(errorBlock).not.toBeNull();
        expect(errorBlock.innerHTML).toContain(mockWeatherError.body.message);
    });
});