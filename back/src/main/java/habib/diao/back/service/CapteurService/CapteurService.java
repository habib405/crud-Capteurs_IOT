package habib.diao.back.service.CapteurService;

import habib.diao.back.model.CapteurConnecte.CapteurConnecte;
import habib.diao.back.repository.CapteurRepository.CapteurRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CapteurService {

    private final CapteurRepository capteurRepository;

    public CapteurService(CapteurRepository capteurRepository) {
        this.capteurRepository = capteurRepository;
    }

    public List<CapteurConnecte> getAll() {
        return capteurRepository.findAll();
    }

    public CapteurConnecte getById(Long id) {
        return capteurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Capteur introuvable avec l'id : " + id));
    }

    public CapteurConnecte create(CapteurConnecte capteur) {
        capteurRepository.findByReference(capteur.getReference()).ifPresent(existing -> {
            throw new IllegalArgumentException("La référence existe déjà : " + capteur.getReference());
        });
        return capteurRepository.save(capteur);
    }

    public CapteurConnecte update(Long id, CapteurConnecte details) {
        CapteurConnecte existing = getById(id);

        if (!existing.getReference().equals(details.getReference())) {
            capteurRepository.findByReference(details.getReference()).ifPresent(conflict -> {
                throw new IllegalArgumentException("La référence existe déjà : " + details.getReference());
            });
        }

        existing.setReference(details.getReference());
        existing.setType(details.getType());
        existing.setValeurSeuil(details.getValeurSeuil());
        existing.setStatutActif(details.getStatutActif());

        return capteurRepository.save(existing);
    }

    public void delete(Long id) {
        CapteurConnecte existing = getById(id);
        capteurRepository.delete(existing);
    }
}
