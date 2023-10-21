package sn.douanes.gestionstockpostgres.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "utilisateur")
public class Utilisateur {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    // @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "identifiant_utilisateur", nullable = false, updatable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long id;

    @Column(name = "utilisateur_id")
    private String utilisateurId;

    @Column(name = "date_enregistrement")
    private Date dateEnregistrement = new Date();

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "date_naissance")
    private Date dateNaissance;

    @Column(name = "lieu_naissance")
    private String lieuNaissance;

    @OneToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable(	name = "utilisateurvehicule",
            joinColumns = {
                    @JoinColumn(name = "identifiant_utilisateur")
            }, inverseJoinColumns = {
            @JoinColumn(name = "identifiant_vehicule")
    }
    )
    private List<Vehicule> vehicules;

    public Utilisateur() {
    }

    public Utilisateur(Long id, String utilisateurId, Date dateEnregistrement, String username, String email, Date dateNaissance, String lieuNaissance, List<Vehicule> vehicules) {
        this.id = id;
        this.utilisateurId = utilisateurId;
        this.dateEnregistrement = dateEnregistrement;
        this.username = username;
        this.email = email;
        this.dateNaissance = dateNaissance;
        this.lieuNaissance = lieuNaissance;
        this.vehicules = vehicules;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUtilisateurId() {
        return utilisateurId;
    }

    public void setUtilisateurId(String utilisateurId) {
        this.utilisateurId = utilisateurId;
    }

    public Date getDateEnregistrement() {
        return dateEnregistrement;
    }

    public void setDateEnregistrement(Date dateEnregistrement) {
        this.dateEnregistrement = dateEnregistrement;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(Date dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getLieuNaissance() {
        return lieuNaissance;
    }

    public void setLieuNaissance(String lieuNaissance) {
        this.lieuNaissance = lieuNaissance;
    }

    public List<Vehicule> getVehicules() {
        return vehicules;
    }

    public void setVehicules(List<Vehicule> vehicules) {
        this.vehicules = vehicules;
    }

    @Override
    public String toString() {
        return "Utilisateur{" +
                "id=" + id +
                ", utilisateurId='" + utilisateurId + '\'' +
                ", dateEnregistrement=" + dateEnregistrement +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", dateNaissance=" + dateNaissance +
                ", lieuNaissance='" + lieuNaissance + '\'' +
                ", vehicules=" + vehicules +
                '}';
    }
}
