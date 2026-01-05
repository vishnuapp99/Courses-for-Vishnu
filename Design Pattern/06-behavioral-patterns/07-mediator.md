# Mediator Pattern

## 🎯 What Problem Does It Solve?

**Problem:** You have many objects that need to communicate with each other, creating a **complex web of dependencies**. You want to **reduce coupling** by having objects communicate through a mediator.

### Real-World Examples:
- Chat rooms (users communicate through chat server)
- Air traffic control (planes communicate through tower)
- GUI components (buttons, dialogs communicate through form)
- Microservices (services communicate through API gateway)
- Event buses (components communicate through event bus)

## 😵 Why Current Code Is Bad

### Without Mediator (Problematic):

```javascript
// ❌ Bad: Direct communication (tight coupling)
class User {
  constructor(name) {
    this.name = name;
    this.users = []; // Must know about all users!
  }
  
  sendMessage(message, recipient) {
    // Direct communication
    recipient.receiveMessage(this.name, message);
  }
  
  receiveMessage(sender, message) {
    console.log(`${this.name} received from ${sender}: ${message}`);
  }
}

// Problem: Each user must know about all other users!
const user1 = new User('Alice');
const user2 = new User('Bob');
const user3 = new User('Charlie');

user1.users = [user2, user3];
user2.users = [user1, user3];
user3.users = [user1, user2];

// Tight coupling! Hard to add/remove users!
```

**Problems:**
- Tight coupling between objects
- Objects must know about each other
- Hard to add/remove objects
- Complex dependencies
- Hard to maintain

## ✅ Mediator Pattern Solution

**Define an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly.**

### Structure:

```
┌──────────┐      ┌──────────┐
│Component1│      │Component2│
└────┬─────┘      └────┬─────┘
     │                │
     │ communicates  │
     │ through       │
     │                │
┌─────▼───────────────▼─────┐
│        Mediator           │
├───────────────────────────┤
│ + communicate()           │
└───────────────────────────┘
```

### Implementation:

```javascript
// ✅ Good: Mediator Pattern

// Step 1: Mediator interface
class ChatMediator {
  sendMessage(message, sender, recipient) {
    throw new Error('Must implement sendMessage()');
  }
  
  broadcast(message, sender) {
    throw new Error('Must implement broadcast()');
  }
}

// Step 2: Concrete mediator
class ChatRoom extends ChatMediator {
  constructor() {
    super();
    this.users = [];
  }
  
  addUser(user) {
    this.users.push(user);
    user.setMediator(this);
  }
  
  sendMessage(message, sender, recipient) {
    const recipientUser = this.users.find(u => u.name === recipient);
    if (recipientUser) {
      recipientUser.receiveMessage(sender, message);
    }
  }
  
  broadcast(message, sender) {
    this.users.forEach(user => {
      if (user.name !== sender) {
        user.receiveMessage(sender, message);
      }
    });
  }
}

// Step 3: Colleague (component)
class User {
  constructor(name) {
    this.name = name;
    this.mediator = null;
  }
  
  setMediator(mediator) {
    this.mediator = mediator;
  }
  
  sendMessage(message, recipient) {
    if (this.mediator) {
      this.mediator.sendMessage(message, this.name, recipient);
    }
  }
  
  broadcast(message) {
    if (this.mediator) {
      this.mediator.broadcast(message, this.name);
    }
  }
  
  receiveMessage(sender, message) {
    console.log(`${this.name} received from ${sender}: ${message}`);
  }
}

// Usage
const chatRoom = new ChatRoom();

const alice = new User('Alice');
const bob = new User('Bob');
const charlie = new User('Charlie');

chatRoom.addUser(alice);
chatRoom.addUser(bob);
chatRoom.addUser(charlie);

// Users communicate through mediator
alice.sendMessage('Hello Bob!', 'Bob');
bob.sendMessage('Hi Alice!', 'Alice');
charlie.broadcast('Hello everyone!');
```

## 🧠 Real-World Analogy

**Think of an airport:**
- **Planes** (components) don't talk to each other directly
- They communicate through **air traffic control** (mediator)
- The tower coordinates all communication
- Planes don't need to know about other planes
- Adding/removing planes is easy

## 💻 Complete Example: Form Components

