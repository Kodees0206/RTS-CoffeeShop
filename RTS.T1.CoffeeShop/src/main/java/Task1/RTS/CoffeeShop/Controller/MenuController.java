package Task1.RTS.CoffeeShop.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Task1.RTS.CoffeeShop.Model.Menu;
import Task1.RTS.CoffeeShop.Repository.MenuRepo;

@RestController
@RequestMapping("/api/products")
public class MenuController {
	
	@Autowired
	private MenuRepo repo;

	    @GetMapping
	    public List<Menu> getAllProducts() {
	        return repo.findAll();
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<Menu> getProductById(@PathVariable Long id) {
	        return repo.findById(id)
	            .map(ResponseEntity::ok)
	            .orElse(ResponseEntity.notFound().build());
	    }
	

}
