# Best Practices & Anti-Patterns

Learn when to use patterns, when NOT to use them, and how to avoid common mistakes.

## 🎯 Golden Rules

### Rule 1: Learn the Problem First
> **Never learn patterns in isolation. Always understand the problem first.**

❌ **Wrong:**
```javascript
// "I learned Singleton, let me use it everywhere!"
class User {
  static instance = null;
  // ...
}
```

✅ **Right:**
```javascript
// "I need one database connection. Singleton solves this."
class DatabaseConnection {
  static instance = null;
  // ...
}
```

### Rule 2: Start Simple
> **Start without patterns. Add patterns when complexity grows.**

❌ **Wrong:**
```javascript
// Over-engineering from the start
class SimpleCalculator {
  constructor() {
    this.strategy = new AdditionStrategy();
  }
  // ...
}
```

✅ **Right:**
```javascript
// Start simple
function add(a, b) {
  return a + b;
}

// Add pattern only when needed
class Calculator {
  constructor(strategy) {
    this.strategy = strategy;
  }
}
```

### Rule 3: Patterns Solve Problems
> **Use patterns to solve problems, not to show off.**

❌ **Wrong:**
```javascript
// Using pattern just because
class HelloWorld {
  constructor() {
    this.factory = new MessageFactory();
    this.observer = new MessageObserver();
    // ... unnecessary complexity
  }
}
```

✅ **Right:**
```javascript
// Simple solution
console.log('Hello World');
```

## 🚫 When NOT to Use Patterns

### 1. Simple Problems Don't Need Patterns

**Example: Simple Calculator**

❌ **Over-engineered:**
```javascript
// Using Strategy for simple operations
class AdditionStrategy { /* ... */ }
class SubtractionStrategy { /* ... */ }
class Calculator {
  constructor(strategy) { /* ... */ }
}
```

✅ **Simple solution:**
```javascript
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
```

### 2. Don't Force Patterns

**Example: Single User Type**

❌ **Forcing Factory:**
```javascript
// Only one user type, but using Factory
class UserFactory {
  createUser() {
    return new User(); // Only one type!
  }
}
```

✅ **Direct instantiation:**
```javascript
const user = new User();
```

### 3. Don't Use Patterns Prematurely

**Example: Future Requirements**

❌ **Premature optimization:**
```javascript
// "We might need multiple payment methods in the future"
class PaymentProcessor {
  constructor(strategy) {
    this.strategy = strategy;
  }
}
// But we only have one payment method now!
```

