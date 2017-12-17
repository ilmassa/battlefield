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
public class SyncCommand extends BattlefieldCommand
{
    String type = "sync";
    
    Double velocityX;
    Double velocityY;
    Double velocityZ;
            
    Double x;
    Double y;
    Double z;
}
