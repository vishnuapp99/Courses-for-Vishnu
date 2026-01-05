# Builder Pattern

## 🎯 What Problem Does It Solve?

**Problem:** You need to create **complex objects** with many optional parameters, and you want to do it step-by-step in a readable way.

### Real-World Examples:
- Creating SQL queries (SELECT, WHERE, ORDER BY, LIMIT)
- Creating HTTP requests (method, headers, body, params)
- Creating user profiles (name, email, address, preferences, etc.)
- Creating configuration objects (many optional settings)
- Creating email messages (to, from, subject, body, attachments)

## 😵 Why Current Code Is Bad

### Without Builder (Problematic):

```javascript
// ❌ Bad: Constructor with many parameters
class User {
  constructor(name, email, age, address, phone, isAdmin, preferences) {
    this.name = name;
    this.email = email;
    this.age = age;
    this.address = address;
    this.phone = phone;
    this.isAdmin = isAdmin;
    this.preferences = preferences;
  }
}

// Problem: Hard to read, easy to make mistakes!
const user = new User(
  'John Doe',           // name
  'john@example.com',   // email
  30,                   // age
  '123 Main St',        // address
  '555-1234',           // phone
  false,                // isAdmin
  { theme: 'dark' }     // preferences
);

// What if some parameters are optional?
// What if you only need name and email?
// What if you forget the order?
```

**Problems:**
- Too many parameters (hard to remember order)
- Optional parameters become messy
- Hard to read
- Easy to make mistakes
- Can't build step-by-step

### Alternative (Also Bad):

```javascript
// ❌ Bad: Setters everywhere
class User {
  constructor() {
    this.name = null;
    this.email = null;
    this.age = null;
    // ... many nulls
  }
  
  setName(name) { this.name = name; }
  setEmail(email) { this.email = email; }
  setAge(age) { this.age = age; }
  // ... many setters
}

// Problem: Object can be in invalid state!
const user = new User();
user.setName('John');
// Forgot to set email? Object is incomplete!
```

## ✅ Builder Pattern Solution

**Separate the construction of a complex object from its representation, allowing the same construction process to create different representations.**

### Structure:

```
┌──────────┐
│  Builder │
├──────────┤
│ + build()│
└────┬─────┘
     │
     │ implements
     │
┌────▼──────────┐
│ConcreteBuilder│
├───────────────┤
│ + step1()     │
│ + step2()     │
│ + build()     │
└───────────────┘
```

### Implementation:

```javascript
// ✅ Good: Builder Pattern

// Step 1: Product
class User {
  constructor() {
    this.name = null;
    this.email = null;
    this.age = null;
    this.address = null;
    this.phone = null;
    this.isAdmin = false;
    this.preferences = {};
  }
  
  validate() {
    if (!this.name || !this.email) {
      throw new Error('Name and email are required');
    }
    return true;
  }
}

// Step 2: Builder
class UserBuilder {
  constructor() {
    this.user = new User();
  }
  
  setName(name) {
    this.user.name = name;
    return this; // Return this for method chaining
  }
  
  setEmail(email) {
    this.user.email = email;
    return this;
  }
  
  setAge(age) {
    this.user.age = age;
    return this;
    return this;
  }
  
  setAddress(address) {
    this.user.address = address;
    return this;
  }
  
  setPhone(phone) {
    this.user.phone = phone;
    return this;
  }
  
  setAdmin(isAdmin) {
    this.user.isAdmin = isAdmin;
    return this;
  }
  
  setPreferences(preferences) {
    this.user.preferences = preferences;
    return this;
  }
  
  build() {
    this.user.validate();
    return this.user;
  }
}

// Usage - Clean and readable!
const user = new UserBuilder()
  .setName('John Doe')
  .setEmail('john@example.com')
  .setAge(30)
  .setAddress('123 Main St')
  .setPhone('555-1234')
  .setAdmin(false)
  .setPreferences({ theme: 'dark' })
  .build();

// Easy to read, self-documenting!
// Can skip optional parameters
const simpleUser = new UserBuilder()
  .setName('Jane Doe')
  .setEmail('jane@example.com')
  .build();
```

