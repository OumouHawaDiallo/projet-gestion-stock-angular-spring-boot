package sn.douanes.gestionstockpostgres.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sn.douanes.gestionstockpostgres.entities.Utilisateur;
import sn.douanes.gestionstockpostgres.entities.UtilisateurVehicule;
import sn.douanes.gestionstockpostgres.entities.Vehicule;
import sn.douanes.gestionstockpostgres.repositories.UtilisateurVehiculeRepository;
import sn.douanes.gestionstockpostgres.services.UtilisateurService;
import sn.douanes.gestionstockpostgres.services.UtilisateurVehiculeService;
import sn.douanes.gestionstockpostgres.services.VehiculeService;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
public class UtilisateurVehiculeController {

    @Autowired
    UtilisateurVehiculeRepository userVehiculeRepository;

    @Autowired
    UtilisateurVehiculeService userVehiculeService;

    @Autowired
    UtilisateurService userService;

    @Autowired
    VehiculeService vehiculeService;

    @GetMapping("/userVehicules")
    @ResponseBody
    public List<UtilisateurVehicule> getAlluserVehicules() {
        List<UtilisateurVehicule> list = userVehiculeService.getAllUserVehicules();
        return list;
    }

    @PostMapping("/AjouterUserVehiculeById/{user_id}/{vehicule_id}")
    @ResponseBody
    public void AjouterUserVehiculeById(@PathVariable long user_id, @PathVariable long vehicule_id) {

        Utilisateur user = userService.getUser(user_id);
        Vehicule vehicule = vehiculeService.getVehicule(vehicule_id);

        if(user != null && vehicule != null)
            userVehiculeRepository.save(new UtilisateurVehicule(user.getId(), user, vehicule));
    }
}
