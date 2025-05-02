@isTest
private class WeatherTodayControllerTest {


    @isTest
    static void testGetLocations() {
        List<String> locations = WeatherTodayController.getLocations();
        System.assertNotEquals(null, locations, 'Locations list should not be null');
        System.assert(locations.size() > 0, 'Locations list should not be empty');
    }

    @isTest
    static void testGetWeatherTodaySuccess() {
        Test.setMock(HttpCalloutMock.class, new TestDataFactory.WeatherSuccessMock());
        String locationString = 'São Paulo';
        WeatherDTO.WeatherTodayWrapper result = WeatherTodayController.getWeatherToday(locationString);

        System.assertNotEquals(null, result, 'Response should not be null');
        System.assertEquals(locationString, result.location, 'Response location should be the same');

    }

    @isTest
    static void testGetWeatherTodayEmpty() {
        try {
            WeatherDTO.WeatherTodayWrapper result = WeatherTodayController.getWeatherToday('');
            System.assert(false, 'Expected AuraHandledException was not thrown');
        } catch (AuraHandledException e) {
            System.assert(e.getMessage().contains('Location string is empty'), 'Error message should mention the location being empty');
        }
    }
}