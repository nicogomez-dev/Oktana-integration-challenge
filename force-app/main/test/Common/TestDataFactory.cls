@isTest
public class TestDataFactory {

    public class WeatherSuccessMock implements HttpCalloutMock {
        public HTTPResponse respond(HTTPRequest req) {
            WeatherDTO.WeatherTodayWrapper mockData = new WeatherDTO.WeatherTodayWrapper();
            mockData.location = 'São Paulo';
            mockData.temperature = '23';
            mockData.description = 'Sunny';
            mockData.humidity = '60%';

            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(JSON.serialize(mockData));
            res.setStatusCode(200);
            return res;
        }
    }

    public class WeatherForecastSuccessMock implements HttpCalloutMock {
        public HttpResponse respond(HttpRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setStatusCode(200);
            res.setBody('[{"day":"Monday","temperature":"28","description":"Sunny"},' +
                        '{"day":"Tuesday","temperature":"27","description":"Partly Cloudy"},' +
                        '{"day":"Wednesday","temperature":"26","description":"Rainy"},' +
                        '{"day":"Thursday","temperature":"25","description":"Thunderstorms"},' +
                        '{"day":"Friday","temperature":"28","description":"Sunny"}]');
            return res;
        }
    }


    public class WeatherFailureMock implements HttpCalloutMock {
        public HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setStatusCode(500);
            res.setBody('{"error":"Failure"}');
            return res;
        }
    }
    //TO DO: two mock wrappers    
}