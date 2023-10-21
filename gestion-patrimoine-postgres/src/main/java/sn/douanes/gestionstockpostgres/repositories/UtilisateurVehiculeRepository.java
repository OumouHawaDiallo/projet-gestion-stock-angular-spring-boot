package sn.douanes.gestionstockpostgres.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.gestionstockpostgres.entities.UtilisateurVehicule;

@Repository
public interface UtilisateurVehiculeRepository extends JpaRepository<UtilisateurVehicule, Long> {
}
