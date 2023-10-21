package sn.douanes.gestionstockpostgres.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "vehicule")
public class Vehicule {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    // @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "identifiant_vehicule", nullable = false, updatable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long id;

    @Column(name = "vehicule_id")
    private String vehiculeId;

    @Column(name = "date_enregistrement")
    private Date dateEnregistrement = new Date();

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
    private Date  dateFabrication;

    @Column(name = "date_commande")
    private Date  dateCommande;

    @Column(name = "date_livraison")
    private Date dateLivraison;

    @Column(name = "energie")
    private String energie;

    @Column(name = "etat")
    private String  etat;

    @Column(name = "type_vehicule")
    private String typeVehicule;

    public Vehicule() {
    }

    public Vehicule(Long id, String vehiculeId, Date dateEnregistrement, Integer numeroChassis, Integer numeroMatricule, String modele, String marque, String transmission, String couleur, Date dateFabrication, Date dateCommande, Date dateLivraison, String energie, String etat, String typeVehicule) {
        this.id = id;
        this.vehiculeId = vehiculeId;
        this.dateEnregistrement = dateEnregistrement;
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVehiculeId() {
        return vehiculeId;
    }

    public void setVehiculeId(String vehiculeId) {
        this.vehiculeId = vehiculeId;
    }

    public Date getDateEnregistrement() {
        return dateEnregistrement;
    }

    public void setDateEnregistrement(Date dateEnregistrement) {
        this.dateEnregistrement = dateEnregistrement;
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

    public Date getDateFabrication() {
        return dateFabrication;
    }

    public void setDateFabrication(Date dateFabrication) {
        this.dateFabrication = dateFabrication;
    }

    public Date getDateCommande() {
        return dateCommande;
    }

    public void setDateCommande(Date dateCommande) {
        this.dateCommande = dateCommande;
    }

    public Date getDateLivraison() {
        return dateLivraison;
    }

    public void setDateLivraison(Date dateLivraison) {
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

    @Override
    public String toString() {
        return "Vehicule{" +
                "id=" + id +
                ", vehiculeId='" + vehiculeId + '\'' +
                ", dateEnregistrement=" + dateEnregistrement +
                ", numeroChassis=" + numeroChassis +
                ", numeroMatricule=" + numeroMatricule +
                ", modele='" + modele + '\'' +
                ", marque='" + marque + '\'' +
                ", transmission='" + transmission + '\'' +
                ", couleur='" + couleur + '\'' +
                ", dateFabrication=" + dateFabrication +
                ", dateCommande=" + dateCommande +
                ", dateLivraison=" + dateLivraison +
                ", energie='" + energie + '\'' +
                ", etat='" + etat + '\'' +
                ", typeVehicule='" + typeVehicule + '\'' +
                '}';
    }
}
