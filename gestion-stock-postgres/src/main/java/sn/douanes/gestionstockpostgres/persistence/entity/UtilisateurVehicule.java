package sn.douanes.gestionstockpostgres.persistence.entity;

import jakarta.persistence.*;
@Entity
@Table(name = "utilisateurvehicule")
public class UtilisateurVehicule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long  id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private Utilisateur user;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "vehicule_id")
    private Vehicule vehicule;


    public UtilisateurVehicule() {
    }

    public UtilisateurVehicule(Long id, Utilisateur user, Vehicule vehicule) {
        this.id = id;
        this.user = user;
        this.vehicule = vehicule;
    }

    public UtilisateurVehicule(Utilisateur user, Vehicule vehicule) {
        this.user = user;
        this.vehicule = vehicule;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Utilisateur getUser() {
        return user;
    }

    public void setUser(Utilisateur user) {
        this.user = user;
    }

    public Vehicule getVehicule() {
        return vehicule;
    }

    public void setVehicule(Vehicule vehicule) {
        this.vehicule = vehicule;
    }
}