```javascript
// Mediator
class FormMediator {
  constructor() {
    this.components = {};
  }
  
  register(component) {
    this.components[component.name] = component;
    component.setMediator(this);
  }
  
  notify(sender, event, data) {
    // Handle component interactions
    if (event === 'input-change') {
      this.handleInputChange(sender, data);
    } else if (event === 'button-click') {
      this.handleButtonClick(sender, data);
    }
  }
  
  handleInputChange(sender, data) {
    // Enable/disable submit button based on input
    const submitButton = this.components['submitButton'];
    if (submitButton) {
      submitButton.setEnabled(data.value.length > 0);
    }
    
    // Update validation message
    const validationLabel = this.components['validationLabel'];
    if (validationLabel) {
      if (data.value.length === 0) {
        validationLabel.setText('Field is required');
        validationLabel.setError(true);
      } else {
        validationLabel.setText('Valid');
        validationLabel.setError(false);
      }
    }
  }
  
  handleButtonClick(sender, data) {
    if (sender.name === 'submitButton') {
      const input = this.components['nameInput'];
      if (input) {
        console.log(`Form submitted with: ${input.getValue()}`);
      }
    }
  }
}

// Component base class
class Component {
  constructor(name) {
    this.name = name;
    this.mediator = null;
  }
  
  setMediator(mediator) {
    this.mediator = mediator;
  }
  
  notify(event, data) {
    if (this.mediator) {
      this.mediator.notify(this, event, data);
    }
  }
}

// Concrete components
class Input extends Component {
  constructor(name) {
    super(name);
    this.value = '';
  }
  
  setValue(value) {
    this.value = value;
    this.notify('input-change', { value });
  }
  
  getValue() {
    return this.value;
  }
}

class Button extends Component {
  constructor(name) {
    super(name);
    this.enabled = false;
  }
  
  setEnabled(enabled) {
    this.enabled = enabled;
    console.log(`${this.name} is now ${enabled ? 'enabled' : 'disabled'}`);
  }
  
  click() {
    if (this.enabled) {
      this.notify('button-click', {});
    }
  }
}

class Label extends Component {
  constructor(name) {
    super(name);
    this.text = '';
    this.isError = false;
  }
  
  setText(text) {
    this.text = text;
    console.log(`${this.name}: ${text}`);
  }
  
  setError(isError) {
    this.isError = isError;
  }
}

// Usage
const form = new FormMediator();

const nameInput = new Input('nameInput');
const submitButton = new Button('submitButton');
const validationLabel = new Label('validationLabel');

form.register(nameInput);
form.register(submitButton);
form.register(validationLabel);

// Components interact through mediator
nameInput.setValue('John'); // Enables button, shows "Valid"
nameInput.setValue(''); // Disables button, shows "Field is required"
nameInput.setValue('Jane'); // Enables button, shows "Valid"
submitButton.click(); // Submits form
```

## 🎯 When to Use Mediator Pattern

### ✅ Good Use Cases:
1. **Complex Communication** - Many objects need to communicate
2. **Reduce Coupling** - Objects shouldn't know about each other
3. **GUI Components** - Form components, dialog boxes
4. **Chat Systems** - Multiple users communicating
5. **Event Systems** - Centralized event handling

### ❌ When NOT to Use

1. **Simple Communication** - If only 2-3 objects, might be overkill
2. **Direct Communication OK** - If coupling is acceptable
3. **Performance Critical** - Mediator adds overhead

## 🔄 Mediator vs Observer

| Aspect | Mediator | Observer |
|--------|----------|----------|
| **Communication** | Many-to-many through mediator | One-to-many notifications |
| **Coupling** | Objects don't know each other | Observer knows subject |
| **Use Case** | Complex interactions | Simple notifications |

## 📊 Pros and Cons

### ✅ Pros:
- Reduces coupling
- Centralized communication
- Easy to add/remove objects
- Single Responsibility
- Easier to maintain

### ❌ Cons:
- Mediator can become complex
- Single point of failure
- Can become "god object"

## 🚀 Next Steps

Now that you understand Mediator:
- ✅ Learn [Iterator Pattern](./08-iterator.md) - Traverse collections
- ✅ Or review [Behavioral Patterns Overview](./README.md)

---

**Remember:** Use Mediator to reduce coupling in complex communication scenarios! 🎯

