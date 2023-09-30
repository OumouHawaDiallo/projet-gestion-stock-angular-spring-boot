package sn.douanes.gestionstockpostgres.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.gestionstockpostgres.entities.UtilisateurVehicule;
import sn.douanes.gestionstockpostgres.repositories.UtilisateurVehiculeRepository;
import sn.douanes.gestionstockpostgres.services.UtilisateurVehiculeService;

import java.util.List;

@Service
public class UserVehiculeServiceImpl implements UtilisateurVehiculeService {

    @Autowired
    UtilisateurVehiculeRepository userVehiculeRepository;
    @Override
    public UtilisateurVehicule saveUserVehicule(UtilisateurVehicule u) {
        return userVehiculeRepository.save(u);
    }

    @Override
    public UtilisateurVehicule updateUserVehicule(UtilisateurVehicule u) {
        return userVehiculeRepository.save(u);
    }

    @Override
    public void deleteUserVehicule(UtilisateurVehicule u) {
        userVehiculeRepository.delete(u);

    }

    @Override
    public void deleteUserVehiculeById(Long id) {
        userVehiculeRepository.deleteById(id);

    }

    @Override
    public UtilisateurVehicule getUserVehicule(Long id) {
        return userVehiculeRepository.findById(id).get();
    }

    @Override
    public List<UtilisateurVehicule> getAllUserVehicules() {
        return userVehiculeRepository.findAll();
    }
}
