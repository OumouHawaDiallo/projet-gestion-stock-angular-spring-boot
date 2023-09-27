package sn.douanes.gestionstockpostgres.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.gestionstockpostgres.entities.Utilisateur;
import sn.douanes.gestionstockpostgres.repositories.UtilisateurRepository;
import sn.douanes.gestionstockpostgres.services.UtilisateurService;


import java.util.List;

@Service
public class UtilisateurServiceImpl implements UtilisateurService {

    @Autowired
    UtilisateurRepository userRepository;

    @Override
    public Utilisateur saveUser(Utilisateur u) {
        return userRepository.save(u);
    }

    @Override
    public Utilisateur updateUser(Utilisateur u) {
        return userRepository.save(u);
    }

    @Override
    public void deleteUser(Utilisateur u) {
        userRepository.delete(u);

    }

    @Override
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);

    }

    @Override
    public Utilisateur getUser(Long id) {
        return userRepository.findById(id).get();
    }

    @Override
    public List<Utilisateur> getAllUsers() {
        return userRepository.findAll();
    }
}
