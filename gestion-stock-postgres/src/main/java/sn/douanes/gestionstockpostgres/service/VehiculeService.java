package sn.douanes.gestionstockpostgres.service;

import sn.douanes.gestionstockpostgres.persistence.entity.Vehicule;

import java.util.List;

public interface VehiculeService {

    Vehicule saveVehicule(Vehicule v);
    Vehicule updateVehicule(Vehicule v);
    void deleteVehicule(Vehicule v);
    void deleteVehiculeById(Long id);
    Vehicule getVehicule(Long id);
    List<Vehicule> getAllVehicules();
}
