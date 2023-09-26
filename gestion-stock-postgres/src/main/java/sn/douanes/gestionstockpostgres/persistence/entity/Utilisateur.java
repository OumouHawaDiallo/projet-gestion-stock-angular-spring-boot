package sn.douanes.gestionstockpostgres.persistence.entity;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "utilisateur")
public class Utilisateur{

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "date_naissance")
    private Date dateNaissance;

    @Column(name = "lieu_naissance")
    private Date lieuNaissance;

    @OneToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable(	name = "utilisateurvehicule",
            joinColumns = {
                    @JoinColumn(name = "user_id")
            }, inverseJoinColumns = {
            @JoinColumn(name = "vehicule_id")
    }
    )
    private List<Vehicule> vehicules;

    public Utilisateur() {
    }

    public Utilisateur(Long id, String username, String email, Date dateNaissance, Date lieuNaissance, List<Vehicule> vehicules) {
        this.id = id;
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

    public Date getLieuNaissance() {
        return lieuNaissance;
    }

    public void setLieuNaissance(Date lieuNaissance) {
        this.lieuNaissance = lieuNaissance;
    }

    public List<Vehicule> getVehicules() {
        return vehicules;
    }

    public void setVehicules(List<Vehicule> vehicules) {
        this.vehicules = vehicules;
    }


}
