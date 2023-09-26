package sn.douanes.gestionstockpostgres.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sn.douanes.gestionstockpostgres.persistence.entity.User;
import sn.douanes.gestionstockpostgres.service.UserService;


import java.util.List;

public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/Users")
    @ResponseBody
    public List<User> getAllUsers() {
        List<User> list = userService.getAllUsers();
        return list;
    }

    @GetMapping("/UserById/{id}")
    @ResponseBody
    public User UserById(@PathVariable long id) {
        User user = userService.getUser(id);
        return user;
    }

    @PostMapping("/AjouterUser")
    @ResponseBody
    public User AjouterUser(@RequestBody User u) {
        return userService.saveUser(u);
    }

    @PutMapping("/ModifierUser/{id}")
    @ResponseBody
    public User ModifierUser(@PathVariable long id, @RequestBody User u) {
        u.setId(id);
        return userService.updateUser(u);
    }

    @DeleteMapping("SupprimerUser/{id}")
    public void SupprimerUser(@PathVariable("id") Long Id_user) {
        userService.deleteUserById(Id_user);
    }

}
