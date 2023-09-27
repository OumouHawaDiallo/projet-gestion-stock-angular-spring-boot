package sn.douanes.gestionstockpostgres.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.douanes.gestionstockpostgres.entities.UtilisateurVehicule;


public interface UtilisateurVehiculeRepository extends JpaRepository<UtilisateurVehicule, Long> {
}
