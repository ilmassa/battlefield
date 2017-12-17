package xyz.codevomit.demostreamer.rest.battle.command;

import lombok.Data;

/**
 *
 * @author merka
 */
@Data
public class MoveCommand
{
    String type = "move";
    String username;
    Double x;
    Double y;
}
