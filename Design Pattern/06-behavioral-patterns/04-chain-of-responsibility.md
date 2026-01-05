# Chain of Responsibility Pattern

## 🎯 What Problem Does It Solve?

**Problem:** You have multiple handlers that can process a request, and you want to **pass the request along a chain** until one handles it.

### Real-World Examples:
- Middleware pipelines (Express.js, NestJS)
- Customer support (Level 1 → Level 2 → Manager)
- Validation chains (email validation → password validation → age validation)
- Logging levels (Debug → Info → Warning → Error)
- Authentication/Authorization (auth → rate limit → validation)

## 😵 Why Current Code Is Bad

### Without Chain (Problematic):

```javascript
// ❌ Bad: If-else chain
function processRequest(request) {
  if (canHandleLevel1(request)) {
    return handleLevel1(request);
  } else if (canHandleLevel2(request)) {
    return handleLevel2(request);
  } else if (canHandleLevel3(request)) {
    return handleLevel3(request);
  } else {
    return handleDefault(request);
  }
}

// Problems:
// - Hard to add/remove handlers
// - Violates Open/Closed Principle
// - Tight coupling
// - Hard to test individual handlers
```

**Problems:**
- Hard to add/remove handlers
- Violates Open/Closed Principle
- Tight coupling
- Hard to test
- Order matters but not flexible

## ✅ Chain of Responsibility Pattern Solution

**Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request. Chain the receiving objects and pass the request along the chain until an object handles it.**

### Structure:

```
┌──────────┐
│  Client  │
└────┬─────┘
     │
     │ sends request
     │
┌────▼──────────┐
│   Handler    │
├──────────────┤
│ - next       │
│ + handle()   │
│ + setNext()  │
└────┬─────────┘
     │
  ┌──┴──────────────────┐
  │                     │
┌─▼────┐          ┌─────▼────┐
│Handler1│────────▶│Handler2  │
└──────┘          └──────────┘
```

### Implementation:

```javascript
// ✅ Good: Chain of Responsibility Pattern

// Step 1: Handler interface
class Handler {
  constructor() {
    this.next = null;
  }
  
  setNext(handler) {
    this.next = handler;
    return handler; // For chaining
  }
  
  handle(request) {
    if (this.next) {
      return this.next.handle(request);
    }
    return null; // End of chain
  }
}

// Step 2: Concrete handlers
class Level1Support extends Handler {
  handle(request) {
    if (request.type === 'basic' || request.priority === 'low') {
      console.log('Level 1 Support: Handling request');
      return { handled: true, level: 1, message: 'Resolved by Level 1' };
    }
    
    // Pass to next handler
    return super.handle(request);
  }
}

class Level2Support extends Handler {
  handle(request) {
    if (request.type === 'technical' || request.priority === 'medium') {
      console.log('Level 2 Support: Handling request');
      return { handled: true, level: 2, message: 'Resolved by Level 2' };
    }
    
    return super.handle(request);
  }
}

class Level3Support extends Handler {
  handle(request) {
    if (request.type === 'critical' || request.priority === 'high') {
      console.log('Level 3 Support (Manager): Handling request');
      return { handled: true, level: 3, message: 'Resolved by Manager' };
    }
    
    return super.handle(request);
  }
}

class DefaultHandler extends Handler {
  handle(request) {
    console.log('Default Handler: Request not handled');
    return { handled: false, message: 'No handler available' };
  }
}

// Usage
const level1 = new Level1Support();
const level2 = new Level2Support();
const level3 = new Level3Support();
const defaultHandler = new DefaultHandler();

// Build chain
level1.setNext(level2).setNext(level3).setNext(defaultHandler);

// Process requests
const request1 = { type: 'basic', priority: 'low' };
const request2 = { type: 'technical', priority: 'medium' };
const request3 = { type: 'critical', priority: 'high' };
const request4 = { type: 'unknown', priority: 'unknown' };

console.log(level1.handle(request1)); // Handled by Level 1
console.log(level1.handle(request2)); // Handled by Level 2
console.log(level1.handle(request3)); // Handled by Level 3
console.log(level1.handle(request4)); // Handled by Default
```

## 🧠 Real-World Analogy

**Think of customer support:**
- **Level 1** handles basic questions
- If they can't handle it, they **pass to Level 2**
- If Level 2 can't handle it, they **pass to Manager (Level 3)**
- Each level **tries to handle** the request
- If they can't, they **pass it along** the chain

## 💻 Complete Example: Middleware Pipeline

