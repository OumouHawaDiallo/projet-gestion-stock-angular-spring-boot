package sn.douanes.gestionstockpostgres.service;

import sn.douanes.gestionstockpostgres.persistence.entity.User;

import java.util.List;

public interface UserService {

    User saveUser(User u);
    User updateUser(User u);
    void deleteUser(User u);
    void deleteUserById(Long id);
    User getUser(Long id);
    List<User> getAllUsers();


}
