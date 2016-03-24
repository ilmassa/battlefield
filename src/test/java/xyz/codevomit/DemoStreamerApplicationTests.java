package xyz.codevomit;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Assert;
import org.junit.Before;
import xyz.codevomit.demostreamer.DemoStreamerApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import xyz.codevomit.demostreamer.Greeting;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = DemoStreamerApplication.class)
@WebAppConfiguration
public class DemoStreamerApplicationTests {

    private static final Logger logger = LoggerFactory.getLogger(DemoStreamerApplicationTests.class);
    
    private MockMvc mockMvc;
    @Autowired
    private WebApplicationContext webApplicationContext;

    @Before
    public void setup() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void testGreeting() throws Exception {
        RequestBuilder getBuilder = MockMvcRequestBuilders.get("/greeting");

        MvcResult result = mockMvc.perform(getBuilder)
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(content().json("{\"id\":1, \"content\":\"Hello, World!\"}")).andReturn();
        String content = result.getResponse().getContentAsString();
        
        Greeting expected = new Greeting(1L, "Hello, World!");
        ObjectMapper mapper = new ObjectMapper();
        Greeting received = mapper.readValue(content, Greeting.class);
        Assert.assertEquals(expected, received);
    }

}
