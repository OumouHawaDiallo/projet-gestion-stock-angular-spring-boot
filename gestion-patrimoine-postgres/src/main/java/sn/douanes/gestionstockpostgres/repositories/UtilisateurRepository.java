package sn.douanes.gestionstockpostgres.repositories;

import jdk.jshell.execution.Util;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.gestionstockpostgres.entities.Utilisateur;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    Utilisateur findByUtilisateurId(String utilisateurId);
}
