package sn.douanes.gestionstockpostgres.service;

import sn.douanes.gestionstockpostgres.persistence.entity.UserVehicule;

import java.util.List;

public interface UserVehiculeService {

    UserVehicule saveUserVehicule(UserVehicule u);
    UserVehicule updateUserVehicule(UserVehicule u);
    void deleteUserVehicule(UserVehicule u);
    void deleteUserVehiculeById(Long id);
    UserVehicule getUserVehicule(Long id);
    List<UserVehicule> getAllUserVehicules();
}
