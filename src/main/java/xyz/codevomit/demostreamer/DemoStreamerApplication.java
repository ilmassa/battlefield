package xyz.codevomit.demostreamer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@SpringBootApplication
public class DemoStreamerApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoStreamerApplication.class, args);
	}
}
