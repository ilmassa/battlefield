package xyz.codevomit.demostreamer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import xyz.codevomit.demostreamer.rest.battle.BattlefieldHandshakeInterceptor;

@SpringBootApplication
public class DemoStreamerApplication
{

    public static void main(String[] args)
    {
        SpringApplication.run(DemoStreamerApplication.class, args);
    }

    @Bean
    public BattlefieldHandshakeInterceptor battlefieldHandshakeInterceptor()
    {
        return new BattlefieldHandshakeInterceptor();
    }
}
