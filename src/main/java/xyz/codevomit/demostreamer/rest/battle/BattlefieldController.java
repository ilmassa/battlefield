package xyz.codevomit.demostreamer.rest.battle;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

/**
 *
 * @author merka
 */
@Controller
@Slf4j
public class BattlefieldController
{
    MessageSendingOperations<String> messagingTemplate;
    
    @Autowired
    public BattlefieldController(MessageSendingOperations<String> messageSendingOperation){
        this.messagingTemplate = messageSendingOperation;                
    }
    
    @MessageMapping("/probe-command")
    @SendTo("/topic/battlefield")
    public String manageProbeCommand(String inputMessage){
        log.info("Received input message: {}", inputMessage);
        return "Output message for [" + inputMessage + "]";
    }
    
    @MessageMapping("/move")
    @SendTo("/topic/battlefield")
    public MoveCommand move(MoveCommand moveCommand){
        return moveCommand;
    }
}
