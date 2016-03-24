package xyz.codevomit.demostreamer.rest;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import xyz.codevomit.demostreamer.Greeting;
import xyz.codevomit.demostreamer.HelloMessage;

/**
 *
 * @author merka
 */
@Controller
public class HandshakeController
{
    private static final Logger logger = LoggerFactory.getLogger(HandshakeController.class);
    
    private final MessageSendingOperations<String> messagingTeplate;
    
    private final Random random;
    private final AtomicLong counter = new AtomicLong();
            
    @Autowired
    public HandshakeController(MessageSendingOperations<String> template)
    {
        this.messagingTeplate = template;
        this.random = new Random(System.currentTimeMillis());
    }
    
//    @MessageMapping("/stream")
//    // @SendTo("/topic/greeting")
//    public void manageWebSocketGreeting(HelloMessage message)
//    {
//        long id = counter.incrementAndGet();
//    }

    @Scheduled(fixedDelay = 10L)
    public void stream()
    {
        double streamSample = random.nextDouble();
        // logger.info("Sending new sample: " + streamSample);
        messagingTeplate.convertAndSend("/topic/stream", streamSample); 
    }
}
