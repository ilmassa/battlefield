package xyz.codevomit.demostreamer.rest.battle.command;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 *
 * @author merka
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class FireCommand extends BattlefieldCommand
{
    String type = "fire";
    Long x;
    Long y;
    Long z;
}
