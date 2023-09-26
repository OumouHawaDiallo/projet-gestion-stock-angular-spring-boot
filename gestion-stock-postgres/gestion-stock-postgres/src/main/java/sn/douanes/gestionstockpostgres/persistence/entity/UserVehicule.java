package sn.douanes.gestionstockpostgres.persistence.entity;

import jakarta.persistence.*;
@Entity
@Table(name = "utilisateurvehicule")

public class UserVehicule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long  id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "vehicule_id")
    private Vehicule vehicule;


    public UserVehicule() {
    }

    public UserVehicule(Long id, User user, Vehicule vehicule) {
        this.id = id;
        this.user = user;
        this.vehicule = vehicule;
    }

    public UserVehicule(User user, Vehicule vehicule) {
        this.user = user;
        this.vehicule = vehicule;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Vehicule getVehicule() {
        return vehicule;
    }

    public void setVehicule(Vehicule vehicule) {
        this.vehicule = vehicule;
    }
}
