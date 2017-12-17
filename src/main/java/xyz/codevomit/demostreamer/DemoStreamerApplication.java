package xyz.codevomit.demostreamer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import xyz.codevomit.demostreamer.rest.battle.BattlefieldHandshakeInterceptor;
import xyz.codevomit.demostreamer.rest.battle.PlayerRegistry;

@SpringBootApplication
public class DemoStreamerApplication
{

    public static void main(String[] args)
    {
        SpringApplication.run(DemoStreamerApplication.class, args);
    }

    @Bean
    @Autowired
    public BattlefieldHandshakeInterceptor battlefieldHandshakeInterceptor(PlayerRegistry playerRegistry)
    {
        return new BattlefieldHandshakeInterceptor(playerRegistry);
    }
    
    @Bean
    public PlayerRegistry playerRegistry(){
        return new PlayerRegistry();
    }
}
