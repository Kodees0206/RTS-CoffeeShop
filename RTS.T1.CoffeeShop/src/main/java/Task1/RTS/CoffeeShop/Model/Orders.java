package Task1.RTS.CoffeeShop.Model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders")
@Transactional
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Mapping a one-to-many relationship with OrderItem
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "order_id")  // Adds a foreign key in the OrderItem table
    private List<OrderItem> items;

    private BigDecimal totalAmount = BigDecimal.ZERO;
    private BigDecimal tax= BigDecimal.ZERO;
    private BigDecimal finalAmount = BigDecimal.ZERO;
    
    @Column(name = "order_date", nullable = false, updatable = false)
    private LocalDateTime orderDate;  // Store current date and time as order date
    
    
}
