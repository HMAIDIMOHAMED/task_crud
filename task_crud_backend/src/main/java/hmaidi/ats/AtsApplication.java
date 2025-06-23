package hmaidi.ats;

import hmaidi.ats.entity.Task;
import hmaidi.ats.repository.TaskRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.List;

@SpringBootApplication
public class AtsApplication {

    public static void main(String[] args) {
        SpringApplication.run(AtsApplication.class, args);
    }

    @Bean
    CommandLineRunner initDatabase(TaskRepository taskRepository) {
        return args -> {
            if (taskRepository.count() == 0) {
                taskRepository.saveAll(List.of(
                        new Task("Étudier Spring Boot", "Lire la doc officielle", LocalDate.now().plusDays(2), false),
                        new Task("Créer une app React", "Initialiser avec Vite ou CRA", LocalDate.now().plusDays(5), false),
                        new Task("Finaliser le projet", "Ajout des tests unitaires", LocalDate.now().plusWeeks(1), false)
                ));
            }
        };
    }
}
