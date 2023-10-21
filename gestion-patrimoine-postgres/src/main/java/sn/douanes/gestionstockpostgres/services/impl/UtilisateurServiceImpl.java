package sn.douanes.gestionstockpostgres.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.gestionstockpostgres.entities.Utilisateur;
import sn.douanes.gestionstockpostgres.repositories.UtilisateurRepository;
import sn.douanes.gestionstockpostgres.services.UtilisateurService;

import org.apache.commons.lang3.RandomStringUtils;

import java.util.List;

@Service
public class UtilisateurServiceImpl implements UtilisateurService {

    @Autowired
    UtilisateurRepository utilisateurRepository;

    @Override
    public Utilisateur saveUtilisateur(Utilisateur u) {
        u.setUtilisateurId(generateUtilisateurId());
        return utilisateurRepository.save(u);
    }

    @Override
    public Utilisateur updateUtilisateur(Utilisateur u) {

        System.out.println(u);

        Utilisateur utilisateur = this.findByUtilisateurId(u.getUtilisateurId());

        if (utilisateur != null) {
            utilisateur.setUsername(u.getUsername());
            utilisateur.setEmail(u.getEmail());
            utilisateur.setDateNaissance(u.getDateNaissance());
            utilisateur.setLieuNaissance(u.getLieuNaissance());
            utilisateur.setVehicules(u.getVehicules());

            return utilisateurRepository.save(utilisateur);
        }

        return null;
    }

    @Override
    public void deleteUtilisateur(Utilisateur u) {
        utilisateurRepository.delete(u);
    }

    @Override
    public void deleteUtilisateurById(Long id) {
        utilisateurRepository.deleteById(id);
    }

    @Override
    public Utilisateur getUtilisateur(Long id) {
        return utilisateurRepository.findById(id).get();
    }

    @Override
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }




    @Override
    public Utilisateur findByUtilisateurId(String utilisateurId) {
        return utilisateurRepository.findByUtilisateurId(utilisateurId);
    }


    private String generateUtilisateurId() {
        return RandomStringUtils.randomNumeric(10);
    }
}
