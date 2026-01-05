# Factory Method Pattern

## 🎯 What Problem Does It Solve?

**Problem:** You need to create objects, but you don't want to specify the exact class of object that will be created.

### Real-World Examples:
- Creating different types of users (Admin, Customer, Guest)
- Creating different payment processors (CreditCard, PayPal, Stripe)
- Creating different notification channels (Email, SMS, Push)
- Creating different database connections (MySQL, PostgreSQL, MongoDB)

## 😵 Why Current Code Is Bad

### Without Factory (Problematic):

```javascript
// ❌ Bad: Direct instantiation with if-else
class User {
  constructor(type, name) {
    this.name = name;
    this.type = type;
  }
}

// Problem: Tight coupling and repetitive code
function createUser(type, name) {
  if (type === 'admin') {
    const user = new User(type, name);
    user.permissions = ['read', 'write', 'delete'];
    user.role = 'Administrator';
    return user;
  } else if (type === 'customer') {
    const user = new User(type, name);
    user.permissions = ['read'];
    user.role = 'Customer';
    return user;
  } else if (type === 'guest') {
    const user = new User(type, name);
    user.permissions = [];
    user.role = 'Guest';
    return user;
  }
  throw new Error('Unknown user type');
}

// Usage
const admin = createUser('admin', 'John');
const customer = createUser('customer', 'Jane');
```

**Problems:**
- Violates Open/Closed Principle (need to modify function for new types)
- Tight coupling (client code knows about all user types)
- Hard to test
- Code duplication
- Difficult to extend

## ✅ Factory Method Pattern Solution

**Define an interface for creating objects, but let subclasses decide which class to instantiate.**

### Structure:

```
┌──────────────┐
│   Creator    │
├──────────────┤
│ + factory()  │
└──────┬───────┘
       │
       │ extends
       │
┌──────▼──────────┐
│ ConcreteCreator │
├─────────────────┤
│ + factory()     │
└─────────────────┘
```

### Implementation:

```javascript
// ✅ Good: Factory Method Pattern

// Step 1: Define the Product interface
class User {
  constructor(name) {
    this.name = name;
  }
  
  getRole() {
    throw new Error('Must implement getRole()');
  }
  
  getPermissions() {
    throw new Error('Must implement getPermissions()');
  }
}

// Step 2: Create concrete products
class AdminUser extends User {
  getRole() {
    return 'Administrator';
  }
  
  getPermissions() {
    return ['read', 'write', 'delete', 'manage'];
  }
}

class CustomerUser extends User {
  getRole() {
    return 'Customer';
  }
  
  getPermissions() {
    return ['read', 'purchase'];
  }
}

class GuestUser extends User {
  getRole() {
    return 'Guest';
  }
  
  getPermissions() {
    return ['read'];
  }
}

// Step 3: Create Factory
class UserFactory {
  static createUser(type, name) {
    switch (type) {
      case 'admin':
        return new AdminUser(name);
      case 'customer':
        return new CustomerUser(name);
      case 'guest':
        return new GuestUser(name);
      default:
        throw new Error(`Unknown user type: ${type}`);
    }
  }
}

// Usage
const admin = UserFactory.createUser('admin', 'John');
const customer = UserFactory.createUser('customer', 'Jane');
const guest = UserFactory.createUser('guest', 'Bob');

console.log(admin.getRole()); // 'Administrator'
console.log(customer.getPermissions()); // ['read', 'purchase']
```

### Simpler Factory (Common Approach):

```javascript
// ✅ Simpler: Just a factory function/class
class PaymentProcessorFactory {
  static create(type) {
    const processors = {
      creditcard: () => new CreditCardProcessor(),
      paypal: () => new PayPalProcessor(),
      stripe: () => new StripeProcessor()
    };
    
    const processor = processors[type];
    if (!processor) {
      throw new Error(`Unknown processor type: ${type}`);
    }
    
    return processor();
  }
}

// Usage
const payment = PaymentProcessorFactory.create('paypal');
payment.process(100);
```

## 🧠 Real-World Analogy

**Think of a car factory:**
- You order a car by **type** (SUV, Sedan, Truck)
- The factory **decides which specific model** to create
- You don't need to know the exact class/model
- The factory handles all the complexity

## 💻 Complete Example: Notification System

```javascript
// Product Interface
class Notification {
  send(message) {
    throw new Error('Must implement send()');
  }
}

// Concrete Products
class EmailNotification extends Notification {
  send(message) {
    console.log(`📧 Email sent: ${message}`);
    return { channel: 'email', status: 'sent', message };
  }
}

class SMSNotification extends Notification {
  send(message) {
    console.log(`📱 SMS sent: ${message}`);
    return { channel: 'sms', status: 'sent', message };
  }
}

class PushNotification extends Notification {
  send(message) {
    console.log(`🔔 Push notification sent: ${message}`);
    return { channel: 'push', status: 'sent', message };
  }
}

// Factory
class NotificationFactory {
  static create(type) {
    const notifications = {
      email: () => new EmailNotification(),
      sms: () => new SMSNotification(),
      push: () => new PushNotification()
    };
    
    const notification = notifications[type.toLowerCase()];
    if (!notification) {
      throw new Error(`Unknown notification type: ${type}`);
    }
    
    return notification();
  }
}

// Usage
function notifyUser(channel, message) {
  const notification = NotificationFactory.create(channel);
  return notification.send(message);
}

// Easy to use, easy to extend!
notifyUser('email', 'Welcome to our app!');
notifyUser('sms', 'Your order is confirmed');
notifyUser('push', 'You have a new message');

// Adding new type is easy - just add to factory!
```

## 🎯 When to Use Factory Method

### ✅ Good Use Cases:
1. **Object Creation Logic is Complex** - Many parameters or conditions
2. **Need Flexibility** - Don't know exact type at compile time
3. **Reducing Coupling** - Client doesn't need to know concrete classes
4. **Extensibility** - Easy to add new types
5. **Centralized Creation** - All object creation in one place

### ❌ When NOT to Use

1. **Simple Object Creation** - If `new Class()` is enough, don't overcomplicate
2. **Only One Type** - If you only create one type, factory is unnecessary
3. **Performance Critical** - Factory adds a small overhead

## 🔄 Factory vs Simple Factory

### Simple Factory (What we showed):
```javascript
// One factory class with static method
class UserFactory {
  static create(type) { /* ... */ }
}
```

### Factory Method (True Pattern):
```javascript
// Abstract creator with factory method
class Creator {
  factoryMethod() {
    throw new Error('Must implement');
  }
}

class AdminCreator extends Creator {
  factoryMethod() {
    return new AdminUser();
  }
}
```

**For most cases, Simple Factory is enough!**

## 📊 Pros and Cons

### ✅ Pros:
- Reduces coupling
- Easy to extend (Open/Closed Principle)
- Centralized object creation
- Hides complex creation logic
- Single Responsibility

### ❌ Cons:
- Can be overkill for simple cases
- Adds abstraction layer
- More classes to maintain

## 🚀 Next Steps

Now that you understand Factory Method:
- ✅ Learn [Abstract Factory Pattern](./03-abstract-factory.md) - Factory of factories
- ✅ Or learn [Builder Pattern](./04-builder.md) - For complex object construction

---

**Remember:** Use Factory when object creation is complex or you need flexibility! 🎯

