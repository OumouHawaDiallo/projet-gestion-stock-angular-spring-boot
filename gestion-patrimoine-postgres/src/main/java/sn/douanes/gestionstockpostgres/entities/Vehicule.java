package sn.douanes.gestionstockpostgres.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "vehicule")
public class Vehicule {

    @Id
    @Column(name = "vehicule_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_chassis")
    private Integer numeroChassis;

    @Column(name = "numero_matricule")
    private Integer numeroMatricule;

    @Column(name = "modele")
    private String modele;

    @Column(name = "marque")
    private String marque;

    @Column(name = "transmission")
    private String transmission;

    @Column(name = "couleur")
    private String couleur;

    @Column(name = "date_fabrication")
    private LocalDate dateFabrication;

    @Column(name = "date_commande")
    private LocalDate  dateCommande;

    @Column(name = "date_livraison")
    private LocalDate dateLivraison;

    @Column(name = "energie")
    private String energie;

    @Column(name = "etat")
    private String  etat;

    @Column(name = "type_vehicule")
    private String typeVehicule;

    public Vehicule(Long id, Integer numeroChassis, Integer numeroMatricule, String modele, String marque, String transmission, String couleur, LocalDate dateFabrication, LocalDate dateCommande, LocalDate dateLivraison, String energie, String etat, String typeVehicule) {
        this.id = id;
        this.numeroChassis = numeroChassis;
        this.numeroMatricule = numeroMatricule;
        this.modele = modele;
        this.marque = marque;
        this.transmission = transmission;
        this.couleur = couleur;
        this.dateFabrication = dateFabrication;
        this.dateCommande = dateCommande;
        this.dateLivraison = dateLivraison;
        this.energie = energie;
        this.etat = etat;
        this.typeVehicule = typeVehicule;
    }

    public Vehicule() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumeroChassis() {
        return numeroChassis;
    }

    public void setNumeroChassis(Integer numeroChassis) {
        this.numeroChassis = numeroChassis;
    }

    public Integer getNumeroMatricule() {
        return numeroMatricule;
    }

    public void setNumeroMatricule(Integer numeroMatricule) {
        this.numeroMatricule = numeroMatricule;
    }

    public String getModele() {
        return modele;
    }

    public void setModele(String modele) {
        this.modele = modele;
    }

    public String getMarque() {
        return marque;
    }

    public void setMarque(String marque) {
        this.marque = marque;
    }

    public String getTransmission() {
        return transmission;
    }

    public void setTransmission(String transmission) {
        this.transmission = transmission;
    }

    public String getCouleur() {
        return couleur;
    }

    public void setCouleur(String couleur) {
        this.couleur = couleur;
    }

    public LocalDate getDateFabrication() {
        return dateFabrication;
    }

    public void setDateFabrication(LocalDate dateFabrication) {
        this.dateFabrication = dateFabrication;
    }

    public LocalDate getDateCommande() {
        return dateCommande;
    }

    public void setDateCommande(LocalDate dateCommande) {
        this.dateCommande = dateCommande;
    }

    public LocalDate getDateLivraison() {
        return dateLivraison;
    }

    public void setDateLivraison(LocalDate dateLivraison) {
        this.dateLivraison = dateLivraison;
    }

    public String getEnergie() {
        return energie;
    }

    public void setEnergie(String energie) {
        this.energie = energie;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public String getTypeVehicule() {
        return typeVehicule;
    }

    public void setTypeVehicule(String typeVehicule) {
        this.typeVehicule = typeVehicule;
    }
}
