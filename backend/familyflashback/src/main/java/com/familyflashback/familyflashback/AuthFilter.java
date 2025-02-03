package com.familyflashback.familyflashback;

import com.familyflashback.familyflashback.models.Session;
import com.familyflashback.familyflashback.models.data.SessionRepository;
import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class AuthFilter implements HandlerInterceptor {

    @Autowired
    SessionRepository sessionRepository;

    private static final List<String> whitelist = Arrays.asList("/auth/login");
    private static final String USER_CREATE_PATH = "/user";

    private static boolean isWhitelisted(String path, String method) {
        // Special case for POST /user
        if (path.equals(USER_CREATE_PATH) && method.equals("POST")) {
            return true;
        }
        
        // Check other whitelist paths
        for (String pathRoot : whitelist) {
            if (path.startsWith(pathRoot)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) throws IOException {

        // Don't require sign-in for whitelisted pages
        if (isWhitelisted(request.getRequestURI(), request.getMethod())) {
            // returning true indicates that the request may proceed
            return true;
        }

        Cookie[] cookies = request.getCookies();
        if(cookies != null) {
            System.out.println("COOKIES IN REQUEST ARE " + cookies);
            String sessionID = cookies[0].getValue();
            System.out.println("SESSION IN REQUEST IS " + sessionID);

            if(sessionID != null) {
                Optional<Session> session = sessionRepository.findById(sessionID);
                System.out.println("SESSION DATA IS " + session);
                if(session.isPresent()) {
                    String userId = session.get().getUserID().getId();
                    request.setAttribute("userId", userId);
                    System.out.println("USER ID SET IN REQUEST IS " + userId);
                    return true;
                }
            }
        }

        return false;
    }
}
