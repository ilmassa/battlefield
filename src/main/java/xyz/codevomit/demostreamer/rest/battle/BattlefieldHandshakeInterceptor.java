package xyz.codevomit.demostreamer.rest.battle;

import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

/**
 *
 * @author merka
 */
@Slf4j
public class BattlefieldHandshakeInterceptor implements HandshakeInterceptor
{
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, 
            ServerHttpResponse response, WebSocketHandler wsHandler, 
            Map<String, Object> attributes) throws Exception
    {
        log.info("Handshake intercepted:");
        log.info("Request = {}", IOUtils.toString(request.getBody(), "UTF-8"));
        log.info("Principal = {}", request.getPrincipal());
        log.info("Remote address = {}", request.getRemoteAddress());
        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, 
            ServerHttpResponse response, WebSocketHandler wsHandler, 
            Exception exception)
    {
        log.info("After handshake: {} {} {}", request, response, wsHandler);
    }
    
}
