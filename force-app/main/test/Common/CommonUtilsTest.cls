@isTest
private class CommonUtilsTest {
        
    @isTest
    static void testBuildAuraException() {
        String testMessage = 'This is a test error';
        AuraHandledException ex = CommonUtils.buildAuraException(testMessage);

        System.assertNotEquals(null, ex, 'The exception should not be null');
        System.assertEquals(testMessage, ex.getMessage(), 'The exception message should match the input');
    }

    @isTest
    static void testBuildCalloutException() {
        String testMessage = 'This is a test error';
        CalloutException ex = CommonUtils.buildCalloutException(testMessage);

        System.assertNotEquals(null, ex, 'The exception should not be null');
        System.assertEquals(testMessage, ex.getMessage(), 'The exception message should match the input');
    }
}