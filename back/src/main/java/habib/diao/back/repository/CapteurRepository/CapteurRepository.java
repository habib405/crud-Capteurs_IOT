package habib.diao.back.repository.CapteurRepository;

import habib.diao.back.model.CapteurConnecte.CapteurConnecte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CapteurRepository extends JpaRepository<CapteurConnecte, Long> {

    Optional<CapteurConnecte> findByReference(String reference);
}
