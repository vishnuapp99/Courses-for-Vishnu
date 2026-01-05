# Decorator Pattern

## 🎯 What Problem Does It Solve?

**Problem:** You want to **add functionality to objects dynamically** without modifying their code or using inheritance.

### Real-World Examples:
- Adding features to a phone (case, screen protector, camera lens)
- Adding toppings to pizza (cheese, pepperoni, mushrooms)
- Adding middleware to HTTP requests (logging, authentication, compression)
- Adding features to text (bold, italic, underline)
- Adding behaviors to coffee (milk, sugar, whipped cream)

## 😵 Why Current Code Is Bad

### Without Decorator (Problematic):

```javascript
// ❌ Bad: Inheritance explosion
class Coffee {
  cost() {
    return 5;
  }
}

class CoffeeWithMilk extends Coffee {
  cost() {
    return super.cost() + 2;
  }
}

class CoffeeWithSugar extends Coffee {
  cost() {
    return super.cost() + 1;
  }
}

class CoffeeWithMilkAndSugar extends Coffee {
  cost() {
    return super.cost() + 2 + 1;
  }
}

// Problem: What about CoffeeWithMilkAndSugarAndWhippedCream?
// What about CoffeeWithSugarAndMilk? (different order)
// Exponential explosion of classes!
```

**Problems:**
- Class explosion (too many combinations)
- Can't add features at runtime
- Hard to maintain
- Violates Open/Closed Principle

### Alternative (Also Bad):

```javascript
// ❌ Bad: Modifying base class
class Coffee {
  constructor() {
    this.hasMilk = false;
    this.hasSugar = false;
    this.hasWhippedCream = false;
  }
  
  addMilk() {
    this.hasMilk = true;
  }
  
  addSugar() {
    this.hasSugar = true;
  }
  
  cost() {
    let total = 5;
    if (this.hasMilk) total += 2;
    if (this.hasSugar) total += 1;
    if (this.hasWhippedCream) total += 3;
    return total;
  }
}

// Problem: Modifies base class for every new feature!
// Violates Open/Closed Principle
```

## ✅ Decorator Pattern Solution

**Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.**

### Structure:

```
┌─────────────┐
│  Component  │
├─────────────┤
│ + operation()│
└──────┬──────┘
       │
       │ implements
       │
┌──────▼──────────┐      ┌──────────────┐
│ ConcreteComponent│      │   Decorator  │
└─────────────────┘      ├──────────────┤
                          │ - component  │
                          │ + operation()│
                          └──────┬───────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
            ┌───────▼──────┐         ┌────────▼────────┐
            │Concrete      │         │Concrete        │
            │Decorator A   │         │Decorator B     │
            └──────────────┘         └────────────────┘
```

### Implementation:

```javascript
// ✅ Good: Decorator Pattern

// Step 1: Component interface
class Coffee {
  cost() {
    throw new Error('Must implement cost()');
  }
  
  description() {
    throw new Error('Must implement description()');
  }
}

// Step 2: Concrete component
class SimpleCoffee extends Coffee {
  cost() {
    return 5;
  }
  
  description() {
    return 'Simple Coffee';
  }
}

// Step 3: Base decorator
class CoffeeDecorator extends Coffee {
  constructor(coffee) {
    super();
    this.coffee = coffee;
  }
  
  cost() {
    return this.coffee.cost();
  }
  
  description() {
    return this.coffee.description();
  }
}

// Step 4: Concrete decorators
class MilkDecorator extends CoffeeDecorator {
  cost() {
    return this.coffee.cost() + 2;
  }
  
  description() {
    return this.coffee.description() + ', Milk';
  }
}

class SugarDecorator extends CoffeeDecorator {
  cost() {
    return this.coffee.cost() + 1;
  }
  
  description() {
    return this.coffee.description() + ', Sugar';
  }
}

class WhippedCreamDecorator extends CoffeeDecorator {
  cost() {
    return this.coffee.cost() + 3;
  }
  
  description() {
    return this.coffee.description() + ', Whipped Cream';
  }
}

// Usage - Compose dynamically!
let coffee = new SimpleCoffee();
console.log(coffee.description(), coffee.cost());
// "Simple Coffee" 5

coffee = new MilkDecorator(coffee);
console.log(coffee.description(), coffee.cost());
// "Simple Coffee, Milk" 7

coffee = new SugarDecorator(coffee);
console.log(coffee.description(), coffee.cost());
// "Simple Coffee, Milk, Sugar" 8

coffee = new WhippedCreamDecorator(coffee);
console.log(coffee.description(), coffee.cost());
// "Simple Coffee, Milk, Sugar, Whipped Cream" 11

// Can add in any order!
let anotherCoffee = new SimpleCoffee();
anotherCoffee = new SugarDecorator(anotherCoffee);
anotherCoffee = new WhippedCreamDecorator(anotherCoffee);
// Different combination, no new classes needed!
```

