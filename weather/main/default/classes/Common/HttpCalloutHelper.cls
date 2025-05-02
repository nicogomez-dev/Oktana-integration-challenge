public class HttpCalloutHelper {
    public static HttpRequest buildHttpGetRequest(String endpoint){
        HttpRequest request = new HttpRequest();
        request.setEndpoint(endpoint);
        request.setMethod('GET');
        request.setTimeout(2000);
        return request;
    }
    
    public static HttpResponse sendHttpRequest(HttpRequest request) {
        Http http = new Http();
        HttpResponse response;
        for (Integer attempt= 0; attempt < 5; attempt++) {
            response = http.send(request);
            if (response != null && response.getStatusCode() == 200){
                return response;
            }
        }
        throw newCalloutException(response);
    }

    public static CalloutException newCalloutException(HttpResponse response){
        String statusCode = response!=null? String.valueOf(response.getStatusCode()):'No response';
        String message = response!=null? response.getBody():'No response';
        String errorMessage = 'Callout failed after 5 tries. Received a status code: ' + statusCode + 
            ' and error message: ' + message;
        return CommonUtils.buildCalloutException(errorMessage);
    }
}