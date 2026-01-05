# Adapter Pattern

## 🎯 What Problem Does It Solve?

**Problem:** You have two incompatible interfaces that need to work together, and you can't modify the source code.

### Real-World Examples:
- Integrating old payment system with new API
- Connecting different third-party libraries
- Adapting legacy code to new interfaces
- Making incompatible classes work together
- Converting data formats (XML to JSON, etc.)

## 😵 Why Current Code Is Bad

### Without Adapter (Problematic):

```javascript
// ❌ Bad: Incompatible interfaces
// Old payment system (can't modify this)
class OldPaymentSystem {
  processPayment(amount, currency) {
    return `Paid ${amount} ${currency} via old system`;
  }
}

// New payment API (expects different interface)
class NewPaymentAPI {
  pay(amountInCents, currencyCode) {
    return {
      success: true,
      amount: amountInCents / 100,
      currency: currencyCode
    };
  }
}

// Problem: They have different interfaces!
// Old: processPayment(amount, currency)
// New: pay(amountInCents, currencyCode)

// Can't use them together easily!
function processOrder(amount, currency) {
  // Which one to use? They're incompatible!
  // const old = new OldPaymentSystem();
  // const new = new NewPaymentAPI();
  // Different method names and parameters!
}
```

**Problems:**
- Incompatible interfaces
- Can't modify source code
- Code duplication
- Tight coupling
- Hard to switch between systems

## ✅ Adapter Pattern Solution

**Convert the interface of a class into another interface clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces.**

### Structure:

```
┌──────────┐         ┌──────────────┐
│  Client  │────────▶│   Adapter    │
└──────────┘         ├──────────────┤
                     │ + request()  │
                     └──────┬───────┘
                            │
                            │ uses
                            │
                     ┌──────▼────────┐
                     │ Adaptee       │
                     ├───────────────┤
                     │ + specific()  │
                     └───────────────┘
```

### Implementation:

```javascript
// ✅ Good: Adapter Pattern

// Step 1: Target interface (what client expects)
class PaymentProcessor {
  process(amount, currency) {
    throw new Error('Must implement process()');
  }
}

// Step 2: Adaptee (incompatible class - can't modify)
class OldPaymentSystem {
  processPayment(amount, currency) {
    console.log(`Processing ${amount} ${currency} via old system`);
    return {
      status: 'success',
      message: `Paid ${amount} ${currency}`
    };
  }
}

// Step 3: Adapter (bridges the gap)
class PaymentAdapter extends PaymentProcessor {
  constructor(oldSystem) {
    super();
    this.oldSystem = oldSystem;
  }
  
  process(amount, currency) {
    // Adapt old interface to new interface
    const result = this.oldSystem.processPayment(amount, currency);
    
    // Transform to expected format
    return {
      success: result.status === 'success',
      amount: amount,
      currency: currency,
      message: result.message
    };
  }
}

// Usage - Now they work together!
const oldSystem = new OldPaymentSystem();
const adapter = new PaymentAdapter(oldSystem);

// Client uses standard interface
function processOrder(paymentProcessor, amount, currency) {
  return paymentProcessor.process(amount, currency);
}

const result = processOrder(adapter, 100, 'USD');
console.log(result);
// { success: true, amount: 100, currency: 'USD', message: '...' }
```

## 🧠 Real-World Analogy

**Think of a travel adapter:**
- Your device has a **US plug** (client)
- The wall socket is **European** (adaptee)
- The **travel adapter** (adapter) makes them work together
- You don't modify your device or the wall - you use an adapter!

## 💻 Complete Example: API Adapter

