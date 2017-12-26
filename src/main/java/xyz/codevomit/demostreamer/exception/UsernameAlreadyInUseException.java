package xyz.codevomit.demostreamer.exception;

import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author merka
 */
public class UsernameAlreadyInUseException extends RuntimeException
{
    @Getter
    @Setter
    String username;

    public UsernameAlreadyInUseException(String username)
    {
        super();
        setUsername(username);
    }

    public UsernameAlreadyInUseException(String username, String message)
    {
        super(message);
        setUsername(username);
    }

    public UsernameAlreadyInUseException(String username, String message, Throwable cause)
    {
        super(message, cause);
        setUsername(username);
    }

    public UsernameAlreadyInUseException(String username, Throwable cause)
    {
        super(cause);
        setUsername(username);
    }

    @Override
    public String getMessage()
    {
        String parentMessage = super.getMessage();
        parentMessage = parentMessage != null ? parentMessage : "";
        return parentMessage + "[username = " + getUsername() + "]";
    }
    
}
