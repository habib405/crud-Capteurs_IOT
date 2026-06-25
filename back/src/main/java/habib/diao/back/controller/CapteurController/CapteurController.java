package habib.diao.back.controller.CapteurController;

import habib.diao.back.model.CapteurConnecte.CapteurConnecte;
import habib.diao.back.service.CapteurService.CapteurService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/capteurs")
@Validated
public class CapteurController {

    private final CapteurService capteurService;

    public CapteurController(CapteurService capteurService) {
        this.capteurService = capteurService;
    }

    @GetMapping
    public ResponseEntity<List<CapteurConnecte>> getAll() {
        return ResponseEntity.ok(capteurService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CapteurConnecte> getById(@PathVariable Long id) {
        return ResponseEntity.ok(capteurService.getById(id));
    }

    @PostMapping
    public ResponseEntity<CapteurConnecte> create(@Valid @RequestBody CapteurConnecte capteur) {
        CapteurConnecte created = capteurService.create(capteur);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.getId())
                .toUri();
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CapteurConnecte> update(@PathVariable Long id, @Valid @RequestBody CapteurConnecte capteur) {
        return ResponseEntity.ok(capteurService.update(id, capteur));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        capteurService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
