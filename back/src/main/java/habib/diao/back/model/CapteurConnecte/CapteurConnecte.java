package habib.diao.back.model.CapteurConnecte;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "capteurs", uniqueConstraints = @UniqueConstraint(columnNames = "reference"))
public class CapteurConnecte {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "La référence ne peut pas être vide")
    @Column(name = "reference", nullable = false, unique = true)
    private String reference;

    @NotNull(message = "Le type est obligatoire")
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private CapteurType type;

    @NotNull(message = "La valeur seuil est obligatoire")
    @DecimalMin(value = "-50", message = "La valeur seuil doit être supérieure ou égale à -50")
    @DecimalMax(value = "100", message = "La valeur seuil doit être inférieure ou égale à 100")
    @Column(name = "valeur_seuil", nullable = false)
    private Double valeurSeuil;

    @NotNull
    @Column(name = "statut_actif", nullable = false)
    private Boolean statutActif = true;
}
