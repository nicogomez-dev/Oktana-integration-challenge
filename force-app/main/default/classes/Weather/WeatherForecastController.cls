public with sharing class WeatherForecastController {
    @AuraEnabled
    public static List<WeatherDTO.WeatherForecastWrapper> getWeatherForecast(String location) {
        if (String.isEmpty(location)) {
            throw CommonUtils.buildAuraException('Location string is empty');
        }
        return WeatherService.getWeatherForecast(location);
    }

}