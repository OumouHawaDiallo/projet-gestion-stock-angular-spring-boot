package sn.douanes.gestionstockpostgres.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sn.douanes.gestionstockpostgres.entities.Vehicule;
import sn.douanes.gestionstockpostgres.services.VehiculeService;


import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
public class VehiculeController {

    @Autowired
    VehiculeService vehiculeService;

    @GetMapping("/Vehicules")
    @ResponseBody
    public List<Vehicule> getAllVehicules() {
        List<Vehicule> list = vehiculeService.getAllVehicules();
        return list;
    }

    @GetMapping("/VehiculeById/{id}")
    @ResponseBody
    public Vehicule VehiculeById(@PathVariable long id) {
        Vehicule vehicule = vehiculeService.getVehicule(id);
        return vehicule;
    }

    @PostMapping("/AjouterVehicule")
    @ResponseBody
    public Vehicule AjouterVehicule(@RequestBody Vehicule v) {
        return vehiculeService.saveVehicule(v);
    }

    @PutMapping("/ModifierVehicule/{id}")
    @ResponseBody
    public Vehicule ModifierVehicule(@PathVariable long id, @RequestBody Vehicule v) {
        v.setId(id);
        return vehiculeService.updateVehicule(v);
    }

    @DeleteMapping("SupprimerVehicule/{id}")
    public void SupprimerVehicule(@PathVariable("id") Long Id_vehicule) {
        vehiculeService.deleteVehiculeById(Id_vehicule);
    }


}
