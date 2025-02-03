package com.familyflashback.familyflashback.config;

//import com.familyflashback.familyflashback.AuthFilter;
//import com.familyflashback.familyflashback.AuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173",
                                "http://localhost:5174",
                                "http://localhost:5175",
                                "http://localhost:5176",
                                "http://localhost:5177",
                                "http://localhost:5178",
                                "http://localhost:5179")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

//     Create spring-managed object to allow the app to access our filter
//    @Bean
//    public HandlerInterceptor authenticationFilter() {
//        return new AuthFilter();
//    }
//
//    // Register the filter with the Spring container
//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor( authenticationFilter() );
//    }

      @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:./uploads/");
    }

}