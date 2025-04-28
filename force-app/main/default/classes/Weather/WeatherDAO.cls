public with sharing class WeatherDAO {
    public static WeatherDTO.WeatherTodayWrapper getWeatherTodayAPI(String location) {
        return (WeatherDTO.WeatherTodayWrapper) fetchFromApi(
            BaseConstants.API_ENDPOINT_CURRENT + location,
            WeatherDTO.WeatherTodayWrapper.class
        );
    }

    public static List<WeatherDTO.WeatherForecastWrapper> getWeatherForecastAPI(String location) {
        return (List<WeatherDTO.WeatherForecastWrapper>) fetchFromApi(
            BaseConstants.API_ENDPOINT_FORECAST + location,
            List<WeatherDTO.WeatherForecastWrapper>.class
        );
    }
    
    private static Object fetchFromApi(String apiEndpoint, Type targetType) {
        HttpRequest request = HttpCalloutHelper.buildHttpGetRequest(apiEndpoint);
        HttpResponse response = HttpCalloutHelper.sendHttpRequest(request);
        return JSON.deserialize(response.getBody(), targetType);
    }
}