package xyz.codevomit.demostreamer.rest.battle.command;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import xyz.codevomit.demostreamer.account.Player;

/**
 *
 * @author merka
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddCommand
{
    String type = "add";
    String username;
    Long x;
    Long y;
    List<Player> players;
}
