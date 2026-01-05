# Command Pattern

## 🎯 What Problem Does It Solve?

**Problem:** You want to **encapsulate requests as objects**, allowing you to parameterize clients with different requests, queue operations, and support undo/redo.

### Real-World Examples:
- Undo/redo functionality (text editors, image editors)
- Macro recording (record and replay actions)
- Job queues (queue commands to execute later)
- Remote controls (button presses as commands)
- Transaction systems (execute, rollback)

## 😵 Why Current Code Is Bad

### Without Command (Problematic):

```javascript
// ❌ Bad: Direct method calls
class TextEditor {
  constructor() {
    this.text = '';
  }
  
  insertText(text) {
    this.text += text;
  }
  
  deleteText(length) {
    this.text = this.text.slice(0, -length);
  }
  
  // Problem: How to undo?
  // Problem: How to queue operations?
  // Problem: How to log all operations?
}

// Usage
const editor = new TextEditor();
editor.insertText('Hello');
editor.insertText(' World');
// Can't undo! Can't queue! Can't log!
```

**Problems:**
- Can't undo/redo
- Can't queue operations
- Can't log operations
- Hard to add new operations
- Tight coupling

## ✅ Command Pattern Solution

**Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue operations, and support undo operations.**

### Structure:

```
┌──────────┐
│  Client  │
└────┬─────┘
     │
     │ creates
     │
┌────▼──────────┐
│   Command    │
├──────────────┤
│ + execute()  │
│ + undo()     │
└────┬─────────┘
     │
  ┌──┴──────────────────┐
  │                     │
┌─▼────┐          ┌─────▼────┐
│Cmd1  │          │Receiver  │
└──────┘          └──────────┘
```

### Implementation:

```javascript
// ✅ Good: Command Pattern

// Step 1: Command interface
class Command {
  execute() {
    throw new Error('Must implement execute()');
  }
  
  undo() {
    throw new Error('Must implement undo()');
  }
}

// Step 2: Receiver (the object that performs the action)
class TextEditor {
  constructor() {
    this.text = '';
  }
  
  insert(text) {
    this.text += text;
  }
  
  delete(length) {
    this.text = this.text.slice(0, -length);
  }
  
  getText() {
    return this.text;
  }
}

// Step 3: Concrete commands
class InsertCommand extends Command {
  constructor(editor, text) {
    super();
    this.editor = editor;
    this.text = text;
  }
  
  execute() {
    this.editor.insert(this.text);
  }
  
  undo() {
    this.editor.delete(this.text.length);
  }
}

class DeleteCommand extends Command {
  constructor(editor, length) {
    super();
    this.editor = editor;
    this.length = length;
    this.deletedText = null;
  }
  
  execute() {
    // Save what we're deleting for undo
    this.deletedText = this.editor.getText().slice(-this.length);
    this.editor.delete(this.length);
  }
  
  undo() {
    if (this.deletedText) {
      this.editor.insert(this.deletedText);
    }
  }
}

// Step 4: Invoker (manages commands)
class CommandManager {
  constructor() {
    this.history = [];
    this.currentIndex = -1;
  }
  
  execute(command) {
    // Remove any commands after current index (for redo)
    this.history = this.history.slice(0, this.currentIndex + 1);
    
    // Execute and add to history
    command.execute();
    this.history.push(command);
    this.currentIndex++;
  }
  
  undo() {
    if (this.currentIndex >= 0) {
      const command = this.history[this.currentIndex];
      command.undo();
      this.currentIndex--;
    }
  }
  
  redo() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      const command = this.history[this.currentIndex];
      command.execute();
    }
  }
}

// Usage
const editor = new TextEditor();
const manager = new CommandManager();

// Execute commands
manager.execute(new InsertCommand(editor, 'Hello'));
manager.execute(new InsertCommand(editor, ' World'));
manager.execute(new InsertCommand(editor, '!'));

console.log(editor.getText()); // "Hello World!"

// Undo
manager.undo();
console.log(editor.getText()); // "Hello World"

manager.undo();
console.log(editor.getText()); // "Hello"

// Redo
manager.redo();
console.log(editor.getText()); // "Hello World"
```

## 🧠 Real-World Analogy

**Think of a remote control:**
- Each **button** is a command
- Pressing a button **executes** the command
- You can **program** buttons with different commands
- You can **undo** (go back)
- You can **record** a sequence of commands (macro)

