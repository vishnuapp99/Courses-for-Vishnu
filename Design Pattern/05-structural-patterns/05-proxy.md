# Proxy Pattern

## 🎯 What Problem Does It Solve?

**Problem:** You want to **control access to an object** without changing its interface, or add functionality like lazy loading, caching, or access control.

### Real-World Examples:
- Lazy loading images (load when needed)
- Access control (check permissions before access)
- Caching (cache expensive operations)
- Virtual proxy (create expensive objects on demand)
- Protection proxy (control who can access)
- Logging proxy (log all access)

## 😵 Why Current Code Is Bad

### Without Proxy (Problematic):

```javascript
// ❌ Bad: Direct access, no control
class ExpensiveService {
  constructor() {
    this.data = this.loadExpensiveData(); // Loaded immediately!
  }
  
  loadExpensiveData() {
    console.log('Loading expensive data... (takes 5 seconds)');
    // Simulate expensive operation
    return { data: 'Large dataset' };
  }
  
  getData() {
    return this.data;
  }
}

// Problem: Data loaded even if never used!
const service = new ExpensiveService(); // Expensive operation happens here!
// But what if we never call getData()? Waste of resources!
```

**Problems:**
- No control over access
- Expensive operations happen immediately
- No caching
- No access control
- Can't add cross-cutting concerns

### Alternative (Also Bad):

```javascript
// ❌ Bad: Mixing concerns
class Service {
  constructor() {
    this.data = null;
    this.cache = null;
  }
  
  getData() {
    // Problem: Service knows about caching, logging, etc.
    console.log('[LOG] Accessing data');
    
    if (this.cache) {
      return this.cache;
    }
    
    // Check permissions
    if (!this.hasPermission()) {
      throw new Error('Access denied');
    }
    
    this.data = this.loadData();
    this.cache = this.data;
    return this.data;
  }
  
  hasPermission() { /* ... */ }
  loadData() { /* ... */ }
}

// Violates Single Responsibility Principle!
```

## ✅ Proxy Pattern Solution

**Provide a surrogate or placeholder for another object to control access to it.**

### Structure:

```
┌──────────┐
│  Subject │
├──────────┤
│ + request()│
└────┬─────┘
     │
     │ implements
     │
┌────┴─────┐      ┌──────────┐
│  Real    │      │  Proxy   │
│ Subject  │◄─────│          │
└──────────┘      ├──────────┤
                  │ - real   │
                  │ + request()│
                  └───────────┘
```

### Implementation:

```javascript
// ✅ Good: Proxy Pattern

// Step 1: Subject interface
class Image {
  display() {
    throw new Error('Must implement display()');
  }
}

// Step 2: Real subject
class RealImage extends Image {
  constructor(filename) {
    super();
    this.filename = filename;
    this.loadFromDisk(); // Expensive operation
  }
  
  loadFromDisk() {
    console.log(`Loading ${this.filename} from disk... (expensive!)`);
    // Simulate expensive operation
  }
  
  display() {
    console.log(`Displaying ${this.filename}`);
  }
}

// Step 3: Proxy (lazy loading)
class ImageProxy extends Image {
  constructor(filename) {
    super();
    this.filename = filename;
    this.realImage = null; // Not loaded yet!
  }
  
  display() {
    // Lazy loading: create real object only when needed
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename);
    }
    this.realImage.display();
  }
}

// Usage
console.log('Creating proxy (no expensive operation yet)...');
const image = new ImageProxy('photo.jpg'); // No loading!

console.log('Displaying image (now it loads)...');
image.display(); // Now it loads!
image.display(); // Uses already loaded image
```

## 🧠 Real-World Analogy

**Think of a bank teller:**
- You want to access your **safe deposit box** (real object)
- The **teller** (proxy) controls access:
  - Checks your **ID** (authentication)
  - Verifies **permissions** (authorization)
  - **Logs** the access
  - Then gives you the key to the box
- You don't interact with the box directly - you go through the teller

## 💻 Complete Examples

### Example 1: Virtual Proxy (Lazy Loading)

```javascript
class DatabaseConnection {
  connect() {
    console.log('Connecting to database... (expensive!)');
    return { connected: true };
  }
  
  query(sql) {
    console.log(`Executing: ${sql}`);
    return { results: [] };
  }
}

class DatabaseProxy {
  constructor() {
    this.connection = null;
  }
  
  query(sql) {
    // Lazy initialization
    if (!this.connection) {
      console.log('Creating connection on first use...');
      this.connection = new DatabaseConnection();
      this.connection.connect();
    }
    return this.connection.query(sql);
  }
}

// Usage
const db = new DatabaseProxy();
// No connection created yet!

// Connection created only when first query is made
db.query('SELECT * FROM users');
```

