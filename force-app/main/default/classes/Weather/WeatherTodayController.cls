public with sharing class WeatherTodayController {

    @AuraEnabled(cacheable=true)
    public static List<String> getLocations(){
        return BaseConstants.DEFAULT_LOCATIONS;
    }

    @AuraEnabled
    public static WeatherDTO.WeatherTodayWrapper getWeatherToday(String location){
        if (String.isEmpty(location)){
            throw CommonUtils.buildAuraException('Location string is empty');
        }
        return WeatherService.getWeatherToday(location);
    }
}