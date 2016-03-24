package xyz.codevomit.demostreamer.service;

import java.util.Random;
import java.util.concurrent.atomic.AtomicBoolean;
import org.springframework.messaging.core.MessageSendingOperations;

/**
 *
 * @author merka
 */
// @Service
public class RandomNumberService {

    private Random random = new Random(System.currentTimeMillis());
    private final MessageSendingOperations<String> template;
    private AtomicBoolean brokerAvailable;

    // @Autowired
    public RandomNumberService(MessageSendingOperations<String> template) {
        this.template = template;
    }

    // @Scheduled(fixedDelay = 500)
    public void sendNewRandomNumber() {
        long randomNumber = random.nextLong();
        if (this.brokerAvailable.get()) {
            this.template.convertAndSend("/stream", randomNumber);
        }
    }
}
