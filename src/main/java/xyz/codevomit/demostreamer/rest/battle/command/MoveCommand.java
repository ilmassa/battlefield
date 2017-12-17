package xyz.codevomit.demostreamer.rest.battle.command;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 *
 * @author merka
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class MoveCommand extends BattlefieldCommand
{
    String type = "move";
    Double positionX;
    Double positionY;            
    Double x;
    Double y;
}
