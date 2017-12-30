package xyz.codevomit.demostreamer.rest.battle.command;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import xyz.codevomit.demostreamer.account.Player;

/**
 *
 * @author merka
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class AddCommand extends BattlefieldCommand
{
    String type = "add";
    Double x;
    Double y;
    List<Player> players;
}
