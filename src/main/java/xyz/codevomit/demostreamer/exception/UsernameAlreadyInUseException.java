package xyz.codevomit.demostreamer.exception;

/**
 *
 * @author merka
 */
public class UsernameAlreadyInUseException extends RuntimeException
{
    public UsernameAlreadyInUseException()
    {
    }

    public UsernameAlreadyInUseException(String message)
    {
        super(message);
    }

    public UsernameAlreadyInUseException(String message, Throwable cause)
    {
        super(message, cause);
    }

    public UsernameAlreadyInUseException(Throwable cause)
    {
        super(cause);
    }

}
