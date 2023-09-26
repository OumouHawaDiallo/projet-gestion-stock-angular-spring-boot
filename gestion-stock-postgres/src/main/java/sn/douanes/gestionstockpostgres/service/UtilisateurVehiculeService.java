package sn.douanes.gestionstockpostgres.service;

import sn.douanes.gestionstockpostgres.persistence.entity.UtilisateurVehicule;

import java.util.List;

public interface UtilisateurVehiculeService {

    UtilisateurVehicule saveUserVehicule(UtilisateurVehicule u);
    UtilisateurVehicule updateUserVehicule(UtilisateurVehicule u);
    void deleteUserVehicule(UtilisateurVehicule u);
    void deleteUserVehiculeById(Long id);
    UtilisateurVehicule getUserVehicule(Long id);
    List<UtilisateurVehicule> getAllUserVehicules();
}
