package sn.douanes.gestionstockpostgres.entities;

import jakarta.persistence.*;
@Entity
@Table(name = "utilisateurvehicule")
public class UtilisateurVehicule {

    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id")
    private Long  id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "identifiant_utilisateur")
    private Utilisateur utilisateur;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "identifiant_vehicule")
    private Vehicule vehicule;


    public UtilisateurVehicule() {
    }

    public UtilisateurVehicule(Long id, Utilisateur utilisateur, Vehicule vehicule) {
        this.id = id;
        this.utilisateur = utilisateur;
        this.vehicule = vehicule;
    }

    public UtilisateurVehicule(Utilisateur utilisateur, Vehicule vehicule) {
        this.utilisateur = utilisateur;
        this.vehicule = vehicule;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    public Vehicule getVehicule() {
        return vehicule;
    }

    public void setVehicule(Vehicule vehicule) {
        this.vehicule = vehicule;
    }
}
