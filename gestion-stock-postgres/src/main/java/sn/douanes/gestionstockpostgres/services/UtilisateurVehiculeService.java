package sn.douanes.gestionstockpostgres.services;


import sn.douanes.gestionstockpostgres.entities.UtilisateurVehicule;

import java.util.List;

public interface UtilisateurVehiculeService {

    UtilisateurVehicule saveUserVehicule(UtilisateurVehicule u);
    UtilisateurVehicule updateUserVehicule(UtilisateurVehicule u);
    void deleteUserVehicule(UtilisateurVehicule u);
    void deleteUserVehiculeById(Long id);
    UtilisateurVehicule getUserVehicule(Long id);
    List<UtilisateurVehicule> getAllUserVehicules();
}
