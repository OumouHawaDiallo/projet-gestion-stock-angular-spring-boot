package sn.douanes.gestionstockpostgres.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sn.douanes.gestionstockpostgres.entities.Utilisateur;
import sn.douanes.gestionstockpostgres.services.UtilisateurService;


import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
public class UtilisateurController {

    @Autowired
    UtilisateurService userService;

    @GetMapping("/Users")
    @ResponseBody
    public List<Utilisateur> getAllUsers() {
        List<Utilisateur> list = userService.getAllUsers();
        return list;
    }

    @GetMapping("/UserById/{id}")
    @ResponseBody
    public Utilisateur UserById(@PathVariable long id) {
        Utilisateur user = userService.getUser(id);
        return user;
    }

    @PostMapping("/AjouterUser")
    @ResponseBody
    public Utilisateur AjouterUser(@RequestBody Utilisateur u) {
        return userService.saveUser(u);
    }

    @PutMapping("/ModifierUser/{id}")
    @ResponseBody
    public Utilisateur ModifierUser(@PathVariable long id, @RequestBody Utilisateur u) {
        u.setId(id);
        return userService.updateUser(u);
    }

    @DeleteMapping("SupprimerUser/{id}")
    public void SupprimerUser(@PathVariable("id") Long Id_user) {
        userService.deleteUserById(Id_user);
    }

}