```javascript
// Old API (can't modify)
class LegacyUserAPI {
  getUserData(userId) {
    return {
      id: userId,
      full_name: 'John Doe',
      email_addr: 'john@example.com',
      created_at: '2023-01-01'
    };
  }
  
  updateUserData(userId, data) {
    return {
      success: true,
      message: 'User updated'
    };
  }
}

// New API (can't modify)
class ModernUserAPI {
  getUser(id) {
    return {
      userId: id,
      name: 'Jane Doe',
      email: 'jane@example.com',
      createdAt: '2023-01-01T00:00:00Z'
    };
  }
  
  updateUser(id, userData) {
    return {
      ok: true,
      message: 'User updated successfully'
    };
  }
}

// Target interface (what our app expects)
class UserService {
  getUser(userId) {
    throw new Error('Must implement getUser()');
  }
  
  updateUser(userId, userData) {
    throw new Error('Must implement updateUser()');
  }
}

// Adapter for Legacy API
class LegacyUserAdapter extends UserService {
  constructor(legacyAPI) {
    super();
    this.api = legacyAPI;
  }
  
  getUser(userId) {
    const data = this.api.getUserData(userId);
    
    // Transform to expected format
    return {
      userId: data.id,
      name: data.full_name,
      email: data.email_addr,
      createdAt: new Date(data.created_at).toISOString()
    };
  }
  
  updateUser(userId, userData) {
    // Transform to legacy format
    const legacyData = {
      full_name: userData.name,
      email_addr: userData.email
    };
    
    const result = this.api.updateUserData(userId, legacyData);
    
    // Transform response
    return {
      ok: result.success,
      message: result.message
    };
  }
}

// Adapter for Modern API
class ModernUserAdapter extends UserService {
  constructor(modernAPI) {
    super();
    this.api = modernAPI;
  }
  
  getUser(userId) {
    // Modern API already matches, but we can still adapt if needed
    return this.api.getUser(userId);
  }
  
  updateUser(userId, userData) {
    const result = this.api.updateUser(userId, userData);
    
    // Transform response
    return {
      ok: result.ok,
      message: result.message
    };
  }
}

// Usage - Same interface for both!
function getUserInfo(userService, userId) {
  return userService.getUser(userId);
}

// Can use either adapter
const legacyAdapter = new LegacyUserAdapter(new LegacyUserAPI());
const modernAdapter = new ModernUserAdapter(new ModernUserAPI());

const user1 = getUserInfo(legacyAdapter, 123);
const user2 = getUserInfo(modernAdapter, 456);

// Both return same format!
console.log(user1); // { userId: 123, name: 'John Doe', ... }
console.log(user2); // { userId: 456, name: 'Jane Doe', ... }
```

## 🎯 When to Use Adapter Pattern

### ✅ Good Use Cases:
1. **Integrating Third-Party Libraries** - Different interfaces
2. **Legacy Code Integration** - Old code with new code
3. **API Versioning** - Different API versions
4. **Data Format Conversion** - XML to JSON, etc.
5. **Reusing Existing Classes** - Can't modify but need to use

### ❌ When NOT to Use

1. **Can Modify Source Code** - Just change the interface instead
2. **Simple Interface Mismatch** - Might be overkill
3. **Performance Critical** - Adapter adds overhead

## 🔄 Adapter vs Other Patterns

| Pattern | Purpose | Use When |
|---------|---------|----------|
| **Adapter** | Make incompatible interfaces work | Can't modify source code |
| **Decorator** | Add functionality | Need to extend behavior |
| **Facade** | Simplify interface | Complex subsystem |

## 📊 Pros and Cons

### ✅ Pros:
- Makes incompatible interfaces work together
- Reuses existing code
- Single Responsibility (adaptation logic separate)
- Open/Closed Principle (can add new adapters)

### ❌ Cons:
- Adds complexity
- Performance overhead
- Can be overused

## 🚀 Next Steps

Now that you understand Adapter:
- ✅ Learn [Decorator Pattern](./02-decorator.md) - Add features dynamically
- ✅ Or review [Structural Patterns Overview](./README.md)

---

**Remember:** Use Adapter when you need to make incompatible interfaces work together! 🎯

