package sn.douanes.gestionstockpostgres.services.impl;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.gestionstockpostgres.entities.Utilisateur;
import sn.douanes.gestionstockpostgres.entities.Vehicule;
import sn.douanes.gestionstockpostgres.services.VehiculeService;

import java.util.List;
import sn.douanes.gestionstockpostgres.repositories.VehiculeRepository;

@Service
public class VehiculeServiceImpl  implements VehiculeService {

    @Autowired
    VehiculeRepository vehiculeRepository;

    @Override
    public Vehicule saveVehicule(Vehicule v) {
        v.setVehiculeId(generateVehiculeId());
        return vehiculeRepository.save(v);
    }

    @Override
    public Vehicule updateVehicule(Vehicule v) {

        System.out.println(v);

        Vehicule vehicule = this.findByVehiculeId(v.getVehiculeId());

        if (vehicule != null) {
            vehicule.setNumeroChassis(v.getNumeroChassis());
            vehicule.setNumeroMatricule(v.getNumeroMatricule());
            vehicule.setModele(v.getModele());
            vehicule.setMarque(v.getMarque());
            vehicule.setTransmission(v.getTransmission());
            vehicule.setCouleur(v.getCouleur());
            vehicule.setDateFabrication(v.getDateFabrication());
            vehicule.setDateCommande(v.getDateCommande());
            vehicule.setDateLivraison(v.getDateLivraison());
            vehicule.setEnergie(v.getEnergie());
            vehicule.setEtat(v.getEtat());
            vehicule.setTypeVehicule(v.getTypeVehicule());

            return vehiculeRepository.save(vehicule);
        }

        return null;
    }

    @Override
    public void deleteVehicule(Vehicule v) {
        vehiculeRepository.delete(v);
    }

    @Override
    public void deleteVehiculeById(Long id) {
        vehiculeRepository.deleteById(id);
    }

    @Override
    public Vehicule getVehicule(Long id) {
        return vehiculeRepository.findById(id).get();
    }

    @Override
    public List<Vehicule> getAllVehicules() {
        return vehiculeRepository.findAll();
    }






    public Vehicule findByVehiculeId(String vehiculeId) {
        return vehiculeRepository.findByVehiculeId(vehiculeId);
    }


    private String generateVehiculeId() {
        return RandomStringUtils.randomNumeric(10);
    }

}
