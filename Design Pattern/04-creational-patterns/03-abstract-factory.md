# Abstract Factory Pattern

## 🎯 What Problem Does It Solve?

**Problem:** You need to create **families of related objects** without specifying their concrete classes.

### Real-World Examples:
- Creating UI components for different themes (Light/Dark theme buttons, dialogs, menus)
- Creating database components (MySQL/PostgreSQL connections, queries, transactions)
- Creating cross-platform components (Windows/Mac/Linux buttons, windows, menus)
- Creating furniture sets (Modern/Victorian chairs, tables, sofas)

## 😵 Why Current Code Is Bad

### Without Abstract Factory (Problematic):

```javascript
// ❌ Bad: Creating related objects manually
class LightButton {
  render() {
    return '<button style="background: white">Click</button>';
  }
}

class LightDialog {
  render() {
    return '<div style="background: white">Dialog</div>';
  }
}

class DarkButton {
  render() {
    return '<button style="background: black">Click</button>';
  }
}

class DarkDialog {
  render() {
    return '<div style="background: black">Dialog</div>';
  }
}

// Problem: Easy to mix themes accidentally!
function createUI(theme) {
  if (theme === 'light') {
    return {
      button: new LightButton(),
      dialog: new LightDialog()
    };
  } else {
    return {
      button: new DarkButton(),
      dialog: new DarkDialog()
    };
  }
}

// But what if someone does this?
const ui = {
  button: new LightButton(),  // Light theme
  dialog: new DarkDialog()     // Dark theme - Mismatch!
};
```

**Problems:**
- Can accidentally mix incompatible objects
- Hard to ensure consistency
- Violates Open/Closed Principle
- Tight coupling

## ✅ Abstract Factory Pattern Solution

**Provide an interface for creating families of related objects without specifying their concrete classes.**

### Structure:

```
┌──────────────────┐
│ AbstractFactory  │
├──────────────────┤
│ + createButton() │
│ + createDialog() │
└────────┬─────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼────┐
│ Light │ │ Dark  │
│Factory│ │Factory│
└───────┘ └───────┘
```

### Implementation:

```javascript
// ✅ Good: Abstract Factory Pattern

// Step 1: Abstract Products
class Button {
  render() {
    throw new Error('Must implement render()');
  }
}

class Dialog {
  render() {
    throw new Error('Must implement render()');
  }
}

// Step 2: Concrete Products - Light Theme
class LightButton extends Button {
  render() {
    return '<button style="background: white; color: black">Click</button>';
  }
}

class LightDialog extends Dialog {
  render() {
    return '<div style="background: white; color: black">Light Dialog</div>';
  }
}

// Step 3: Concrete Products - Dark Theme
class DarkButton extends Button {
  render() {
    return '<button style="background: black; color: white">Click</button>';
  }
}

class DarkDialog extends Dialog {
  render() {
    return '<div style="background: black; color: white">Dark Dialog</div>';
  }
}

// Step 4: Abstract Factory
class UIFactory {
  createButton() {
    throw new Error('Must implement createButton()');
  }
  
  createDialog() {
    throw new Error('Must implement createDialog()');
  }
}

// Step 5: Concrete Factories
class LightUIFactory extends UIFactory {
  createButton() {
    return new LightButton();
  }
  
  createDialog() {
    return new LightDialog();
  }
}

class DarkUIFactory extends UIFactory {
  createButton() {
    return new DarkButton();
  }
  
  createDialog() {
    return new DarkDialog();
  }
}

// Step 6: Factory Provider
class UIFactoryProvider {
  static getFactory(theme) {
    const factories = {
      light: () => new LightUIFactory(),
      dark: () => new DarkUIFactory()
    };
    
    const factory = factories[theme.toLowerCase()];
    if (!factory) {
      throw new Error(`Unknown theme: ${theme}`);
    }
    
    return factory();
  }
}

// Usage - Guaranteed consistency!
const lightFactory = UIFactoryProvider.getFactory('light');
const lightButton = lightFactory.createButton();
const lightDialog = lightFactory.createDialog();

const darkFactory = UIFactoryProvider.getFactory('dark');
const darkButton = darkFactory.createButton();
const darkDialog = darkFactory.createDialog();

// All components match their theme!
console.log(lightButton.render());
console.log(lightDialog.render());
```

