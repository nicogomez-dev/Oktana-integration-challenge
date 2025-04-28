@isTest
private class WeatherForecastControllerTest {
    @isTest
    static void testGetWeatherForecastSuccess() {
        Test.setMock(HttpCalloutMock.class, new TestDataFactory.WeatherForecastSuccessMock());
        String locationString = 'São Paulo';
        List<WeatherDTO.WeatherForecastWrapper> result =
            WeatherForecastController.getWeatherForecast(locationString);

        System.assertNotEquals(null, result, 'Response should not be null');
        System.assertEquals(5, result.size(), 'Result size should be five');
    }

    @isTest
    static void testGetWeatherForecastEmpty() {
        try {
            List<WeatherDTO.WeatherForecastWrapper> result = WeatherForecastController.getWeatherForecast('');
            System.assert(false, 'Expected AuraHandledException was not thrown');
        } catch (AuraHandledException e) {
            System.assert(e.getMessage().contains('Location string is empty'), 'Error message should mention the location being empty');
        }
    }

}