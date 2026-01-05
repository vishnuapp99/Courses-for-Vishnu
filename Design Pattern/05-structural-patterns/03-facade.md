# Facade Pattern

## 🎯 What Problem Does It Solve?

**Problem:** You have a **complex subsystem** with many classes and interactions, and you want to provide a **simple interface** for clients.

### Real-World Examples:
- Remote control for TV (simple buttons, complex TV internals)
- Computer startup (one button, many subsystems)
- Order processing system (one method, many steps)
- API gateway (simple endpoint, complex backend)
- Home automation (one command, many devices)

## 😵 Why Current Code Is Bad

### Without Facade (Problematic):

```javascript
// ❌ Bad: Complex subsystem exposed directly
class CPU {
  start() {
    console.log('CPU starting...');
  }
}

class Memory {
  load() {
    console.log('Memory loading...');
  }
}

class HardDrive {
  read() {
    console.log('Hard drive reading...');
  }
}

class GraphicsCard {
  initialize() {
    console.log('Graphics card initializing...');
  }
}

// Problem: Client needs to know about all subsystems!
function startComputer() {
  const cpu = new CPU();
  const memory = new Memory();
  const hardDrive = new HardDrive();
  const graphicsCard = new GraphicsCard();
  
  // Client must know the exact order and steps!
  cpu.start();
  memory.load();
  hardDrive.read();
  graphicsCard.initialize();
  
  // What if order changes? What if new subsystem added?
  // Client code breaks!
}

// Usage - Too complex!
startComputer();
```

**Problems:**
- Client couples to complex subsystem
- Client must know internal details
- Hard to change subsystem
- Code duplication
- Error-prone (wrong order, missing steps)

## ✅ Facade Pattern Solution

**Provide a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use.**

### Structure:

```
┌──────────┐
│  Client  │
└────┬─────┘
     │
     │ uses simple
     │ interface
     │
┌────▼─────┐
│  Facade  │
├──────────┤
│ + simple │
│  method()│
└────┬─────┘
     │
     │ coordinates
     │
┌────┴──────────────────────────┐
│                                │
│  ┌────────┐  ┌────────┐        │
│  │Class A │  │Class B │  ...   │
│  └────────┘  └────────┘        │
│                                │
│      Complex Subsystem         │
└────────────────────────────────┘
```

### Implementation:

```javascript
// ✅ Good: Facade Pattern

// Complex subsystem (unchanged)
class CPU {
  start() {
    console.log('CPU starting...');
    return 'CPU ready';
  }
}

class Memory {
  load() {
    console.log('Memory loading...');
    return 'Memory ready';
  }
}

class HardDrive {
  read() {
    console.log('Hard drive reading...');
    return 'Hard drive ready';
  }
}

class GraphicsCard {
  initialize() {
    console.log('Graphics card initializing...');
    return 'Graphics card ready';
  }
}

// Facade - Simple interface
class ComputerFacade {
  constructor() {
    this.cpu = new CPU();
    this.memory = new Memory();
    this.hardDrive = new HardDrive();
    this.graphicsCard = new GraphicsCard();
  }
  
  start() {
    console.log('Starting computer...');
    
    // Facade handles all complexity
    const results = [];
    results.push(this.cpu.start());
    results.push(this.memory.load());
    results.push(this.hardDrive.read());
    results.push(this.graphicsCard.initialize());
    
    console.log('Computer started successfully!');
    return results;
  }
  
  shutdown() {
    console.log('Shutting down computer...');
    // Handle shutdown sequence
    console.log('Computer shut down');
  }
}

// Usage - Simple!
const computer = new ComputerFacade();
computer.start();
// Client doesn't need to know about CPU, Memory, etc.!
```

## 🧠 Real-World Analogy

**Think of a remote control:**
- TV has **complex internals** (tuner, amplifier, display, etc.)
- Remote control provides **simple buttons** (power, volume, channel)
- You don't need to know how TV works internally
- Remote control (facade) handles all complexity

## 💻 Complete Example: Order Processing System

