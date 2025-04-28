public with sharing class WeatherDTO {
    public class WeatherTodayWrapper{
        @AuraEnabled public String location;
        @AuraEnabled public String temperature;
        @AuraEnabled public String description;
        @AuraEnabled public String humidity;
    }

    public class WeatherForecastWrapper {
        @AuraEnabled public String day;
        @AuraEnabled public String temperature;
        @AuraEnabled public String description;
    }
}