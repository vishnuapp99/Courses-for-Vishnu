# Design Pattern Categories

All design patterns are organized into **3 main categories**. Understanding these categories makes learning patterns much easier! 🎯

## 📊 The Big Picture

```
Design Patterns
│
├── 🏗️ Creational Patterns
│   └── "How objects are created"
│
├── 🔧 Structural Patterns
│   └── "How classes/objects are composed"
│
└── 🎭 Behavioral Patterns
    └── "How objects communicate"
```

## 🏗️ Category 1: Creational Patterns

### Purpose
**Control the process of object creation**

### When to Use
- Need flexible object creation
- Want to avoid direct instantiation
- Need to manage object lifecycle
- Creating objects is complex

### Patterns in This Category
1. **Singleton** - One instance only
2. **Factory Method** - Create objects without specifying exact class
3. **Abstract Factory** - Factory of factories
4. **Builder** - Step-by-step object construction
5. **Prototype** - Clone existing objects

### Real-World Analogy 🏠
Think of a **construction company**:
- **Factory** = Different teams for different house types
- **Builder** = Step-by-step construction process
- **Singleton** = One project manager for the whole company
- **Prototype** = Using a model home as a template

### Example Scenario
```javascript
// Problem: Creating database connections is complex
// Solution: Use Factory Pattern

class DatabaseFactory {
  createConnection(type) {
    if (type === 'mysql') return new MySQLConnection();
    if (type === 'postgres') return new PostgresConnection();
    if (type === 'mongodb') return new MongoDBConnection();
  }
}
```

## 🔧 Category 2: Structural Patterns

### Purpose
**Organize classes and objects into larger structures**

### When to Use
- Need to combine objects/classes
- Want to add functionality without modifying code
- Need to simplify complex interfaces
- Working with incompatible interfaces

### Patterns in This Category
1. **Adapter** - Make incompatible interfaces work together
2. **Decorator** - Add features dynamically
3. **Facade** - Simple interface over complex system
4. **Composite** - Tree structures (folders, menus)
5. **Proxy** - Control access to objects

### Real-World Analogy 🔌
Think of **electrical adapters**:
- **Adapter** = Travel adapter (US plug → EU socket)
- **Decorator** = Adding features to a phone (case, screen protector)
- **Facade** = Remote control (simple buttons, complex TV internals)
- **Composite** = File system (folders contain files/folders)
- **Proxy** = Security guard (controls access to building)

### Example Scenario
```javascript
// Problem: Old payment system incompatible with new API
// Solution: Use Adapter Pattern

class OldPaymentSystem {
  pay(amount) {
    return `Paid $${amount} via old system`;
  }
}

class PaymentAdapter {
  constructor(oldSystem) {
    this.oldSystem = oldSystem;
  }
  
  processPayment(amount) {
    // Adapts old interface to new one
    return this.oldSystem.pay(amount);
  }
}
```

## 🎭 Category 3: Behavioral Patterns

### Purpose
**Manage communication and responsibilities between objects**

### When to Use
- Need flexible communication between objects
- Want to reduce coupling
- Need to handle state changes
- Working with algorithms that can vary

### Patterns in This Category
1. **Strategy** - Interchangeable algorithms
2. **Observer** - Event-driven communication
3. **Command** - Encapsulate requests
4. **Chain of Responsibility** - Request handling chain
5. **State** - Object behavior changes with state
6. **Template Method** - Define algorithm skeleton
7. **Mediator** - Centralized communication
8. **Iterator** - Traverse collections
9. **Memento** - Save/restore object state

### Real-World Analogy 📱
Think of a **smartphone**:
- **Strategy** = Different camera modes (portrait, landscape, night)
- **Observer** = Notifications (app updates, messages)
- **Command** = Voice commands ("Call mom")
- **Chain** = Customer support (Level 1 → Level 2 → Manager)
- **State** = Phone states (locked, unlocked, airplane mode)
- **Template** = App installation process (same steps, different apps)
- **Mediator** = Operating system (apps communicate through OS)
- **Iterator** = Scrolling through photos
- **Memento** = Undo/redo in text editor

### Example Scenario
```javascript
// Problem: Different payment methods need different logic
// Solution: Use Strategy Pattern

class PaymentStrategy {
  pay(amount) {
    throw new Error('Must implement pay()');
  }
}

class CreditCardStrategy extends PaymentStrategy {
  pay(amount) {
    return `Paid $${amount} via Credit Card`;
  }
}

class PayPalStrategy extends PaymentStrategy {
  pay(amount) {
    return `Paid $${amount} via PayPal`;
  }
}

class PaymentProcessor {
  constructor(strategy) {
    this.strategy = strategy;
  }
  
  process(amount) {
    return this.strategy.pay(amount);
  }
}
```

## 🎯 How to Choose the Right Category

### Ask Yourself:

1. **"Is my problem about creating objects?"**
   - ✅ Yes → **Creational Patterns**
   - Example: "I need to create different types of users"

2. **"Is my problem about organizing code structure?"**
   - ✅ Yes → **Structural Patterns**
   - Example: "I need to make two incompatible APIs work together"

3. **"Is my problem about object communication or behavior?"**
   - ✅ Yes → **Behavioral Patterns**
   - Example: "I need different algorithms that can be swapped"

## 📈 Learning Priority

### Must Learn First (High Priority):
1. **Creational:** Singleton, Factory, Builder
2. **Structural:** Adapter, Decorator, Facade
3. **Behavioral:** Strategy, Observer, Chain of Responsibility

### Learn Next (Medium Priority):
1. **Creational:** Abstract Factory, Prototype
2. **Structural:** Composite, Proxy
3. **Behavioral:** State, Command, Template Method

### Advanced (Lower Priority):
1. **Behavioral:** Mediator, Iterator, Memento

## 🗺️ Pattern Selection Map

| Your Problem | Category | Pattern |
|-------------|----------|---------|
| Need one instance only | Creational | Singleton |
| Complex object creation | Creational | Builder |
| Incompatible interfaces | Structural | Adapter |
| Add features dynamically | Structural | Decorator |
| Simplify complex system | Structural | Facade |
| Swap algorithms | Behavioral | Strategy |
| Event notifications | Behavioral | Observer |
| Request pipeline | Behavioral | Chain of Responsibility |
| State-based behavior | Behavioral | State |

## 💡 Key Takeaways

1. **Creational** = Object creation problems
2. **Structural** = Code organization problems
3. **Behavioral** = Communication/behavior problems

4. **Start with Creational** - Easiest to understand
5. **Master Behavioral** - Most useful in real projects
6. **Use Structural** - When you need to organize/adapt code

## 🚀 Next Steps

Now that you understand the categories:

1. ✅ Start with [Creational Patterns](./../04-creational-patterns/README.md) - Begin with Singleton
2. ✅ Then learn [Structural Patterns](./../05-structural-patterns/README.md) - Start with Adapter
3. ✅ Finally master [Behavioral Patterns](./../06-behavioral-patterns/README.md) - Focus on Strategy & Observer

---

**Remember:** Understanding categories helps you quickly identify which pattern to use! 🎯

