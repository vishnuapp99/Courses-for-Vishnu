# Prototype Pattern

## 🎯 What Problem Does It Solve?

**Problem:** Creating objects is expensive (time or resources), and you want to **clone existing instances** instead of creating new ones from scratch.

### Real-World Examples:
- Cloning database records
- Copying configuration objects
- Duplicating game objects (characters, items)
- Creating document templates
- Copying complex objects with nested properties

## 😵 Why Current Code Is Bad

### Without Prototype (Problematic):

```javascript
// ❌ Bad: Creating expensive objects repeatedly
class ExpensiveObject {
  constructor() {
    // Expensive operation
    this.data = this.loadLargeData();
    this.config = this.loadConfiguration();
    this.processed = this.processData();
  }
  
  loadLargeData() {
    console.log('Loading large data... (expensive!)');
    // Simulate expensive operation
    return Array(1000000).fill(0).map((_, i) => i);
  }
  
  loadConfiguration() {
    console.log('Loading configuration... (expensive!)');
    return { setting1: 'value1', setting2: 'value2' };
  }
  
  processData() {
    console.log('Processing data... (expensive!)');
    return this.data.map(x => x * 2);
  }
}

// Problem: Each creation is expensive!
const obj1 = new ExpensiveObject(); // Expensive!
const obj2 = new ExpensiveObject(); // Expensive again!
const obj3 = new ExpensiveObject(); // Expensive again!

// What if you just want a copy with slight modifications?
```

**Problems:**
- Expensive to create new instances
- Can't easily copy existing objects
- Deep copying is complex
- Wastes resources

### Shallow Copy Problem:

```javascript
// ❌ Bad: Shallow copy doesn't work for nested objects
const original = {
  name: 'John',
  address: {
    street: '123 Main St',
    city: 'New York'
  }
};

const copy = { ...original }; // Shallow copy
copy.name = 'Jane'; // OK
copy.address.city = 'Boston'; // Problem! Also changes original!

console.log(original.address.city); // 'Boston' - Oops!
```

## ✅ Prototype Pattern Solution

**Specify the kinds of objects to create using a prototypical instance, and create new objects by copying this prototype.**

### Structure:

```
┌─────────────┐
│  Prototype  │
├─────────────┤
│ + clone()   │
└─────────────┘
```

### Implementation:

```javascript
// ✅ Good: Prototype Pattern

// Step 1: Prototype interface
class Prototype {
  clone() {
    throw new Error('Must implement clone()');
  }
}

// Step 2: Concrete prototype
class User extends Prototype {
  constructor(name, email, preferences) {
    super();
    this.name = name;
    this.email = email;
    this.preferences = preferences; // Nested object
  }
  
  clone() {
    // Deep copy
    return new User(
      this.name,
      this.email,
      { ...this.preferences } // Deep copy nested object
    );
  }
}

// Usage
const originalUser = new User('John', 'john@example.com', {
  theme: 'dark',
  language: 'en'
});

const clonedUser = originalUser.clone();
clonedUser.name = 'Jane';
clonedUser.preferences.theme = 'light';

console.log(originalUser.name); // 'John' - Unchanged!
console.log(originalUser.preferences.theme); // 'dark' - Unchanged!
console.log(clonedUser.name); // 'Jane'
console.log(clonedUser.preferences.theme); // 'light'
```

### JavaScript Built-in Prototype:

```javascript
// ✅ JavaScript has built-in prototype support!

// Method 1: Using Object.create()
const prototype = {
  name: 'Default',
  greet() {
    return `Hello, I'm ${this.name}`;
  }
};

const obj1 = Object.create(prototype);
obj1.name = 'John';

const obj2 = Object.create(prototype);
obj2.name = 'Jane';

console.log(obj1.greet()); // "Hello, I'm John"
console.log(obj2.greet()); // "Hello, I'm Jane"

// Method 2: Using spread operator (shallow copy)
const original = { a: 1, b: 2, nested: { c: 3 } };
const copy = { ...original }; // Shallow copy

