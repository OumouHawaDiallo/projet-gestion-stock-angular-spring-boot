package sn.douanes.gestionstockpostgres.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.douanes.gestionstockpostgres.entities.Utilisateur;


public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
}
