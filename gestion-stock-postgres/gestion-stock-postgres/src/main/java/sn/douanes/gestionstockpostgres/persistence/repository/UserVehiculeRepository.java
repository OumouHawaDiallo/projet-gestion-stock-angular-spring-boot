package sn.douanes.gestionstockpostgres.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.douanes.gestionstockpostgres.persistence.entity.UserVehicule;

public interface UserVehiculeRepository extends JpaRepository<UserVehicule, Long> {
}