✅ **YAGNI (You Aren't Gonna Need It):**
```javascript
// Use pattern when you actually need it
class PaymentProcessor {
  process(amount) {
    // Simple implementation
  }
}
```

## ⚠️ Common Anti-Patterns

### Anti-Pattern 1: Pattern Obsession

**Problem:** Trying to use every pattern everywhere

**Solution:** Use patterns only when they solve real problems

```javascript
// ❌ Bad: Pattern everywhere
class Application {
  constructor() {
    this.singleton = Singleton.getInstance();
    this.factory = new Factory();
    this.strategy = new Strategy();
    this.observer = new Observer();
    // ... too many patterns!
  }
}
```

### Anti-Pattern 2: Over-Abstracting

**Problem:** Creating too many abstraction layers

**Solution:** Keep it simple, add abstraction only when needed

```javascript
// ❌ Bad: Too many layers
class AbstractFactory {
  createFactory() {
    return new ConcreteFactory();
  }
}

class ConcreteFactory {
  create() {
    return new Product();
  }
}

// ✅ Good: Simple factory
class Factory {
  create() {
    return new Product();
  }
}
```

### Anti-Pattern 3: Ignoring Language Features

**Problem:** Using patterns when language has built-in solutions

**Solution:** Use language features first

```javascript
// ❌ Bad: Custom iterator
class CustomIterator { /* ... */ }

// ✅ Good: Built-in iteration
for (const item of array) {
  // ...
}
```

### Anti-Pattern 4: Pattern for Pattern's Sake

**Problem:** Using patterns without understanding why

**Solution:** Understand the problem first

```javascript
// ❌ Bad: "I'll use Observer because it's cool"
class Observer { /* ... */ }

// ✅ Good: "I need to notify multiple components when data changes"
class Observer { /* ... */ }
```

## ✅ Best Practices

### 1. Identify Code Smells First

**Signs you might need a pattern:**

- **Long if-else chains** → Strategy Pattern
- **Tight coupling** → Observer, Mediator
- **Code duplication** → Template Method
- **Complex object creation** → Factory, Builder
- **Hard to test** → Dependency Injection, Strategy

### 2. Refactor Incrementally

**Don't rewrite everything at once:**

1. Identify the problem
2. Choose the pattern
3. Refactor one part at a time
4. Test after each change
5. Iterate

### 3. Keep Patterns Simple

**Start with simple implementations:**

```javascript
// ✅ Good: Simple Factory
class UserFactory {
  static create(type) {
    if (type === 'admin') return new AdminUser();
    if (type === 'user') return new User();
  }
}

// ❌ Bad: Over-complicated
class AbstractUserFactory {
  createFactory() {
    return new ConcreteUserFactory();
  }
}
```

### 4. Document Why, Not What

**Good documentation explains the problem:**

```javascript
/**
 * Uses Strategy Pattern to handle different payment methods.
 * 
 * Problem: We need to support multiple payment processors
 * (Credit Card, PayPal, Stripe) without if-else chains.
 * 
 * Solution: Each payment method is a strategy that can be
 * swapped at runtime.
 */
class PaymentProcessor {
  // ...
}
```

### 5. Test Patterns Properly

**Test the behavior, not the pattern:**

```javascript
// ✅ Good: Test behavior
test('processes credit card payment', () => {
  const processor = new PaymentProcessor(new CreditCardStrategy());
  expect(processor.process(100)).toBeTruthy();
});

// ❌ Bad: Test pattern implementation
test('uses Strategy pattern', () => {
  expect(processor.strategy).toBeInstanceOf(Strategy);
});
```

## 🎯 Pattern Selection Guide

### Decision Tree

```
Do you need to create objects?
├─ Yes → Is creation complex?
│   ├─ Yes → Use Factory or Builder
│   └─ No → Direct instantiation
│
Do you need to organize code?
├─ Yes → Incompatible interfaces?
│   ├─ Yes → Adapter
│   └─ No → Need to simplify?
│       ├─ Yes → Facade
│       └─ No → Need to add features?
│           └─ Yes → Decorator
│
Do objects need to communicate?
├─ Yes → Multiple algorithms?
│   ├─ Yes → Strategy
│   └─ No → State changes?
│       ├─ Yes → State
│       └─ No → Notifications?
│           ├─ Yes → Observer
│           └─ No → Complex interactions?
│               └─ Yes → Mediator
```

## 📊 Pattern Complexity vs Benefit

| Pattern | Complexity | Common Use | When to Use |
|---------|-----------|------------|-------------|
| **Singleton** | Low | High | One instance needed |
| **Factory** | Low | High | Complex object creation |
| **Strategy** | Medium | Very High | Multiple algorithms |
| **Observer** | Medium | Very High | Event notifications |
| **Adapter** | Low | Medium | Incompatible interfaces |
| **Decorator** | Medium | Medium | Add features dynamically |
| **Facade** | Low | Medium | Simplify complex system |
| **Builder** | Medium | Medium | Complex object construction |
| **State** | Medium | Medium | Behavior changes with state |
| **Chain of Responsibility** | Medium | Medium | Middleware pipelines |

## 🚨 Red Flags

**Stop and reconsider if:**

1. **Pattern makes code harder to understand**
2. **You're forcing a pattern where it doesn't fit**
3. **Pattern adds more complexity than it solves**
4. **You can't explain why you're using the pattern**
5. **Team members don't understand the pattern**

## 💡 Quick Checklist

Before using a pattern, ask:

- [ ] Do I have a real problem this pattern solves?
- [ ] Is the pattern simpler than the problem?
- [ ] Will my team understand this?
- [ ] Can I test this easily?
- [ ] Does this improve maintainability?
- [ ] Am I using it because I need it, or because it's "cool"?

## 🎓 Learning Path

1. **Understand the problem** → Don't jump to patterns
2. **Learn patterns gradually** → One at a time
3. **Practice with real projects** → Apply to actual problems
4. **Review existing code** → Identify patterns in use
5. **Refactor incrementally** → Don't rewrite everything

## 🚀 Next Steps

- ✅ Review patterns you've learned
- ✅ Identify patterns in your current projects
- ✅ Practice refactoring with patterns
- ✅ Share knowledge with your team

---

**Remember:** 
> **"The best pattern is the one that solves your problem simply and clearly."**

Don't be a pattern collector - be a problem solver! 🎯

