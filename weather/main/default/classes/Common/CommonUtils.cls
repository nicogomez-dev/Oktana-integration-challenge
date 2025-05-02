public class CommonUtils {
    public static AuraHandledException buildAuraException (String errorMessage){
        AuraHandledException newException = new AuraHandledException(errorMessage);
        newException.setMessage(errorMessage);
        return newException;
    }

    public static CalloutException buildCalloutException (String errorMessage){
        CalloutException newException = new CalloutException(errorMessage);
        newException.setMessage(errorMessage);
        return newException;
    }
}