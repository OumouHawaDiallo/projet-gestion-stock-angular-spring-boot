package sn.douanes.gestionstockpostgres.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sn.douanes.gestionstockpostgres.entities.Utilisateur;
import sn.douanes.gestionstockpostgres.entities.HttpResponse;
import sn.douanes.gestionstockpostgres.services.UtilisateurService;


import java.io.IOException;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@CrossOrigin("http://localhost:4200")
public class UtilisateurController {

    public static final String UTILISATEUR_DELETED_SUCCESSFULLY = "Suppression réussie d'un utilisateur.";

    @Autowired
    UtilisateurService utilisateurService;

    @GetMapping("/Utilisateurs")
    @ResponseBody
    public List<Utilisateur> getAllUsers() {
        List<Utilisateur> list = utilisateurService.getAllUtilisateurs();
        return list;
    }

    @GetMapping("/UtilisateurByUtilisateurId/{utilisateurId}")
    @ResponseBody
    public Utilisateur UtilisateurByUtilisateurId(@PathVariable String utilisateurId) {
        Utilisateur user = utilisateurService.findByUtilisateurId(utilisateurId);
        return user;
    }

    @PostMapping("/AjouterUtilisateur")
    @ResponseBody
    public Utilisateur AjouterUtilisateur(@RequestBody Utilisateur u) {
        return utilisateurService.saveUtilisateur(u);
    }

    @PutMapping("/ModifierUtilisateur")
    @ResponseBody
    public Utilisateur ModifierUtilisateur(@RequestBody Utilisateur u) {
        return utilisateurService.updateUtilisateur(u);
    }

    @DeleteMapping("SupprimerUtilisateurByUtilisateurId/{utilisateurId}")
    public ResponseEntity<HttpResponse> SupprimerUtilisateurByUtilisateurId(@PathVariable("utilisateurId") String utilisateurId) throws IOException {
        utilisateurService.deleteUtilisateurById(utilisateurService.findByUtilisateurId(utilisateurId).getId());
        return response(OK, UTILISATEUR_DELETED_SUCCESSFULLY);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message),
                httpStatus
        );
    }

}