```javascript
// Handler interface
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

// Concrete middleware
class AuthenticationMiddleware extends Middleware {
  handle(request, response) {
    console.log('[AUTH] Checking authentication...');
    
    if (!request.token) {
      response.status = 401;
      response.message = 'Unauthorized';
      return { request, response };
    }
    
    request.user = { id: '123', name: 'John' };
    console.log('[AUTH] Authenticated');
    
    return super.handle(request, response);
  }
}

class ValidationMiddleware extends Middleware {
  handle(request, response) {
    console.log('[VALIDATION] Validating request...');
    
    if (!request.body || !request.body.email) {
      response.status = 400;
      response.message = 'Invalid request';
      return { request, response };
    }
    
    console.log('[VALIDATION] Valid');
    return super.handle(request, response);
  }
}

class RateLimitMiddleware extends Middleware {
  constructor() {
    super();
    this.requests = new Map();
  }
  
  handle(request, response) {
    console.log('[RATE LIMIT] Checking rate limit...');
    
    const userId = request.user?.id || 'anonymous';
    const count = this.requests.get(userId) || 0;
    
    if (count >= 10) {
      response.status = 429;
      response.message = 'Too many requests';
      return { request, response };
    }
    
    this.requests.set(userId, count + 1);
    console.log('[RATE LIMIT] Allowed');
    
    return super.handle(request, response);
  }
}

class LoggingMiddleware extends Middleware {
  handle(request, response) {
    console.log('[LOG] Request:', request);
    const result = super.handle(request, response);
    console.log('[LOG] Response:', result.response);
    return result;
  }
}

// Usage
const auth = new AuthenticationMiddleware();
const validation = new ValidationMiddleware();
const rateLimit = new RateLimitMiddleware();
const logging = new LoggingMiddleware();

// Build chain
auth.setNext(validation).setNext(rateLimit).setNext(logging);

// Process request
const request = {
  token: 'abc123',
  body: { email: 'user@example.com' }
};

const response = { status: 200, message: 'OK' };

const result = auth.handle(request, response);
console.log('Final result:', result);
```

### Real-World Example: Validation Chain

```javascript
class Validator extends Middleware {
  validate(value) {
    throw new Error('Must implement validate()');
  }
  
  handle(request, response) {
    if (!this.validate(request.data)) {
      response.errors = response.errors || [];
      response.errors.push(this.getErrorMessage());
      return { request, response };
    }
    
    return super.handle(request, response);
  }
  
  getErrorMessage() {
    return 'Validation failed';
  }
}

class EmailValidator extends Validator {
  validate(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
  
  getErrorMessage() {
    return 'Invalid email format';
  }
}

class PasswordValidator extends Validator {
  validate(value) {
    return value && value.length >= 8;
  }
  
  getErrorMessage() {
    return 'Password must be at least 8 characters';
  }
}

class AgeValidator extends Validator {
  validate(value) {
    return value && value >= 18;
  }
  
  getErrorMessage() {
    return 'Must be 18 or older';
  }
}

// Usage
const emailValidator = new EmailValidator();
const passwordValidator = new PasswordValidator();
const ageValidator = new AgeValidator();

emailValidator.setNext(passwordValidator).setNext(ageValidator);

const request = {
  data: {
    email: 'invalid-email',
    password: '123',
    age: 16
  }
};

const response = {};

const result = emailValidator.handle(request, response);
console.log(result.response.errors);
// ['Invalid email format', 'Password must be at least 8 characters', 'Must be 18 or older']
```

## 🎯 When to Use Chain of Responsibility

### ✅ Good Use Cases:
1. **Middleware Pipelines** - Express.js, NestJS
2. **Validation Chains** - Multiple validators
3. **Support Systems** - Escalation chains
4. **Event Processing** - Multiple processors
5. **Request Filtering** - Authentication, logging, etc.

### ❌ When NOT to Use

1. **Single Handler** - If only one handler, don't use chain
2. **Fixed Order** - If order is always the same, might be simpler
3. **Performance Critical** - Chain traversal adds overhead

## 🔄 Chain vs Other Patterns

| Pattern | Purpose | Use When |
|---------|---------|----------|
| **Chain of Responsibility** | Request handling chain | Multiple handlers, flexible order |
| **Decorator** | Add functionality | Need to extend behavior |
| **Middleware** | Request processing | Pipeline of processors |

## 📊 Pros and Cons

### ✅ Pros:
- Decouples sender and receiver
- Flexible chain composition
- Easy to add/remove handlers
- Single Responsibility
- Open/Closed Principle

### ❌ Cons:
- No guarantee request is handled
- Performance (chain traversal)
- Can be hard to debug
- Order matters

## 🚀 Next Steps

Now that you understand Chain of Responsibility:
- ✅ Learn [State Pattern](./05-state.md) - Behavior changes with state
- ✅ Or review [Behavioral Patterns Overview](./README.md)

---

**Remember:** Use Chain of Responsibility for middleware pipelines and validation chains! 🎯

