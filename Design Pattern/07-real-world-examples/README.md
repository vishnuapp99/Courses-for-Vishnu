# Real-World Examples

This section shows how design patterns are used in real-world applications, especially in backend development and product systems.

## 🎯 Pattern Usage Map

### Backend Development

| Use Case | Pattern | Why |
|----------|---------|-----|
| **Job Actions** (INVITE, APPLY, ACCEPT) | Strategy | Different algorithms for each action |
| **Vendor Selection** | Factory | Create different vendor implementations |
| **Middleware Pipeline** | Chain of Responsibility | Sequential request processing |
| **Notifications** | Observer | Multiple notification channels |
| **Feature Toggles** | State | Behavior changes with feature state |
| **API Response Wrappers** | Decorator | Add headers, logging, caching |
| **External API Integration** | Adapter | Make incompatible APIs work together |
| **Database Connections** | Singleton | One connection pool |
| **Complex Queries** | Builder | Build SQL queries step-by-step |
| **Request Processing** | Facade | Simplify complex backend operations |

### Frontend Development

| Use Case | Pattern | Why |
|----------|---------|-----|
| **UI Components** | Composite | Buttons, panels, containers |
| **Event Handling** | Observer | User interactions, state changes |
| **Form Validation** | Chain of Responsibility | Multiple validators |
| **Theme System** | Strategy | Different themes, same interface |
| **Modal Dialogs** | Facade | Simplify complex dialog operations |

### Full-Stack Applications

| Use Case | Pattern | Why |
|----------|---------|-----|
| **Authentication Flow** | Template Method | Fixed steps, different providers |
| **Payment Processing** | Strategy | Multiple payment methods |
| **Order Processing** | State | Order status transitions |
| **Caching** | Proxy | Cache expensive operations |
| **Logging** | Decorator | Add logging to methods |

## 💻 Detailed Examples

### Example 1: E-commerce Payment System

**Problem:** Support multiple payment methods (Credit Card, PayPal, Stripe)

**Solution:** Strategy Pattern

```javascript
// Strategy interface
class PaymentStrategy {
  process(amount) {
    throw new Error('Must implement process()');
  }
}

// Concrete strategies
class CreditCardStrategy extends PaymentStrategy {
  process(amount) {
    // Credit card processing logic
    return { success: true, method: 'creditcard' };
  }
}

class PayPalStrategy extends PaymentStrategy {
  process(amount) {
    // PayPal processing logic
    return { success: true, method: 'paypal' };
  }
}

// Context
class PaymentProcessor {
  constructor(strategy) {
    this.strategy = strategy;
  }
  
  processPayment(amount) {
    return this.strategy.process(amount);
  }
}

// Usage
const processor = new PaymentProcessor(new CreditCardStrategy());
processor.processPayment(100);
```

### Example 2: API Gateway with Middleware

**Problem:** Process requests through multiple middleware (auth, validation, rate limiting)

**Solution:** Chain of Responsibility Pattern

```javascript
class Middleware {
  constructor() {
    this.next = null;
  }
  
  setNext(middleware) {
    this.next = middleware;
    return middleware;
  }
  
  handle(request, response) {
    if (this.next) {
      return this.next.handle(request, response);
    }
    return { request, response };
  }
}

class AuthMiddleware extends Middleware {
  handle(request, response) {
    if (!request.token) {
      response.status = 401;
      return { request, response };
    }
    return super.handle(request, response);
  }
}

class ValidationMiddleware extends Middleware {
  handle(request, response) {
    if (!request.body) {
      response.status = 400;
      return { request, response };
    }
    return super.handle(request, response);
  }
}

// Build chain
const auth = new AuthMiddleware();
const validation = new ValidationMiddleware();
auth.setNext(validation);

// Process request
auth.handle(request, response);
```

### Example 3: Notification System

**Problem:** Send notifications through multiple channels (Email, SMS, Push)

**Solution:** Observer Pattern

```javascript
class NotificationService {
  constructor() {
    this.subscribers = [];
  }
  
  subscribe(observer) {
    this.subscribers.push(observer);
  }
  
  notify(message) {
    this.subscribers.forEach(observer => observer.update(message));
  }
}

class EmailNotifier {
  update(message) {
    console.log(`Email: ${message}`);
  }
}

class SMSNotifier {
  update(message) {
    console.log(`SMS: ${message}`);
  }
}

// Usage
const service = new NotificationService();
service.subscribe(new EmailNotifier());
service.subscribe(new SMSNotifier());
service.notify('Order confirmed!');
```

### Example 4: Database Query Builder

**Problem:** Build complex SQL queries dynamically

**Solution:** Builder Pattern

```javascript
class QueryBuilder {
  constructor() {
    this.query = new SQLQuery();
  }
  
  select(columns) {
    this.query.select = columns;
    return this;
  }
  
  from(table) {
    this.query.from = table;
    return this;
  }
  
  where(condition) {
    this.query.where.push(condition);
    return this;
  }
  
  build() {
    return this.query.toString();
  }
}

// Usage
const query = new QueryBuilder()
  .select(['id', 'name'])
  .from('users')
  .where('age > 18')
  .build();
```

### Example 5: Order Status Management

**Problem:** Handle order status transitions (Pending → Processing → Shipped → Delivered)

**Solution:** State Pattern

```javascript
class OrderState {
  process(order) {
    throw new Error('Must implement process()');
  }
}

class PendingState extends OrderState {
  process(order) {
    order.setState(new ProcessingState());
  }
}

class ProcessingState extends OrderState {
  ship(order) {
    order.setState(new ShippedState());
  }
}

// Usage
const order = new Order();
order.process(); // Changes to Processing
order.ship(); // Changes to Shipped
```

## 🏗️ Architecture Examples

### Microservices Architecture

- **API Gateway** → Facade Pattern
- **Service Discovery** → Factory Pattern
- **Circuit Breaker** → Proxy Pattern
- **Event Bus** → Observer Pattern

### MVC Architecture

- **Model** → Observer Pattern (notify views)
- **View** → Composite Pattern (UI components)
- **Controller** → Command Pattern (user actions)

### RESTful APIs

- **Request Processing** → Chain of Responsibility
- **Response Formatting** → Strategy Pattern
- **Error Handling** → Chain of Responsibility

## 📚 Framework Examples

### Express.js / NestJS

- **Middleware** → Chain of Responsibility
- **Dependency Injection** → Factory Pattern
- **Guards** → Chain of Responsibility
- **Interceptors** → Decorator Pattern

### React

- **Component Tree** → Composite Pattern
- **State Management** → Observer Pattern
- **Hooks** → Strategy Pattern

### Angular

- **Dependency Injection** → Factory Pattern
- **Directives** → Decorator Pattern
- **Services** → Singleton Pattern

## 🎯 When to Apply Patterns

### Start Simple
1. Write code without patterns first
2. Identify problems (code smells)
3. Apply pattern to solve specific problem
4. Refactor incrementally

### Common Scenarios

**Use Strategy when:**
- You have multiple ways to do the same thing
- You want to swap algorithms at runtime

**Use Observer when:**
- You need to notify multiple objects
- You want loose coupling

**Use Factory when:**
- Object creation is complex
- You need flexibility in creation

**Use Singleton when:**
- You need exactly one instance
- Shared resource (database, logger)

## 🚀 Next Steps

- ✅ Review [Best Practices](../08-best-practices/README.md) - Learn when NOT to use patterns
- ✅ Practice with your own projects
- ✅ Identify patterns in existing codebases

---

**Remember:** Patterns solve real problems. Don't force them - let problems guide you to the right pattern! 🎯

