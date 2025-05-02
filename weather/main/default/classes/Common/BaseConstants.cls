public with sharing class BaseConstants {
    public static final String API_ENDPOINT_CURRENT = 'https://oktana-e0-dev-ed.develop.my.site.com/tech/services/apexrest/WeatherService/current/';
    public static final String API_ENDPOINT_FORECAST = 'https://oktana-e0-dev-ed.develop.my.site.com/tech/services/apexrest/WeatherService/forecast/';
    public static final List<String> DEFAULT_LOCATIONS = new List<String>{'Asunción','Montevideo','La Paz','Quito','São Paulo', 'Madrid', 'New York','West Virginia','Paris','Roma','Tokio','Seoul'};
    
    public static final  Map<String, String> ESCAPED_CHARS = new Map<String, String>{
                                                        'á' => '%C3%A1',
                                                        'é' => '%C3%A9',
                                                        'í' => '%C3%AD',
                                                        'ó' => '%C3%B3',
                                                        'ú' => '%C3%BA',
                                                        'ã' => '%C3%A3',
                                                        'õ' => '%C3%B5',
                                                        ' ' => '%20'};
}