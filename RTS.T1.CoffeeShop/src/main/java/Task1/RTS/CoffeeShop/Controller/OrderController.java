package Task1.RTS.CoffeeShop.Controller;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;  // Added this import
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import Task1.RTS.CoffeeShop.Model.OrderItem;
import Task1.RTS.CoffeeShop.Model.Orders;
import Task1.RTS.CoffeeShop.Service.OrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderService service;
    
//    @Autowired
//    private OrderRepo repo;

    @PostMapping("/placeOrder")
    public ResponseEntity<?> placeOrder(@RequestBody Orders order) {
        // Validate the order data
        if (order.getItems() == null || order.getItems().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Order must have at least one item.");
        }

        // Calculate total amount, tax, and final amount
        BigDecimal totalAmount = BigDecimal.ZERO;
        for (OrderItem item : order.getItems()) {
            totalAmount = totalAmount.add(item.getPrice().multiply(new BigDecimal(item.getQuantity())));
        }

        BigDecimal tax = totalAmount.multiply(new BigDecimal("0.05"));  // 5% tax
        BigDecimal finalAmount = totalAmount.add(tax);

        order.setTotalAmount(totalAmount);
        order.setTax(tax);
        order.setFinalAmount(finalAmount);
        order.setOrderDate(LocalDateTime.now()); // Set the order date

        // Save the order
        try {
            service.saveOrder(order);
            return ResponseEntity.status(HttpStatus.CREATED).body("Order placed successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error placing order: " + e.getMessage());
        }
    }

    @GetMapping("/getAllOrders")
    public ResponseEntity<List<Orders>> getAllOrders() {
        try {
            List<Orders> orders = service.getAllOrders();
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
