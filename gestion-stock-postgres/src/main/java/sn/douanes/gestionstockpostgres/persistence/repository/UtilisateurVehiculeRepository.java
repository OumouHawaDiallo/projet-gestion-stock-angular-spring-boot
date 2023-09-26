package sn.douanes.gestionstockpostgres.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.douanes.gestionstockpostgres.persistence.entity.UtilisateurVehicule;

public interface UtilisateurVehiculeRepository extends JpaRepository<UtilisateurVehicule, Long> {
}
