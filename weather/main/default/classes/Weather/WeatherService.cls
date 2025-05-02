public with sharing class WeatherService {
    public static WeatherDTO.WeatherTodayWrapper getWeatherToday(String location){
        String escapedLocation = EncodingUtil.urlEncode(location, 'UTF-8');
        try{
            WeatherDTO.WeatherTodayWrapper weatherData = WeatherDAO.getWeatherTodayAPI(escapedLocation);
            weatherData.location = EncodingUtil.urlDecode(weatherData.location, 'UTF-8');
            return weatherData;
        }catch(Exception e){
            throw CommonUtils.buildAuraException(e.getMessage());
        }
    }

    public static List<WeatherDTO.WeatherForecastWrapper> getWeatherForecast(String location){
        String escapedLocation = EncodingUtil.urlEncode(location, 'UTF-8');
        try {
            return WeatherDAO.getWeatherForecastAPI(escapedLocation);
        } catch (Exception e) {
            throw CommonUtils.buildAuraException(e.getMessage());
        }
    }
}