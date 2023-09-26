package sn.douanes.gestionstockpostgres.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import sn.douanes.gestionstockpostgres.persistence.entity.UserVehicule;
import sn.douanes.gestionstockpostgres.persistence.repository.UserVehiculeRepository;
import sn.douanes.gestionstockpostgres.service.UserVehiculeService;

import java.util.List;

public class UserVehiculeServiceImpl implements UserVehiculeService {

    @Autowired
    UserVehiculeRepository userVehiculeRepository;
    @Override
    public UserVehicule saveUserVehicule(UserVehicule u) {
        return userVehiculeRepository.save(u);
    }

    @Override
    public UserVehicule updateUserVehicule(UserVehicule u) {
        return userVehiculeRepository.save(u);
    }

    @Override
    public void deleteUserVehicule(UserVehicule u) {
        userVehiculeRepository.delete(u);

    }

    @Override
    public void deleteUserVehiculeById(Long id) {
        userVehiculeRepository.deleteById(id);

    }

    @Override
    public UserVehicule getUserVehicule(Long id) {
        return userVehiculeRepository.findById(id).get();
    }

    @Override
    public List<UserVehicule> getAllUserVehicules() {
        return userVehiculeRepository.findAll();
    }
}
