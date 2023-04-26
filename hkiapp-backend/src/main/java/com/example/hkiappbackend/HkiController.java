package com.example.hkiappbackend;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin(origins = "https://helsinki-ui.azurewebsites.net")
public class HkiController {

    @RequestMapping("/")
    public String hello() {
      return "Hello, Helsinki";
    }
  

    @GetMapping("/v1/places")
    private String getAllPlaces(){
        String url = "https://open-api.myhelsinki.fi/v1/places/";
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(url, String.class);
        return result;
    }

    @GetMapping("/v1/events")
    private String getAllEvents(){
        String url = "https://open-api.myhelsinki.fi/v1/events/";
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(url, String.class);
        return result;
    }
    
    @GetMapping("/v1/activities")
    private String getAllActivities(){
        String url = "https://open-api.myhelsinki.fi/v1/activities/";
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(url, String.class);
        return result;
    }

    @GetMapping("/v1/places/{tag}") 
    private String getPlaceByTagName(@PathVariable String tag) {
        String url = "https://open-api.myhelsinki.fi/v1/places/?tags_filter=" + tag;
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(url, String.class);
        return result;
        }
    
}