### Example 2: Protection Proxy (Access Control)

```javascript
class SensitiveData {
  getData() {
    return { secret: 'Top secret information' };
  }
}

class ProtectionProxy {
  constructor(user) {
    this.user = user;
    this.realData = new SensitiveData();
  }
  
  getData() {
    // Access control
    if (this.user.role !== 'admin') {
      throw new Error('Access denied: Admin role required');
    }
    
    console.log(`[AUDIT] ${this.user.name} accessed sensitive data`);
    return this.realData.getData();
  }
}

// Usage
const admin = { name: 'John', role: 'admin' };
const user = { name: 'Jane', role: 'user' };

const adminProxy = new ProtectionProxy(admin);
console.log(adminProxy.getData()); // Works

const userProxy = new ProtectionProxy(user);
try {
  userProxy.getData(); // Throws error
} catch (error) {
  console.log(error.message); // "Access denied"
}
```

### Example 3: Caching Proxy

```javascript
class ExpensiveService {
  compute(value) {
    console.log(`Computing expensive operation for ${value}...`);
    // Simulate expensive computation
    return value * value;
  }
}

class CachingProxy {
  constructor() {
    this.service = new ExpensiveService();
    this.cache = new Map();
  }
  
  compute(value) {
    // Check cache first
    if (this.cache.has(value)) {
      console.log(`[CACHE HIT] Returning cached result for ${value}`);
      return this.cache.get(value);
    }
    
    // Compute and cache
    console.log(`[CACHE MISS] Computing for ${value}`);
    const result = this.service.compute(value);
    this.cache.set(value, result);
    return result;
  }
}

// Usage
const proxy = new CachingProxy();

console.log(proxy.compute(5)); // Computes
console.log(proxy.compute(5)); // Uses cache!
console.log(proxy.compute(10)); // Computes
console.log(proxy.compute(10)); // Uses cache!
```

### Example 4: Logging Proxy

```javascript
class BankAccount {
  constructor(balance) {
    this.balance = balance;
  }
  
  deposit(amount) {
    this.balance += amount;
    return this.balance;
  }
  
  withdraw(amount) {
    if (amount > this.balance) {
      throw new Error('Insufficient funds');
    }
    this.balance -= amount;
    return this.balance;
  }
  
  getBalance() {
    return this.balance;
  }
}

class LoggingProxy {
  constructor(account) {
    this.account = account;
  }
  
  deposit(amount) {
    console.log(`[LOG] Deposit: $${amount}`);
    const result = this.account.deposit(amount);
    console.log(`[LOG] New balance: $${result}`);
    return result;
  }
  
  withdraw(amount) {
    console.log(`[LOG] Withdrawal attempt: $${amount}`);
    try {
      const result = this.account.withdraw(amount);
      console.log(`[LOG] Withdrawal successful. New balance: $${result}`);
      return result;
    } catch (error) {
      console.log(`[LOG] Withdrawal failed: ${error.message}`);
      throw error;
    }
  }
  
  getBalance() {
    console.log(`[LOG] Balance check`);
    return this.account.getBalance();
  }
}

// Usage
const account = new BankAccount(1000);
const loggedAccount = new LoggingProxy(account);

loggedAccount.deposit(500);
loggedAccount.withdraw(200);
loggedAccount.getBalance();
```

## 🎯 When to Use Proxy Pattern

### ✅ Good Use Cases:
1. **Lazy Loading** - Create expensive objects on demand
2. **Access Control** - Check permissions before access
3. **Caching** - Cache expensive operations
4. **Logging/Monitoring** - Log all access
5. **Remote Objects** - Represent remote objects locally
6. **Validation** - Validate input before forwarding

### ❌ When NOT to Use

1. **Simple Access** - If no special handling needed
2. **Performance Critical** - Proxy adds overhead
3. **Can Modify Source** - Might be simpler to modify directly

## 🔄 Proxy vs Other Patterns

| Pattern | Purpose | Use When |
|---------|---------|----------|
| **Proxy** | Control access | Need access control, lazy loading, caching |
| **Decorator** | Add functionality | Need to extend behavior |
| **Adapter** | Make incompatible work | Different interfaces |

## 📊 Pros and Cons

### ✅ Pros:
- Control access without changing interface
- Lazy loading
- Caching
- Access control
- Logging/monitoring
- Separation of concerns

### ❌ Cons:
- Adds complexity
- Performance overhead
- Can be overused

## 🚀 Next Steps

Congratulations! You've completed Structural Patterns! 🎉

- ✅ Review [Structural Patterns Overview](./README.md)
- ✅ Move to [Behavioral Patterns](../06-behavioral-patterns/README.md) - Start with Strategy

---

**Remember:** Use Proxy when you need to control access or add cross-cutting concerns! 🎯

