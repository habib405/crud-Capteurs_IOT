package habib.diao.back.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI capteurOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API Capteur Connecté")
                        .description("API REST pour gérer les capteurs IoT du projet CRUD")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Equipe Développement")
                                .email("contact@iot-project.local"))
                        .license(new License().name("Apache 2.0").url("http://springdoc.org")))
                .externalDocs(new ExternalDocumentation()
                        .description("Documentation du projet")
                        .url("https://example.com"));
    }
}
