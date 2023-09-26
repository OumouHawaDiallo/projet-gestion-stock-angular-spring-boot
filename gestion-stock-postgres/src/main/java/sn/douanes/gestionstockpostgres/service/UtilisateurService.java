package sn.douanes.gestionstockpostgres.service;

import sn.douanes.gestionstockpostgres.persistence.entity.Utilisateur;

import java.util.List;

public interface UtilisateurService {

    Utilisateur saveUser(Utilisateur u);
    Utilisateur updateUser(Utilisateur u);
    void deleteUser(Utilisateur u);
    void deleteUserById(Long id);
    Utilisateur getUser(Long id);
    List<Utilisateur> getAllUsers();


}
