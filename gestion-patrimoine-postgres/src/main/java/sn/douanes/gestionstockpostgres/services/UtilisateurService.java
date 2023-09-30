package sn.douanes.gestionstockpostgres.services;

import sn.douanes.gestionstockpostgres.entities.Utilisateur;

import java.util.List;

public interface UtilisateurService {

    Utilisateur saveUser(Utilisateur u);
    Utilisateur updateUser(Utilisateur u);
    void deleteUser(Utilisateur u);
    void deleteUserById(Long id);
    Utilisateur getUser(Long id);
    List<Utilisateur> getAllUsers();


}
