# Prerequisites for Design Patterns

Before diving into design patterns, you need a solid foundation. Don't worry if you're rusty - this guide will refresh your memory! 🧠

## 🎯 What You Need to Know

### 1. Object-Oriented Programming (OOP) Basics

Design patterns are built on OOP principles. Let's review the essentials:

#### Classes and Objects

**Class** = Blueprint/Template
**Object** = Instance created from the class

```javascript
// Class (Blueprint)
class Car {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }
  
  start() {
    return `${this.brand} ${this.model} started!`;
  }
}

// Object (Instance)
const myCar = new Car('Toyota', 'Camry');
console.log(myCar.start()); // "Toyota Camry started!"
```

#### Inheritance

**Child class** inherits properties and methods from **parent class**

```javascript
// Parent Class
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return `${this.name} makes a sound`;
  }
}

// Child Class
class Dog extends Animal {
  speak() {
    return `${this.name} barks!`;
  }
}

const dog = new Dog('Buddy');
console.log(dog.speak()); // "Buddy barks!"
```

#### Encapsulation

**Hiding internal details** and exposing only what's necessary

```javascript
class BankAccount {
  // Private (encapsulated)
  #balance = 0;
  
  // Public interface
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
    }
  }
  
  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount();
account.deposit(100);
// account.#balance; // Error! Can't access directly
console.log(account.getBalance()); // 100
```

#### Polymorphism

**Same interface, different implementations**

```javascript
// Different classes, same method name
class Cat extends Animal {
  speak() {
    return `${this.name} meows!`;
  }
}

class Duck extends Animal {
  speak() {
    return `${this.name} quacks!`;
  }
}

// Same interface, different behavior
const animals = [
  new Dog('Buddy'),
  new Cat('Whiskers'),
  new Duck('Donald')
];

animals.forEach(animal => {
  console.log(animal.speak()); // Different output for each!
});
```

#### Abstraction

**Hiding complexity** and showing only essential features

```javascript
// Abstract concept - you don't need to know HOW it works internally
class Database {
  connect() {
    // Complex connection logic hidden
    return 'Connected to database';
  }
}

// You just use it
const db = new Database();
db.connect();
```

## 🏛️ SOLID Principles

SOLID principles are the foundation of good OOP design. Understanding them helps you appreciate why design patterns exist.

### S - Single Responsibility Principle

**A class should have only one reason to change**

```javascript
// ❌ Bad: Multiple responsibilities
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  saveToDatabase() { /* ... */ }
  sendEmail() { /* ... */ }
  generateReport() { /* ... */ }
}

// ✅ Good: Single responsibility
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

class UserRepository {
  save(user) { /* ... */ }
}

class EmailService {
  send(user) { /* ... */ }
}
```

### O - Open/Closed Principle

**Open for extension, closed for modification**

```javascript
// ❌ Bad: Modify existing code
class AreaCalculator {
  calculate(shape) {
    if (shape.type === 'circle') {
      return Math.PI * shape.radius ** 2;
    } else if (shape.type === 'rectangle') {
      return shape.width * shape.height;
    }
    // Need to modify this class for new shapes!
  }
}

// ✅ Good: Extend without modifying
class Shape {
  area() {
    throw new Error('Must implement area()');
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  
  area() {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  
  area() {
    return this.width * this.height;
  }
}
```

### L - Liskov Substitution Principle

**Subclasses should be substitutable for their base classes**

```javascript
// ✅ Good: Child can replace parent
class Bird {
  fly() {
    return 'Flying!';
  }
}

class Sparrow extends Bird {
  fly() {
    return 'Sparrow flying!';
  }
}

// Can use Sparrow wherever Bird is expected
function makeBirdFly(bird) {
  return bird.fly();
}

const sparrow = new Sparrow();
makeBirdFly(sparrow); // Works perfectly!
```

### I - Interface Segregation Principle

**Clients shouldn't depend on methods they don't use**

```javascript
// ❌ Bad: Fat interface
class Worker {
  work() { /* ... */ }
  eat() { /* ... */ }
  sleep() { /* ... */ }
}

// ✅ Good: Segregated interfaces
class Workable {
  work() { /* ... */ }
}

class Eatable {
  eat() { /* ... */ }
}

class HumanWorker extends Workable, Eatable {
  // Implements only what it needs
}
```

### D - Dependency Inversion Principle

**Depend on abstractions, not concretions**

```javascript
// ❌ Bad: Depends on concrete class
class EmailService {
  sendEmail() {
    // Direct dependency
    const gmail = new GmailService();
    gmail.send();
  }
}

// ✅ Good: Depends on abstraction
class EmailService {
  constructor(emailProvider) {
    this.emailProvider = emailProvider; // Abstraction
  }
  
  sendEmail() {
    this.emailProvider.send();
  }
}

// Can use any email provider
const gmail = new GmailService();
const outlook = new OutlookService();
const emailService1 = new EmailService(gmail);
const emailService2 = new EmailService(outlook);
```

## 🎯 Quick Self-Check

Before moving forward, make sure you can:

- [ ] Create classes and objects
- [ ] Understand inheritance
- [ ] Know what encapsulation means
- [ ] Understand polymorphism
- [ ] Know the 5 SOLID principles (at least the basic idea)

## 🚀 If You're Not Confident

**Don't worry!** You can:
1. Review OOP concepts in your preferred language
2. Practice with small examples
3. Come back to this guide anytime

**Remember:** You don't need to be an expert - just comfortable with the basics!

## 📚 Additional Resources

- **OOP Concepts:** Practice with simple examples
- **SOLID Principles:** Start with Single Responsibility, then explore others
- **Your Language:** Review OOP syntax in JavaScript/TypeScript/Python/Java/etc.

## 🎯 Next Steps

Once you're comfortable with these concepts:

1. ✅ Move to [Pattern Categories Overview](./../03-pattern-categories/README.md)
2. ✅ Start learning [Creational Patterns](./../04-creational-patterns/README.md)

---

**Pro Tip:** You'll learn SOLID principles better as you study design patterns - they go hand in hand! 🎓

