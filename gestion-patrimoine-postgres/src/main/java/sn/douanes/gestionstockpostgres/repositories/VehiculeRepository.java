package sn.douanes.gestionstockpostgres.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.douanes.gestionstockpostgres.entities.Vehicule;

public interface VehiculeRepository extends JpaRepository<Vehicule, Long> {

}
