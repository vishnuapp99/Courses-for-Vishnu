# Singleton Pattern

## 🎯 What Problem Does It Solve?

**Problem:** You need **exactly one instance** of a class throughout your application.

### Real-World Examples:
- Database connection (one connection pool)
- Logger (one logging instance)
- Configuration manager (one config object)
- Cache manager (one cache instance)

## 😵 Why Current Code Is Bad

### Without Singleton (Problematic):

```javascript
// ❌ Bad: Multiple instances created
class DatabaseConnection {
  constructor() {
    this.connection = this.connect();
  }
  
  connect() {
    console.log('Connecting to database...');
    return 'Connected';
  }
}

// Problem: Each time you create a new instance, you get a new connection!
const db1 = new DatabaseConnection(); // New connection
const db2 = new DatabaseConnection(); // Another new connection!
const db3 = new DatabaseConnection(); // Yet another connection!

// Result: 3 database connections! Wasteful and can cause issues.
```

**Problems:**
- Multiple instances waste resources
- Inconsistent state across instances
- Can cause connection pool exhaustion
- Expensive operations repeated unnecessarily

## ✅ Singleton Pattern Solution

**Ensure a class has only one instance and provide global access to it.**

### Structure:

```
┌─────────────────────┐
│   Singleton Class   │
├─────────────────────┤
│ - instance (static) │
│ + getInstance()     │
│ - constructor()     │
└─────────────────────┘
```

### Implementation:

```javascript
// ✅ Good: Singleton Pattern
class DatabaseConnection {
  // Private static instance
  static instance = null;
  
  constructor() {
    // Prevent direct instantiation
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }
    
    this.connection = this.connect();
    DatabaseConnection.instance = this;
  }
  
  connect() {
    console.log('Connecting to database...');
    return 'Connected';
  }
  
  // Static method to get instance
  static getInstance() {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }
}

// Usage
const db1 = DatabaseConnection.getInstance(); // Creates connection
const db2 = DatabaseConnection.getInstance(); // Returns same instance
const db3 = DatabaseConnection.getInstance(); // Returns same instance

console.log(db1 === db2); // true (same instance!)
console.log(db2 === db3); // true (same instance!)

// Result: Only ONE database connection!
```

### Modern JavaScript/TypeScript Implementation:

```javascript
// ✅ Better: Using module pattern (Node.js/ES6)
class DatabaseConnection {
  constructor() {
    this.connection = this.connect();
  }
  
  connect() {
    console.log('Connecting to database...');
    return 'Connected';
  }
}

// Export single instance
const dbInstance = new DatabaseConnection();
export default dbInstance;

// Usage in other files
import db from './database.js';
// Always the same instance!
```

### Thread-Safe Singleton (for multi-threaded environments):

```javascript
// ✅ Thread-safe version (if needed)
class Logger {
  static instance = null;
  static lock = false;
  
  constructor() {
    if (Logger.instance) {
      return Logger.instance;
    }
    
    this.logs = [];
    Logger.instance = this;
  }
  
  static getInstance() {
    if (!Logger.instance) {
      if (!Logger.lock) {
        Logger.lock = true;
        Logger.instance = new Logger();
        Logger.lock = false;
      }
    }
    return Logger.instance;
  }
  
  log(message) {
    this.logs.push(message);
    console.log(message);
  }
}
```

## 🧠 Real-World Analogy

**Think of a company's CEO:**
- There's only **one CEO** at a time
- Everyone accesses the **same CEO**
- You can't create multiple CEOs
- The CEO position is **globally accessible**

## 💻 Complete Example

```javascript
// Configuration Manager (Perfect Singleton Use Case)
class ConfigManager {
  static instance = null;
  
  constructor() {
    if (ConfigManager.instance) {
      return ConfigManager.instance;
    }
    
    this.settings = {
      apiUrl: 'https://api.example.com',
      timeout: 5000,
      retries: 3
    };
    
    ConfigManager.instance = this;
  }
  
  static getInstance() {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }
  
  get(key) {
    return this.settings[key];
  }
  
  set(key, value) {
    this.settings[key] = value;
  }
}

// Usage
const config1 = ConfigManager.getInstance();
config1.set('apiUrl', 'https://new-api.com');

const config2 = ConfigManager.getInstance();
console.log(config2.get('apiUrl')); // 'https://new-api.com'
// Same instance, so changes are shared!

console.log(config1 === config2); // true
```

## 🎯 When to Use Singleton

### ✅ Good Use Cases:
1. **Database Connections** - One connection pool
2. **Logging** - One logger instance
3. **Configuration** - One config object
4. **Cache** - One cache manager
5. **File System** - One file manager
6. **Hardware Interfaces** - One printer, one scanner

### ❌ When NOT to Use

1. **Don't use for regular objects** - Most classes don't need to be singletons
2. **Don't use for testability** - Makes unit testing harder
3. **Don't use for global state** - Consider state management libraries instead
4. **Don't use when you need multiple instances** - Obvious, but important!

## ⚠️ Common Pitfalls

1. **Testing Issues**
   ```javascript
   // Problem: Singleton persists between tests
   // Solution: Reset instance in test setup
   beforeEach(() => {
     DatabaseConnection.instance = null;
   });
   ```

2. **Thread Safety** (in multi-threaded languages)
   - Use locks or atomic operations
   - JavaScript is single-threaded, so less concern

3. **Hidden Dependencies**
   - Singletons create hidden global state
   - Makes code harder to understand

## 📊 Pros and Cons

### ✅ Pros:
- Ensures single instance
- Global access point
- Lazy initialization possible
- Saves memory

### ❌ Cons:
- Hard to test
- Hidden dependencies
- Global state (can be problematic)
- Violates Single Responsibility Principle (manages own lifecycle)

## 🚀 Next Steps

Now that you understand Singleton:
- ✅ Learn [Factory Method Pattern](./02-factory-method.md) - More flexible object creation
- ✅ Or review [Pattern Categories](../03-pattern-categories/README.md)

---

**Remember:** Use Singleton sparingly - only when you truly need one instance! 🎯