## 🧠 Real-World Analogy

**Think of ordering a pizza:**
- You don't give all instructions at once
- You build it step-by-step:
  - Choose size
  - Choose crust
  - Add toppings
  - Add cheese
  - Finalize order
- Each step is clear and optional
- Final result is a complete pizza

## 💻 Complete Example: SQL Query Builder

```javascript
// Product
class SQLQuery {
  constructor() {
    this.select = [];
    this.from = null;
    this.where = [];
    this.orderBy = [];
    this.limit = null;
  }
  
  toString() {
    let query = 'SELECT ';
    
    if (this.select.length === 0) {
      query += '*';
    } else {
      query += this.select.join(', ');
    }
    
    query += ` FROM ${this.from}`;
    
    if (this.where.length > 0) {
      query += ' WHERE ' + this.where.join(' AND ');
    }
    
    if (this.orderBy.length > 0) {
      query += ' ORDER BY ' + this.orderBy.join(', ');
    }
    
    if (this.limit) {
      query += ` LIMIT ${this.limit}`;
    }
    
    return query;
  }
}

// Builder
class SQLQueryBuilder {
  constructor() {
    this.query = new SQLQuery();
  }
  
  select(columns) {
    if (Array.isArray(columns)) {
      this.query.select = columns;
    } else {
      this.query.select = [columns];
    }
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
  
  orderBy(column, direction = 'ASC') {
    this.query.orderBy.push(`${column} ${direction}`);
    return this;
  }
  
  limit(count) {
    this.query.limit = count;
    return this;
  }
  
  build() {
    if (!this.query.from) {
      throw new Error('FROM clause is required');
    }
    return this.query;
  }
}

// Usage - Beautiful and readable!
const query1 = new SQLQueryBuilder()
  .select(['id', 'name', 'email'])
  .from('users')
  .where('age > 18')
  .where('status = "active"')
  .orderBy('name', 'ASC')
  .limit(10)
  .build();

console.log(query1.toString());
// SELECT id, name, email FROM users WHERE age > 18 AND status = "active" ORDER BY name ASC LIMIT 10

// Simple query
const query2 = new SQLQueryBuilder()
  .select('*')
  .from('products')
  .build();

console.log(query2.toString());
// SELECT * FROM products
```

## 🎯 When to Use Builder Pattern

### ✅ Good Use Cases:
1. **Complex Objects** - Many parameters or optional fields
2. **Step-by-Step Construction** - Need to build incrementally
3. **Readability** - Want self-documenting code
4. **Validation** - Need to validate before creating object
5. **Immutable Objects** - Build then freeze
6. **Different Representations** - Same building process, different results

### ❌ When NOT to Use

1. **Simple Objects** - If constructor is enough, don't overcomplicate
2. **Few Parameters** - Builder adds overhead for simple cases
3. **Performance Critical** - Builder creates extra objects

## 🔄 Builder vs Factory

| Aspect | Factory | Builder |
|--------|---------|---------|
| **Purpose** | Create object | Build complex object step-by-step |
| **Parameters** | Few, known | Many, optional |
| **Process** | One-step | Multi-step |
| **Use Case** | Simple creation | Complex construction |

## 📊 Pros and Cons

### ✅ Pros:
- Clear and readable code
- Flexible (optional parameters)
- Step-by-step construction
- Validation before creation
- Method chaining (fluent interface)
- Can create different representations

### ❌ Cons:
- More code to write
- Extra objects created
- Can be overkill for simple cases

## 🚀 Next Steps

Now that you understand Builder:
- ✅ Learn [Prototype Pattern](./05-prototype.md) - For cloning objects
- ✅ Or move to [Structural Patterns](../05-structural-patterns/README.md)

---

**Remember:** Use Builder when you have complex objects with many optional parameters! 🎯