```javascript
// Complex subsystem
class InventoryService {
  checkAvailability(productId, quantity) {
    console.log(`Checking inventory for product ${productId}...`);
    return { available: true, stock: 100 };
  }
  
  reserveItems(productId, quantity) {
    console.log(`Reserving ${quantity} items of product ${productId}`);
    return { reserved: true };
  }
}

class PaymentService {
  processPayment(amount, paymentMethod) {
    console.log(`Processing payment of $${amount} via ${paymentMethod}`);
    return { success: true, transactionId: 'TXN123' };
  }
}

class ShippingService {
  calculateShipping(address) {
    console.log(`Calculating shipping to ${address}`);
    return { cost: 10, estimatedDays: 3 };
  }
  
  createShipment(orderId, address) {
    console.log(`Creating shipment for order ${orderId}`);
    return { trackingNumber: 'TRACK123' };
  }
}

class NotificationService {
  sendConfirmation(orderId, email) {
    console.log(`Sending confirmation email to ${email} for order ${orderId}`);
    return { sent: true };
  }
}

// Facade - Simple interface
class OrderFacade {
  constructor() {
    this.inventory = new InventoryService();
    this.payment = new PaymentService();
    this.shipping = new ShippingService();
    this.notification = new NotificationService();
  }
  
  placeOrder(orderData) {
    const { productId, quantity, amount, paymentMethod, address, email } = orderData;
    
    try {
      console.log('=== Processing Order ===');
      
      // Step 1: Check inventory
      const inventory = this.inventory.checkAvailability(productId, quantity);
      if (!inventory.available) {
        throw new Error('Product not available');
      }
      
      // Step 2: Reserve items
      this.inventory.reserveItems(productId, quantity);
      
      // Step 3: Process payment
      const payment = this.payment.processPayment(amount, paymentMethod);
      if (!payment.success) {
        throw new Error('Payment failed');
      }
      
      // Step 4: Calculate shipping
      const shipping = this.shipping.calculateShipping(address);
      
      // Step 5: Create shipment
      const orderId = `ORD-${Date.now()}`;
      const shipment = this.shipping.createShipment(orderId, address);
      
      // Step 6: Send confirmation
      this.notification.sendConfirmation(orderId, email);
      
      console.log('=== Order Processed Successfully ===');
      
      return {
        orderId,
        transactionId: payment.transactionId,
        trackingNumber: shipment.trackingNumber,
        shippingCost: shipping.cost
      };
    } catch (error) {
      console.error('Order processing failed:', error.message);
      throw error;
    }
  }
}

// Usage - Simple one-line call!
const orderSystem = new OrderFacade();

const order = orderSystem.placeOrder({
  productId: 'PROD123',
  quantity: 2,
  amount: 100,
  paymentMethod: 'credit_card',
  address: '123 Main St, New York',
  email: 'customer@example.com'
});

console.log('Order result:', order);
// Client doesn't need to know about all the services!
```

## 🎯 When to Use Facade Pattern

### ✅ Good Use Cases:
1. **Complex Subsystems** - Many classes, complex interactions
2. **Simplified Interface** - Hide complexity from clients
3. **API Gateways** - Single entry point to microservices
4. **Legacy Code** - Wrap old complex code
5. **Layered Architecture** - Simplify layer interactions

### ❌ When NOT to Use

1. **Simple Systems** - If system is already simple, facade is unnecessary
2. **Need Full Control** - If client needs direct access to subsystems
3. **Performance Critical** - Facade adds a layer

## 🔄 Facade vs Other Patterns

| Pattern | Purpose | Use When |
|---------|---------|----------|
| **Facade** | Simplify interface | Complex subsystem |
| **Adapter** | Make incompatible work | Different interfaces |
| **Decorator** | Add functionality | Need to extend |

## 📊 Pros and Cons

### ✅ Pros:
- Simplifies complex subsystems
- Reduces coupling
- Easier to use
- Single entry point
- Can add additional functionality

### ❌ Cons:
- Hides functionality (might need direct access)
- Can become a "god object"
- Adds abstraction layer

## 🚀 Next Steps

Now that you understand Facade:
- ✅ Learn [Composite Pattern](./04-composite.md) - For tree structures
- ✅ Or review [Structural Patterns Overview](./README.md)

---

**Remember:** Use Facade when you want to simplify a complex subsystem! 🎯

