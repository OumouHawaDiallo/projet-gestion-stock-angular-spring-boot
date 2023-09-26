package sn.douanes.gestionstockpostgres.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.douanes.gestionstockpostgres.persistence.entity.Vehicule;

public interface VehiculeRepository extends JpaRepository<Vehicule, Long> {

}
