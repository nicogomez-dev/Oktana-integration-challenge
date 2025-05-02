@isTest
private class WeatherServiceTest {

    @isTest
    static void testGetWeatherTodaySuccess() {
        Test.setMock(HttpCalloutMock.class, new TestDataFactory.WeatherSuccessMock());
        String testLocation = 'São Paulo';

        WeatherDTO.WeatherTodayWrapper result = WeatherService.getWeatherToday(testLocation);
        System.assertEquals(testLocation, result.location, 'Location should be the same');
        System.assertEquals('23', result.temperature, 'Temperature should be the same');
        System.assertEquals('Sunny', result.description, 'Weather description should be the same');
        System.assertEquals('60%', result.humidity, 'Humidity should be the same');
    }

    @isTest
    static void testGetWeatherTodayFailure() {
        Test.setMock(HttpCalloutMock.class, new TestDataFactory.WeatherFailureMock());
        String testLocation = 'São Paulo';
        try {
            WeatherService.getWeatherToday(testLocation);
            System.assert(false, 'Expected AuraHandledException was not thrown');
        } catch (AuraHandledException e) {
            System.assert(e.getMessage().contains('Callout failed'), 'Error message should mention callout failure');
        }
    }

    @isTest
    static void testGetWeatherForecastSuccess() {
        Test.setMock(HttpCalloutMock.class, new TestDataFactory.WeatherForecastSuccessMock());
        String testLocation = 'São Paulo';
        List<WeatherDTO.WeatherForecastWrapper> result =
            WeatherService.getWeatherForecast(testLocation);

        System.assertNotEquals(null, result, 'Result should not be null');
        System.assertEquals(5, result.size(), 'Result size should be five');
        System.assertEquals('Monday', result[0].day, 'First result\'s day should be Monday');
        System.assertEquals('28', result[0].temperature, 'First result\'s temp should be 28');
        System.assertEquals('Sunny', result[0].description, 'First result\'s description should be Sunny');
        System.assertEquals('Friday', result[4].day, 'Last result\'s day should be Friday');
    }

    @isTest
    static void testGetWeatherForecastFailure() {
        Test.setMock(HttpCalloutMock.class, new TestDataFactory.WeatherFailureMock());
        String testLocation = 'São Paulo';
        try {
            WeatherService.getWeatherForecast(testLocation);
            System.assert(false, 'Expected AuraHandledException was not thrown');
        } catch (AuraHandledException e) {
            System.assert(e.getMessage().contains('Callout failed'), 'Error message should mention callout failure');
        }
    }


}