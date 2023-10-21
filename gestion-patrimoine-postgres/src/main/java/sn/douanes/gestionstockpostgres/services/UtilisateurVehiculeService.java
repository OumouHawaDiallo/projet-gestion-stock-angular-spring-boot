package sn.douanes.gestionstockpostgres.services;

import sn.douanes.gestionstockpostgres.entities.UtilisateurVehicule;

import java.util.List;

public interface UtilisateurVehiculeService {

    UtilisateurVehicule saveUtilisateurVehicule(UtilisateurVehicule u);
    UtilisateurVehicule updateUtilisateurVehicule(UtilisateurVehicule u);
    void deleteUtilisateurVehicule(UtilisateurVehicule u);
    void deleteUtilisateurVehiculeById(Long id);
    UtilisateurVehicule getUtilisateurVehicule(Long id);
    List<UtilisateurVehicule> getAllUtilisateurVehicules();
}
