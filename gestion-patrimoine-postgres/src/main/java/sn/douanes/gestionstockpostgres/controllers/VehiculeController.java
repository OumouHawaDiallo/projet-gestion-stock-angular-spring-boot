package sn.douanes.gestionstockpostgres.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sn.douanes.gestionstockpostgres.entities.HttpResponse;
import sn.douanes.gestionstockpostgres.entities.Vehicule;
import sn.douanes.gestionstockpostgres.services.VehiculeService;


import java.io.IOException;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@CrossOrigin("http://localhost:4200")
public class VehiculeController {

    public static final String VEHICULE_DELETED_SUCCESSFULLY = "Suppression réussie d'un véhicule.";


    @Autowired
    VehiculeService vehiculeService;

    @GetMapping("/Vehicules")
    @ResponseBody
    public List<Vehicule> getAllVehicules() {
        List<Vehicule> list = vehiculeService.getAllVehicules();
        return list;
    }

    @GetMapping("/VehiculeByVehiculeId/{vehiculeId}")
    @ResponseBody
    public Vehicule VehiculeByVehiculeId(@PathVariable String vehiculeId) {
        Vehicule vehicule = vehiculeService.findByVehiculeId(vehiculeId);
        return vehicule;
    }

    @PostMapping("/AjouterVehicule")
    @ResponseBody
    public Vehicule AjouterVehicule(@RequestBody Vehicule v) {
        return vehiculeService.saveVehicule(v);
    }


    @PutMapping("/ModifierVehicule")
    @ResponseBody
    public Vehicule ModifierVehicule(@RequestBody Vehicule v) {
        return vehiculeService.updateVehicule(v);
    }

    @DeleteMapping("SupprimerVehiculeByVehiculeId/{vehiculeId}")
    public ResponseEntity<HttpResponse> SupprimerVehiculeByVehiculeId(@PathVariable("vehiculeId") String vehiculeId) throws IOException {
        vehiculeService.deleteVehiculeById(vehiculeService.findByVehiculeId(vehiculeId).getId());
        return response(OK, VEHICULE_DELETED_SUCCESSFULLY);
    }


    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message),
                httpStatus
        );
    }

}
