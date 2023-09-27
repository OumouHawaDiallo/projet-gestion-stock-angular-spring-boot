package sn.douanes.gestionstockpostgres.entities;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "vehicule")
public class Vehicule {

    @Id
    @Column(name = "vehicule_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_chassis")
    private Integer numero_chassis;

    @Column(name = "numero_matricule")
    private Integer numero_matricule;

    @Column(name = "modele")
    private String modele;

    @Column(name = "transmission")
    private String transmission;

    @Column(name = "date_fabrication")
    private Date  date_fabrication;

    @Column(name = "date_commande")
    private String  date_commande;

    @Column(name = "date_livraison")
    private Date date_livraison;

    @Column(name = "energie")
    private String energie;

    @Column(name = "etat")
    private String  etat;

    @Column(name = "type_vehicule")
    private String type_vehicule;

    public Vehicule(Long id, Integer numero_chassis, Integer numero_matricule, String modele, String transmission, Date date_fabrication, String date_commande, Date date_livraison, String energie, String etat, String type_vehicule) {
        this.id = id;
        this.numero_chassis = numero_chassis;
        this.numero_matricule = numero_matricule;
        this.modele = modele;
        this.transmission = transmission;
        this.date_fabrication = date_fabrication;
        this.date_commande = date_commande;
        this.date_livraison = date_livraison;
        this.energie = energie;
        this.etat = etat;
        this.type_vehicule = type_vehicule;
    }

    public Vehicule() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumero_chassis() {
        return numero_chassis;
    }

    public void setNumero_chassis(Integer numero_chassis) {
        this.numero_chassis = numero_chassis;
    }

    public Integer getNumero_matricule() {
        return numero_matricule;
    }

    public void setNumero_matricule(Integer numero_matricule) {
        this.numero_matricule = numero_matricule;
    }

    public String getModele() {
        return modele;
    }

    public void setModele(String modele) {
        this.modele = modele;
    }

    public String getTransmission() {
        return transmission;
    }

    public void setTransmission(String transmission) {
        this.transmission = transmission;
    }

    public Date getDate_fabrication() {
        return date_fabrication;
    }

    public void setDate_fabrication(Date date_fabrication) {
        this.date_fabrication = date_fabrication;
    }

    public String getDate_commande() {
        return date_commande;
    }

    public void setDate_commande(String date_commande) {
        this.date_commande = date_commande;
    }

    public Date getDate_livraison() {
        return date_livraison;
    }

    public void setDate_livraison(Date date_livraison) {
        this.date_livraison = date_livraison;
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

    public String getType_vehicule() {
        return type_vehicule;
    }

    public void setType_vehicule(String type_vehicule) {
        this.type_vehicule = type_vehicule;
    }
}
