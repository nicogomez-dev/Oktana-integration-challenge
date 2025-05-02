@isTest
private class HttpCalloutHelperTest {
    @isTest
    static void testBuildHttpGetRequest() {
        String endpoint = 'https://api.example.com/data';
        HttpRequest request = HttpCalloutHelper.buildHttpGetRequest(endpoint);

        System.assertEquals(endpoint, request.getEndpoint(), 'Endpoints are not the same');
        System.assertEquals('GET', request.getMethod(), 'Method should be GET');
    }

    @isTest
    static void testSendHttpRequestSuccess() {
        Test.setMock(HttpCalloutMock.class, new TestDataFactory.WeatherSuccessMock());
        HttpRequest req = HttpCalloutHelper.buildHttpGetRequest('https://api.example.com/success');
        HttpResponse res = HttpCalloutHelper.sendHttpRequest(req);

        System.assertEquals(200, res.getStatusCode(), 'Status code should be 200');
        System.assert(res.getBody().contains('Sunny'), 'Response body should contain Sunny');
    }

    @isTest
    static void testSendHttpRequestFailure() {
        Test.setMock(HttpCalloutMock.class, new TestDataFactory.WeatherFailureMock());
        HttpRequest req = HttpCalloutHelper.buildHttpGetRequest('https://api.example.com/failure');

        try {
            HttpCalloutHelper.sendHttpRequest(req);
            System.assert(false, 'Exception should have been thrown');
        } catch (CalloutException ex) {
            System.assert(ex.getMessage().contains('Callout failed'), 'Exception message should describe the failure');
        }
    }


    @isTest
    static void testNewCalloutException() {
        HttpResponse mockResponse = new HttpResponse();
        mockResponse.setHeader('Content-Type', 'application/json');
        mockResponse.setBody('Something went wrong');
        mockResponse.setStatusCode(500);
        
        CalloutException ex = HttpCalloutHelper.newCalloutException(mockResponse);

        // Assert
        System.assertNotEquals(null, ex, 'Exception should not be null');
        System.assert(ex.getMessage().contains('Callout failed'), 'Message should contain static error text');
        System.assert(ex.getMessage().contains('500'), 'Message should contain status code');
        System.assert(ex.getMessage().contains('Something went wrong'), 'Message should contain response body');
    }

}