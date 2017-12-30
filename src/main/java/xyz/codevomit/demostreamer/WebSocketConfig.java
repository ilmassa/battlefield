package xyz.codevomit.demostreamer;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import xyz.codevomit.demostreamer.rest.battle.BattlefieldHandshakeInterceptor;

/**
 *
 * @author merka
 */
@Configuration
@EnableWebSocketMessageBroker
@Slf4j
public class WebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer
{

    @Value("${server.contextPath}")
    String serverContextPath;
    
    @Autowired
    BattlefieldHandshakeInterceptor battlefieldHandshakeInterceptor;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry stompEndpointRegistry)
    {
        stompEndpointRegistry
                .addEndpoint("/stream")
                .withSockJS();
        log.debug("Registration of endpoit '/stream': DONE");
        stompEndpointRegistry.addEndpoint("/battlefield").withSockJS()
                .setInterceptors(battlefieldHandshakeInterceptor);
        log.debug("Registration of endpoit '/battlefield': DONE");
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry)
    {
        registry.enableSimpleBroker("/topic");
        registry.setApplicationDestinationPrefixes(serverContextPath + "/app");
    }

}
