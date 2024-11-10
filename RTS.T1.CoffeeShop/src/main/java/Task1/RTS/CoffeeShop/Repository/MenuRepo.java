package Task1.RTS.CoffeeShop.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import Task1.RTS.CoffeeShop.Model.Menu;

@Repository
public interface MenuRepo extends JpaRepository<Menu, Long> {
	
}
