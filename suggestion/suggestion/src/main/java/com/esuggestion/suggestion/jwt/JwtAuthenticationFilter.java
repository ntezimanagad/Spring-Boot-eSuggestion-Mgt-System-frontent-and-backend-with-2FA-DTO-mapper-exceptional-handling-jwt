package com.esuggestion.suggestion.jwt;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.esuggestion.suggestion.model.Role;
import com.esuggestion.suggestion.repository.TokenBlacklist;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private TokenBlacklist tokenBlacklist;

    // // Add a list of endpoints that should NOT be filtered (public)
    // private static final List<String> PUBLIC_URLS = List.of(
    //     "/api/auth/login",
    //     "/api/auth/register",
    //     "/api/employees/create"
    // );

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws IOException, ServletException {
        
        // String path = request.getRequestURI();

        // // Skip authentication for public URLs
        // if (isPublicUrl(path)) {
        //     filterChain.doFilter(request, response);
        //     return;
        // }

        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            try {
                if (tokenBlacklist.existsByToken(token)) {
                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    response.setContentType("text/plain");
                    response.getWriter().write("Blacklisted");
                    return;
                }
                String username = jwtUtil.extractUsername(token);
                Role role = jwtUtil.extractRole(token);
                if (username != null && jwtUtil.validateToken(username, token)) {
                    List<SimpleGrantedAuthority> authority = List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, null, authority);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            } catch (ExpiredJwtException e) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("text/plain");
                response.getWriter().write("Token EXPIRED");
                return;
            } catch (Exception e) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("text/plain");
                response.getWriter().write("Invalid");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    // private boolean isPublicUrl(String path) {
    //     return PUBLIC_URLS.stream().anyMatch(path::startsWith);
    // }
}
