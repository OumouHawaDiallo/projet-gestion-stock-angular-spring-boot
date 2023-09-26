package sn.douanes.gestionstockpostgres.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.douanes.gestionstockpostgres.persistence.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
