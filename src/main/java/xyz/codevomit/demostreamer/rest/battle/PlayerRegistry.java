package xyz.codevomit.demostreamer.rest.battle;

import java.util.Map;
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
    
    public void addPlayer(Player player){
        if(playerExists(player)){
            throw new UsernameUnavailableException(player.getUsername());
        }
    }

    private boolean playerExists(Player player)
    {
        return usernameToPlayerMap.containsKey(player.getUsername());
    }
}
