package sn.douanes.gestionstockpostgres.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import sn.douanes.gestionstockpostgres.persistence.entity.User;
import sn.douanes.gestionstockpostgres.persistence.repository.UserRepository;
import sn.douanes.gestionstockpostgres.service.UserService;

import java.util.List;

public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;
    @Override
    public User saveUser(User u) {
        return userRepository.save(u);
    }

    @Override
    public User updateUser(User u) {
        return userRepository.save(u);
    }

    @Override
    public void deleteUser(User u) {
        userRepository.delete(u);

    }

    @Override
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);

    }

    @Override
    public User getUser(Long id) {
        return userRepository.findById(id).get();
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
