package xyz.codevomit.demostreamer.rest.battle;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.Getter;
import lombok.Setter;
import xyz.codevomit.demostreamer.account.Player;

/**
 *
 * @author merka
 */
public class PlayerRegistry
{
    @Getter
    @Setter
    Map<String, Player> usernameToPlayerMap;

    public PlayerRegistry(){
        usernameToPlayerMap = new ConcurrentHashMap<>();
    }
    
    public void addPlayer(Player player)
    {
        if (playerExists(player))
        {
            throw new UsernameUnavailableException(player.getUsername());
        }
        usernameToPlayerMap.put(player.getUsername(), player);
    }

    public boolean playerExists(Player player)
    {
        return playerExists(player.getUsername());
    }
    
    public boolean playerExists(String playerUsername)
    {
        return usernameToPlayerMap.containsKey(playerUsername);
    }
}