## 🧠 Real-World Analogy

**Think of decorating a phone:**
- Start with a **basic phone**
- Add a **case** (decorator)
- Add a **screen protector** (another decorator)
- Add a **camera lens** (another decorator)
- Each decorator adds functionality
- You can add/remove decorators dynamically
- No need to create "PhoneWithCaseAndScreenProtector" class!

## 💻 Complete Example: HTTP Request Decorators

```javascript
// Component
class HTTPRequest {
  send() {
    throw new Error('Must implement send()');
  }
}

// Concrete component
class BasicRequest extends HTTPRequest {
  constructor(url, data) {
    super();
    this.url = url;
    this.data = data;
  }
  
  send() {
    console.log(`Sending request to ${this.url}`);
    return { url: this.url, data: this.data };
  }
}

// Base decorator
class RequestDecorator extends HTTPRequest {
  constructor(request) {
    super();
    this.request = request;
  }
  
  send() {
    return this.request.send();
  }
}

// Concrete decorators
class LoggingDecorator extends RequestDecorator {
  send() {
    console.log(`[LOG] Request started at ${new Date().toISOString()}`);
    const result = this.request.send();
    console.log(`[LOG] Request completed`);
    return result;
  }
}

class AuthenticationDecorator extends RequestDecorator {
  constructor(request, token) {
    super(request);
    this.token = token;
  }
  
  send() {
    console.log(`[AUTH] Adding authentication token`);
    const result = this.request.send();
    result.headers = { ...result.headers, Authorization: `Bearer ${this.token}` };
    return result;
  }
}

class CompressionDecorator extends RequestDecorator {
  send() {
    console.log(`[COMPRESS] Compressing request data`);
    const result = this.request.send();
    result.compressed = true;
    return result;
  }
}

class RetryDecorator extends RequestDecorator {
  constructor(request, maxRetries = 3) {
    super(request);
    this.maxRetries = maxRetries;
  }
  
  send() {
    let lastError;
    for (let i = 0; i < this.maxRetries; i++) {
      try {
        console.log(`[RETRY] Attempt ${i + 1}`);
        return this.request.send();
      } catch (error) {
        lastError = error;
        console.log(`[RETRY] Failed, retrying...`);
      }
    }
    throw lastError;
  }
}

// Usage - Compose features dynamically!
let request = new BasicRequest('https://api.example.com/users', { name: 'John' });

// Add features as needed
request = new LoggingDecorator(request);
request = new AuthenticationDecorator(request, 'abc123');
request = new CompressionDecorator(request);
request = new RetryDecorator(request, 3);

const result = request.send();
// Logs all decorator actions and returns result
```

## 🎯 When to Use Decorator Pattern

### ✅ Good Use Cases:
1. **Dynamic Feature Addition** - Add features at runtime
2. **Avoiding Class Explosion** - Too many combinations
3. **Middleware/Interceptors** - HTTP, logging, caching
4. **UI Components** - Adding borders, scrollbars, etc.
5. **Stream Processing** - Adding filters, transformations

### ❌ When NOT to Use

1. **Simple Extensions** - If inheritance is enough
2. **Performance Critical** - Decorators add layers
3. **Can Modify Source** - Might be simpler to modify directly

## 🔄 Decorator vs Inheritance

| Aspect | Inheritance | Decorator |
|--------|-------------|-----------|
| **Flexibility** | Static (compile-time) | Dynamic (runtime) |
| **Classes Needed** | Many (explosion) | Few (composable) |
| **Modification** | Need new class | Just wrap |
| **Use Case** | Fixed combinations | Dynamic combinations |

## 📊 Pros and Cons

### ✅ Pros:
- Add functionality dynamically
- Avoids class explosion
- Single Responsibility (each decorator does one thing)
- Open/Closed Principle (extend without modifying)
- Compose features flexibly

### ❌ Cons:
- Can be hard to understand (many layers)
- Order of decorators matters
- Can be overused
- Performance overhead (multiple layers)

## 🚀 Next Steps

Now that you understand Decorator:
- ✅ Learn [Facade Pattern](./03-facade.md) - Simplify complex systems
- ✅ Or review [Structural Patterns Overview](./README.md)

---

**Remember:** Use Decorator when you need to add features dynamically without class explosion! 🎯

