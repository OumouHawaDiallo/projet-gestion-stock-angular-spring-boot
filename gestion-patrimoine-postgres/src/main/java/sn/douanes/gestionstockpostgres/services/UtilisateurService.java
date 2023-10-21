package sn.douanes.gestionstockpostgres.services;

import sn.douanes.gestionstockpostgres.entities.Utilisateur;

import java.util.List;

public interface UtilisateurService {

    Utilisateur saveUtilisateur(Utilisateur u);
    Utilisateur updateUtilisateur(Utilisateur u);
    void deleteUtilisateur(Utilisateur u);
    void deleteUtilisateurById(Long id);
    Utilisateur getUtilisateur(Long id);
    List<Utilisateur> getAllUtilisateurs();


    Utilisateur findByUtilisateurId(String utilisateurId);

}