## 💻 Complete Example: Smart Home System

```javascript
// Receiver
class Light {
  constructor(room) {
    this.room = room;
    this.isOn = false;
  }
  
  on() {
    this.isOn = true;
    console.log(`${this.room} light is ON`);
  }
  
  off() {
    this.isOn = false;
    console.log(`${this.room} light is OFF`);
  }
}

class Thermostat {
  constructor() {
    this.temperature = 20;
  }
  
  setTemperature(temp) {
    this.temperature = temp;
    console.log(`Temperature set to ${temp}°C`);
  }
}

// Command interface
class Command {
  execute() {
    throw new Error('Must implement execute()');
  }
  
  undo() {
    throw new Error('Must implement undo()');
  }
}

// Concrete commands
class LightOnCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }
  
  execute() {
    this.light.on();
  }
  
  undo() {
    this.light.off();
  }
}

class LightOffCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }
  
  execute() {
    this.light.off();
  }
  
  undo() {
    this.light.on();
  }
}

class ThermostatCommand extends Command {
  constructor(thermostat, temperature, previousTemp) {
    super();
    this.thermostat = thermostat;
    this.temperature = temperature;
    this.previousTemp = previousTemp || thermostat.temperature;
  }
  
  execute() {
    this.thermostat.setTemperature(this.temperature);
  }
  
  undo() {
    this.thermostat.setTemperature(this.previousTemp);
  }
}

// Macro command (composite)
class MacroCommand extends Command {
  constructor(commands) {
    super();
    this.commands = commands;
  }
  
  execute() {
    this.commands.forEach(cmd => cmd.execute());
  }
  
  undo() {
    // Undo in reverse order
    for (let i = this.commands.length - 1; i >= 0; i--) {
      this.commands[i].undo();
    }
  }
}

// Invoker
class RemoteControl {
  constructor() {
    this.history = [];
  }
  
  execute(command) {
    command.execute();
    this.history.push(command);
  }
  
  undo() {
    if (this.history.length > 0) {
      const command = this.history.pop();
      command.undo();
    }
  }
}

// Usage
const livingRoomLight = new Light('Living Room');
const bedroomLight = new Light('Bedroom');
const thermostat = new Thermostat();

const remote = new RemoteControl();

// Individual commands
remote.execute(new LightOnCommand(livingRoomLight));
remote.execute(new ThermostatCommand(thermostat, 22));

// Macro command (good night routine)
const goodNightMacro = new MacroCommand([
  new LightOffCommand(livingRoomLight),
  new LightOffCommand(bedroomLight),
  new ThermostatCommand(thermostat, 18)
]);

remote.execute(goodNightMacro);

// Undo
remote.undo(); // Undoes the macro
remote.undo(); // Undoes thermostat
remote.undo(); // Undoes light
```

## 🎯 When to Use Command Pattern

### ✅ Good Use Cases:
1. **Undo/Redo** - Text editors, image editors
2. **Macro Recording** - Record and replay actions
3. **Job Queues** - Queue commands to execute later
4. **Logging** - Log all commands
5. **Transactional Systems** - Execute, rollback
6. **Remote Controls** - Button actions as commands

### ❌ When NOT to Use

1. **Simple Operations** - If no undo/queue needed
2. **Performance Critical** - Command objects add overhead
3. **Simple Callbacks** - Functions might be enough

## 🔄 Command vs Other Patterns

| Pattern | Purpose | Use When |
|---------|---------|----------|
| **Command** | Encapsulate requests | Need undo/redo, queuing |
| **Strategy** | Interchangeable algorithms | Multiple ways to do same thing |
| **Chain of Responsibility** | Request handling chain | Sequential processing |

## 📊 Pros and Cons

### ✅ Pros:
- Encapsulates requests
- Undo/redo support
- Queue operations
- Log operations
- Macro commands
- Decouples invoker and receiver

### ❌ Cons:
- More classes
- Memory overhead (command history)
- Can be complex

## 🚀 Next Steps

Now that you understand Command:
- ✅ Learn [Chain of Responsibility](./04-chain-of-responsibility.md) - Request handling chain
- ✅ Or review [Behavioral Patterns Overview](./README.md)

---

**Remember:** Use Command when you need undo/redo, queuing, or logging operations! 🎯

