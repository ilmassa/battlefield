package xyz.codevomit.demostreamer.rest;

import java.util.concurrent.atomic.AtomicLong;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import xyz.codevomit.demostreamer.Greeting;

/**
 *
 * @author merka
 */
@RestController
public class GreetingController
{
    private static final String namePlaceholder = "{name}";
    private static final String template = "Hello, {name}!";
    private final AtomicLong counter = new AtomicLong(0);
    
    @RequestMapping(path = "/greeting")
    public Greeting greeting(
            @RequestParam(value = "name", defaultValue = "World") String name)
    {
        long id = counter.incrementAndGet();
        String content = template.replace(namePlaceholder, name);
        Greeting greeting = new Greeting(id, content);
        return greeting;
    }
    
//    @MessageMapping("/hello")
//    // @SendTo("/topic/greeting")
//    public Greeting manageWebSocketGreeting(HelloMessage message)
//    {
//        long id = counter.incrementAndGet();
//        return new Greeting(id, "This is a broadcast greeting message triggered by " + message.getName());
//    }
}
