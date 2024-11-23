package com.pharmaser.bitacora.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Permitir CORS para todas las rutas que comienzan con /api/
                .allowedOrigins("http://localhost:5173") // Cambia esto según tu configuración del frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos permitidos
                .allowedHeaders("*")
                .allowCredentials(true) // Permitir credenciales si es necesario
                .maxAge(3600); // Tiempo de cacheo de la configuración CORS
    }
}