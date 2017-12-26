package xyz.codevomit.demostreamer;

import java.util.Properties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configurers.provisioning.InMemoryUserDetailsManagerConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

/**
 *
 * @author merka
 */
@Configuration
@EnableWebSecurity
@Slf4j
public class WebSecurityConfig extends WebSecurityConfigurerAdapter
{
    @Override
    protected void configure(HttpSecurity http) throws Exception
    {
        http.authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/login").permitAll()
                .anyRequest().authenticated()            
                .and().formLogin().loginPage("/").permitAll()
                .and().logout().permitAll();
    }
    
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder authBuilder,
            UserDetailsService userDetailsManager) throws Exception
    {
        authBuilder.userDetailsService(userDetailsManager);
    }
    
    @Bean
    public UserDetailsService inMemoryUserDetailsService(){
        return new InMemoryUserDetailsManager(new Properties());
    }
    
}
