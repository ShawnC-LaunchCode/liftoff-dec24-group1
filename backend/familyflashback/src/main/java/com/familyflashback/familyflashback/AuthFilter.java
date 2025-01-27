package com.familyflashback.familyflashback;

import com.familyflashback.familyflashback.models.Session;
import com.familyflashback.familyflashback.models.data.SessionRepository;
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

    private static final List<String> whitelist = Arrays.asList("/auth/login", "/user");

    private static boolean isWhitelisted(String path) {
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


        String sessionID = request.getHeader("session");

        // Don't require sign-in for whitelisted pages
        if (isWhitelisted(request.getRequestURI())) {
            // returning true indicates that the request may proceed
            return true;
        }

        // Check to see if the session id exists in the session table
        if(sessionID != null) {
            Optional<Session> session = sessionRepository.findById(sessionID);

            if (session.isPresent()) {
                return true;
            }
        }

        // The user is NOT logged in
        //response.sendRedirect("");
        return false;
    }
}
