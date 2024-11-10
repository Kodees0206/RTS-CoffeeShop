package Task1.RTS.CoffeeShop.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import Task1.RTS.CoffeeShop.Model.Orders;
import Task1.RTS.CoffeeShop.Repository.OrderRepo;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private static final Logger logger = LoggerFactory.getLogger(OrderService.class);

    @Autowired
    private OrderRepo repository;

    // Save order to the database
    public Orders saveOrder(Orders orderDetails) {
        // Set the order date as the current date and time
        orderDetails.setOrderDate(LocalDateTime.now());
        
        // Calculate the total amount, tax, and final amount
        orderDetails.setTotalAmount(orderDetails.getTotalAmount());
        orderDetails.setTax(orderDetails.getTax());
        orderDetails.setFinalAmount(orderDetails.getFinalAmount());

        // Save the order
        return repository.save(orderDetails);
    }
 
    // Get all orders
    public List<Orders> getAllOrders() {
        return repository.findAll();  // Ensure this fetches data from the database correctly.
    }

    // Additional method for getting an order by ID
    public Optional<Orders> getOrderById(Long id) {
        try {
            return repository.findById(id);
        } catch (Exception e) {
            logger.error("Error fetching order by ID", e);
            return Optional.empty();  // Return empty if the order is not found
        }
    }
}
