package sn.douanes.gestionstockpostgres.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.gestionstockpostgres.entities.UtilisateurVehicule;
import sn.douanes.gestionstockpostgres.repositories.UtilisateurVehiculeRepository;
import sn.douanes.gestionstockpostgres.services.UtilisateurVehiculeService;

import java.util.List;

@Service
public class UtilisateurVehiculeServiceImpl implements UtilisateurVehiculeService {

    @Autowired
    UtilisateurVehiculeRepository utilisateurVehiculeRepository;
    @Override
    public UtilisateurVehicule saveUtilisateurVehicule(UtilisateurVehicule u) {
        return utilisateurVehiculeRepository.save(u);
    }

    @Override
    public UtilisateurVehicule updateUtilisateurVehicule(UtilisateurVehicule u) {
        return utilisateurVehiculeRepository.save(u);
    }

    @Override
    public void deleteUtilisateurVehicule(UtilisateurVehicule u) {
        utilisateurVehiculeRepository.delete(u);

    }

    @Override
    public void deleteUtilisateurVehiculeById(Long id) {
        utilisateurVehiculeRepository.deleteById(id);

    }

    @Override
    public UtilisateurVehicule getUtilisateurVehicule(Long id) {
        return utilisateurVehiculeRepository.findById(id).get();
    }

    @Override
    public List<UtilisateurVehicule> getAllUtilisateurVehicules() {
        return utilisateurVehiculeRepository.findAll();
    }
}
