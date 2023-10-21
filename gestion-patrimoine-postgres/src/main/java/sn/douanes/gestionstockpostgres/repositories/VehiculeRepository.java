package sn.douanes.gestionstockpostgres.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.gestionstockpostgres.entities.Vehicule;


@Repository
public interface VehiculeRepository extends JpaRepository<Vehicule, Long> {

    Vehicule findByVehiculeId(String vehiculeId);
}