## 🧠 Real-World Analogy

**Think of a furniture store:**
- **Modern Factory** creates: Modern Chair + Modern Table + Modern Sofa
- **Victorian Factory** creates: Victorian Chair + Victorian Table + Victorian Sofa
- You can't mix Modern Chair with Victorian Table - they don't match!
- The factory ensures all pieces belong to the same style

## 💻 Complete Example: Database Components

```javascript
// Abstract Products
class Connection {
  connect() {
    throw new Error('Must implement connect()');
  }
}

class Query {
  execute(sql) {
    throw new Error('Must implement execute()');
  }
}

// MySQL Products
class MySQLConnection extends Connection {
  connect() {
    console.log('Connecting to MySQL database...');
    return { type: 'mysql', status: 'connected' };
  }
}

class MySQLQuery extends Query {
  execute(sql) {
    console.log(`Executing MySQL query: ${sql}`);
    return { type: 'mysql', result: 'query executed' };
  }
}

// PostgreSQL Products
class PostgreSQLConnection extends Connection {
  connect() {
    console.log('Connecting to PostgreSQL database...');
    return { type: 'postgresql', status: 'connected' };
  }
}

class PostgreSQLQuery extends Query {
  execute(sql) {
    console.log(`Executing PostgreSQL query: ${sql}`);
    return { type: 'postgresql', result: 'query executed' };
  }
}

// Abstract Factory
class DatabaseFactory {
  createConnection() {
    throw new Error('Must implement createConnection()');
  }
  
  createQuery() {
    throw new Error('Must implement createQuery()');
  }
}

// Concrete Factories
class MySQLFactory extends DatabaseFactory {
  createConnection() {
    return new MySQLConnection();
  }
  
  createQuery() {
    return new MySQLQuery();
  }
}

class PostgreSQLFactory extends DatabaseFactory {
  createConnection() {
    return new PostgreSQLConnection();
  }
  
  createQuery() {
    return new PostgreSQLQuery();
  }
}

// Factory Provider
class DatabaseFactoryProvider {
  static getFactory(dbType) {
    const factories = {
      mysql: () => new MySQLFactory(),
      postgresql: () => new PostgreSQLFactory()
    };
    
    return factories[dbType.toLowerCase()]();
  }
}

// Usage - All components match!
function setupDatabase(dbType) {
  const factory = DatabaseFactoryProvider.getFactory(dbType);
  
  const connection = factory.createConnection();
  const query = factory.createQuery();
  
  // Guaranteed: Connection and Query are from same database type!
  connection.connect();
  query.execute('SELECT * FROM users');
  
  return { connection, query };
}

setupDatabase('mysql');     // MySQL connection + MySQL query
setupDatabase('postgresql'); // PostgreSQL connection + PostgreSQL query
```

## 🎯 When to Use Abstract Factory

### ✅ Good Use Cases:
1. **Families of Related Objects** - Need multiple related objects
2. **Consistency Required** - Objects must work together
3. **Multiple Variants** - Different themes, platforms, styles
4. **Configuration-Based** - Choose family at runtime
5. **Cross-Platform Development** - Windows/Mac/Linux components

### ❌ When NOT to Use

1. **Single Object Creation** - Use Factory Method instead
2. **Unrelated Objects** - If objects aren't related, don't force it
3. **Simple Cases** - Can be overkill for simple scenarios

## 🔄 Abstract Factory vs Factory Method

| Aspect | Factory Method | Abstract Factory |
|--------|---------------|------------------|
| **Purpose** | Create one object | Create family of objects |
| **Complexity** | Simpler | More complex |
| **Use Case** | Single product | Related products |
| **Example** | Create User | Create UI theme (button + dialog + menu) |

## 📊 Pros and Cons

### ✅ Pros:
- Ensures consistency (all objects from same family)
- Easy to add new families
- Hides concrete classes
- Follows Open/Closed Principle

### ❌ Cons:
- More complex than Factory Method
- Can be overkill for simple cases
- Harder to understand initially
- More classes to maintain

## 🚀 Next Steps

Now that you understand Abstract Factory:
- ✅ Learn [Builder Pattern](./04-builder.md) - For step-by-step object construction
- ✅ Or review [Structural Patterns](../05-structural-patterns/README.md)

---

**Remember:** Use Abstract Factory when you need families of related objects that must work together! 🎯