// Method 3: Deep copy function
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item));
  }
  
  const cloned = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  
  return cloned;
}
```

## 🧠 Real-World Analogy

**Think of a photocopier:**
- You have an **original document**
- Instead of writing it again, you **make a copy**
- You can modify the copy without affecting the original
- Much faster than creating from scratch!

## 💻 Complete Example: Game Character Cloning

```javascript
// Prototype
class GameCharacter {
  constructor(name, health, position, inventory) {
    this.name = name;
    this.health = health;
    this.position = { x: position.x, y: position.y };
    this.inventory = [...inventory]; // Array copy
  }
  
  clone() {
    // Deep clone
    return new GameCharacter(
      this.name,
      this.health,
      { ...this.position },
      [...this.inventory]
    );
  }
  
  move(x, y) {
    this.position.x += x;
    this.position.y += y;
  }
  
  addItem(item) {
    this.inventory.push(item);
  }
}

// Usage: Clone characters for multiplayer
const playerTemplate = new GameCharacter('Player', 100, { x: 0, y: 0 }, ['sword']);

// Create multiple players from template
const player1 = playerTemplate.clone();
player1.name = 'Alice';
player1.move(10, 20);

const player2 = playerTemplate.clone();
player2.name = 'Bob';
player2.move(30, 40);
player2.addItem('shield');

console.log(player1); // Alice at (10, 20)
console.log(player2); // Bob at (30, 40) with shield
console.log(playerTemplate); // Original unchanged
```

### Registry Pattern (Advanced):

```javascript
// Prototype Registry - Store and retrieve prototypes
class PrototypeRegistry {
  constructor() {
    this.prototypes = {};
  }
  
  register(key, prototype) {
    this.prototypes[key] = prototype;
  }
  
  clone(key) {
    const prototype = this.prototypes[key];
    if (!prototype) {
      throw new Error(`Prototype ${key} not found`);
    }
    return prototype.clone();
  }
}

// Usage
const registry = new PrototypeRegistry();

// Register templates
registry.register('admin', new User('Admin', 'admin@example.com', { role: 'admin' }));
registry.register('customer', new User('Customer', 'customer@example.com', { role: 'customer' }));

// Clone from registry
const admin1 = registry.clone('admin');
admin1.name = 'John Admin';

const admin2 = registry.clone('admin');
admin2.name = 'Jane Admin';

const customer1 = registry.clone('customer');
customer1.name = 'Bob Customer';
```

## 🎯 When to Use Prototype Pattern

### ✅ Good Use Cases:
1. **Expensive Object Creation** - Cloning is cheaper than creating
2. **Similar Objects** - Many objects with similar structure
3. **Configuration Templates** - Base configuration to clone
4. **Avoiding Subclasses** - Clone instead of inheritance
5. **Runtime Object Creation** - Don't know exact class at compile time

### ❌ When NOT to Use

1. **Simple Objects** - If copying is as expensive as creating
2. **Few Instances** - Not worth the complexity
3. **Circular References** - Can be tricky to handle

## 🔄 Prototype vs Other Patterns

| Pattern | Purpose | Use When |
|---------|---------|----------|
| **Prototype** | Clone existing objects | Expensive creation, similar objects |
| **Factory** | Create new objects | Need different types |
| **Singleton** | One instance only | Need single instance |

## 📊 Pros and Cons

### ✅ Pros:
- Faster than creating from scratch
- Hides complexity of object creation
- Can add/remove properties at runtime
- Reduces subclassing
- Flexible object creation

### ❌ Cons:
- Deep copying can be complex
- Circular references are tricky
- Cloning complex objects can be expensive
- Need to handle all object types

## 🚀 Next Steps

Congratulations! You've completed Creational Patterns! 🎉

- ✅ Review [Creational Patterns Overview](./README.md)
- ✅ Move to [Structural Patterns](../05-structural-patterns/README.md) - Start with Adapter

---

**Remember:** Use Prototype when cloning is cheaper than creating new objects! 🎯

