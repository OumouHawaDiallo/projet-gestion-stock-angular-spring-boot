package sn.douanes.gestionstockpostgres.services;

import sn.douanes.gestionstockpostgres.entities.Vehicule;

import java.util.List;

public interface VehiculeService {

    Vehicule saveVehicule(Vehicule v);
    Vehicule updateVehicule(Vehicule v);
    void deleteVehicule(Vehicule v);
    void deleteVehiculeById(Long id);
    Vehicule getVehicule(Long id);
    List<Vehicule> getAllVehicules();

    Vehicule findByVehiculeId(String vehiculeId);
}
