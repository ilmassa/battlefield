package xyz.codevomit.demostreamer.rest.battle;

import xyz.codevomit.demostreamer.rest.battle.command.MoveCommand;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import xyz.codevomit.demostreamer.account.Player;
import xyz.codevomit.demostreamer.exception.UsernameAlreadyInUseException;
import xyz.codevomit.demostreamer.rest.battle.command.AddCommand;
import xyz.codevomit.demostreamer.rest.battle.command.FireCommand;
import xyz.codevomit.demostreamer.rest.battle.command.SyncCommand;

/**
 *
 * @author merka
 */
@Controller
@Slf4j
public class BattlefieldController
{
    MessageSendingOperations<String> messagingTemplate;
    PlayerRegistry playerRegistry;

    @Autowired
    public BattlefieldController(MessageSendingOperations<String> messageSendingOperation,
            PlayerRegistry playerRegistry)
    {
        this.messagingTemplate = messageSendingOperation;
        this.playerRegistry = playerRegistry;
    }

    @MessageMapping("/join")
    @SendTo("/topic/battlefield")
    public AddCommand handleAddPlayerMessage(AddCommand command)
    {
        if (playerRegistry.playerExists(command.getUsername()))
        {
            throw new UsernameAlreadyInUseException(command.getUsername());
        }
        playerRegistry.addPlayer(new Player(command.getUsername()));
        return command;
    }

    @MessageMapping("/probe-command")
    @SendTo("/topic/battlefield")
    public String manageProbeCommand(String inputMessage)
    {
        log.info("Received input message: {}", inputMessage);
        return "Output message for [" + inputMessage + "]";
    }

    @MessageMapping("/move")
    @SendTo("/topic/battlefield")
    public MoveCommand handleMoveCommandMessage(MoveCommand moveCommand)
    {
        log.debug("Move command received: {}", moveCommand);
        return moveCommand;
    }

    @MessageMapping("/fire")
    @SendTo("/topic/battlefield")
    public FireCommand handleFireCommandMessage(FireCommand fireCommand)
    {
        log.debug("Fire commnad received: {}", fireCommand);
        return fireCommand;
    }
    
    @MessageMapping("/sync")
    @SendTo("/topic/battlefield")
    public SyncCommand handleFireCommandMessage(SyncCommand syncCommand)
    {
        log.debug("Sync commnad received: {}", syncCommand);
        return syncCommand;
    }
}
