package xyz.codevomit.demostreamer.rest;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

/**
 *
 * @author merka
 */
@Controller
@Slf4j
public class HandshakeController
{    
    private final MessageSendingOperations<String> messagingTemplate;
    
    private final Random random;
    private final AtomicLong counter = new AtomicLong();
            
    @Autowired
    public HandshakeController(MessageSendingOperations<String> template)
    {
        this.messagingTemplate = template;
        this.random = new Random(System.currentTimeMillis());
    }
    
//    @MessageMapping("/stream")
//    // @SendTo("/topic/greeting")
//    public void manageWebSocketGreeting(HelloMessage message)
//    {
//        long id = counter.incrementAndGet();
//    }

    @Scheduled(fixedDelay = 100L)
    public void stream()
    {
        double streamSample = random.nextDouble();
        if(log.isDebugEnabled()){
            log.debug("Sending new sample: " + streamSample);
        }
        messagingTemplate.convertAndSend("/topic/stream", streamSample); 
    }
}
