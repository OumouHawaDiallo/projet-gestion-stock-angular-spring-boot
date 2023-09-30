package sn.douanes.gestionstockpostgres.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
        return vehiculeRepository.save(v);
    }

    @Override
    public Vehicule updateVehicule(Vehicule v) {
        return vehiculeRepository.save(v);
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
}
