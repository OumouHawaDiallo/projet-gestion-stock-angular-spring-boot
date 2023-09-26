package sn.douanes.gestionstockpostgres.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sn.douanes.gestionstockpostgres.persistence.entity.User;
import sn.douanes.gestionstockpostgres.persistence.entity.UserVehicule;
import sn.douanes.gestionstockpostgres.persistence.entity.Vehicule;
import sn.douanes.gestionstockpostgres.persistence.repository.UserVehiculeRepository;
import sn.douanes.gestionstockpostgres.service.UserService;
import sn.douanes.gestionstockpostgres.service.UserVehiculeService;
import sn.douanes.gestionstockpostgres.service.VehiculeService;

import java.util.List;
@RestController
@CrossOrigin("http://localhost:4200")

public class UserVehiculeController {
    @Autowired
   UserVehiculeRepository userVehiculeRepository;

    @Autowired
    UserVehiculeService userVehiculeService;

    @Autowired
    UserService userService;

    @Autowired
    VehiculeService vehiculeService;

    @GetMapping("/userVehicules")
    @ResponseBody
    public List<UserVehicule> getAlluserVehicules() {
        List<UserVehicule> list = userVehiculeService.getAllUserVehicules();
        return list;
    }

    @PostMapping("/AjouterUserVehiculeById/{user_id}/{vehicule_id}")
    @ResponseBody
    public void AjouterUserVehiculeById(@PathVariable long user_id, @PathVariable long vehicule_id) {

        User user = userService.getUser(user_id);
        Vehicule vehicule = vehiculeService.getVehicule(vehicule_id);

        if(user != null && vehicule != null)
            userVehiculeRepository.save(new UserVehicule(user,vehicule));
    }
}
