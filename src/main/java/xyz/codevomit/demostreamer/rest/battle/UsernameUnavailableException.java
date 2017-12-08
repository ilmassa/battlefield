package xyz.codevomit.demostreamer.rest.battle;

/**
 *
 * @author merka
 */
class UsernameUnavailableException extends RuntimeException
{

    public UsernameUnavailableException()
    {
    }

    public UsernameUnavailableException(String message)
    {
        super(message);
    }

    public UsernameUnavailableException(String message, Throwable cause)
    {
        super(message, cause);
    }

    public UsernameUnavailableException(Throwable cause)
    {
        super(cause);
    }
    
}
