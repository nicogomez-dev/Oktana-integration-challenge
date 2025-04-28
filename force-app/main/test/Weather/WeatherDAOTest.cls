@isTest
public class WeatherDAOTest {
    @isTest
    static void testGetWeatherTodayAPI() {
        Test.setMock(HttpCalloutMock.class, new TestDataFactory.WeatherSuccessMock());
        String location = 'São Paulo';
        WeatherDTO.WeatherTodayWrapper weatherData = WeatherDAO.getWeatherTodayAPI(location);
        
        System.assertEquals(location, weatherData.location, 'Location should be the same');
        System.assertEquals('23', weatherData.temperature, 'Temperature should be the same');
    }

    @isTest
    static void testGetWeatherForecastAPI() {
        Test.setMock(HttpCalloutMock.class, new TestDataFactory.WeatherForecastSuccessMock());
        String location = 'São Paulo';
        List<WeatherDTO.WeatherForecastWrapper> result = WeatherDAO.getWeatherForecastAPI(location);

        System.assertNotEquals(null, result, 'Result should not be null');
        System.assertEquals(5, result.size(), 'Result size should be five');
        System.assertEquals('Monday', result[0].day, 'First result\'s day should be Monday');
        System.assertEquals('28', result[0].temperature, 'First result\'s temp should be 28');
        System.assertEquals('Sunny', result[0].description, 'First result\'s description should be Sunny');
        System.assertEquals('Friday', result[4].day, 'Last result\'s day should be Friday');
    }
}