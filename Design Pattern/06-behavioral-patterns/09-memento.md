# Memento Pattern

## 🎯 What Problem Does It Solve?

**Problem:** You need to **save and restore** an object's state without violating encapsulation.

### Real-World Examples:
- Undo/redo functionality
- Save game states
- Database transactions (rollback)
- Text editor history
- Configuration snapshots

## 😵 Why Current Code Is Bad

### Without Memento (Problematic):

```javascript
// ❌ Bad: Exposing internal state
class Editor {
  constructor() {
    this.text = '';
    this.cursor = 0;
  }
  
  // Problem: Exposes internal state
  getState() {
    return {
      text: this.text,
      cursor: this.cursor
    };
  }
  
  setState(state) {
    this.text = state.text;
    this.cursor = state.cursor;
  }
}

// Problem: Client can modify state directly!
const editor = new Editor();
const state = editor.getState();
state.text = 'Hacked!'; // Can modify!
editor.setState(state);
```

**Problems:**
- Exposes internal state
- Client can modify state
- Violates encapsulation
- No way to validate state

## ✅ Memento Pattern Solution

**Without violating encapsulation, capture and externalize an object's internal state so that the object can be restored to this state later.**

### Structure:

```
┌──────────┐
│ Originator│
├──────────┤
│ + save()  │
│ + restore()│
└────┬─────┘
     │
     │ creates
     │
┌────▼──────────┐
│   Memento     │
├───────────────┤
│ - state       │
└───────────────┘
     │
     │ stored by
     │
┌────▼──────────┐
│  Caretaker    │
└───────────────┘
```

### Implementation:

```javascript
// ✅ Good: Memento Pattern

// Step 1: Memento (immutable snapshot)
class EditorMemento {
  constructor(text, cursor) {
    this.text = text;
    this.cursor = cursor;
    // Memento is immutable - can't be modified after creation
  }
}

// Step 2: Originator (object whose state we save)
class Editor {
  constructor() {
    this.text = '';
    this.cursor = 0;
  }
  
  type(text) {
    this.text += text;
    this.cursor += text.length;
  }
  
  delete(length) {
    this.text = this.text.slice(0, -length);
    this.cursor = Math.max(0, this.cursor - length);
  }
  
  // Create memento
  save() {
    return new EditorMemento(this.text, this.cursor);
  }
  
  // Restore from memento
  restore(memento) {
    this.text = memento.text;
    this.cursor = memento.cursor;
  }
  
  getContent() {
    return this.text;
  }
}

// Step 3: Caretaker (manages mementos)
class History {
  constructor() {
    this.mementos = [];
    this.currentIndex = -1;
  }
  
  save(editor) {
    // Remove any mementos after current index
    this.mementos = this.mementos.slice(0, this.currentIndex + 1);
    
    // Save new memento
    const memento = editor.save();
    this.mementos.push(memento);
    this.currentIndex++;
  }
  
  undo(editor) {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      editor.restore(this.mementos[this.currentIndex]);
    }
  }
  
  redo(editor) {
    if (this.currentIndex < this.mementos.length - 1) {
      this.currentIndex++;
      editor.restore(this.mementos[this.currentIndex]);
    }
  }
}

// Usage
const editor = new Editor();
const history = new History();

// Initial state
history.save(editor);

editor.type('Hello');
history.save(editor);

editor.type(' World');
history.save(editor);

console.log(editor.getContent()); // "Hello World"

// Undo
history.undo(editor);
console.log(editor.getContent()); // "Hello"

history.undo(editor);
console.log(editor.getContent()); // ""

// Redo
history.redo(editor);
console.log(editor.getContent()); // "Hello"
```

## 🧠 Real-World Analogy

**Think of a save game:**
- You're playing a game (originator)
- You **save** your progress (create memento)
- The **save file** (memento) stores your state
- You can **load** the save file (restore from memento)
- The save file is **protected** - you can't modify it directly

## 💻 Complete Example: Configuration Manager

```javascript
// Memento
class ConfigMemento {
  constructor(settings) {
    // Deep copy to prevent modification
    this.settings = JSON.parse(JSON.stringify(settings));
  }
  
  getSettings() {
    return JSON.parse(JSON.stringify(this.settings));
  }
}

// Originator
class Configuration {
  constructor() {
    this.settings = {
      theme: 'light',
      language: 'en',
      notifications: true
    };
  }
  
  setTheme(theme) {
    this.settings.theme = theme;
  }
  
  setLanguage(language) {
    this.settings.language = language;
  }
  
  setNotifications(enabled) {
    this.settings.notifications = enabled;
  }
  
  save() {
    return new ConfigMemento(this.settings);
  }
  
  restore(memento) {
    this.settings = memento.getSettings();
  }
  
  getSettings() {
    return { ...this.settings };
  }
}

// Caretaker
class ConfigHistory {
  constructor() {
    this.snapshots = [];
  }
  
  saveSnapshot(config) {
    this.snapshots.push(config.save());
  }
  
  restoreSnapshot(config, index) {
    if (index >= 0 && index < this.snapshots.length) {
      config.restore(this.snapshots[index]);
    }
  }
  
  listSnapshots() {
    return this.snapshots.map((m, i) => ({
      index: i,
      settings: m.getSettings()
    }));
  }
}

// Usage
const config = new Configuration();
const history = new ConfigHistory();

// Initial snapshot
history.saveSnapshot(config);
console.log('Initial:', config.getSettings());

// Make changes
config.setTheme('dark');
config.setLanguage('es');
history.saveSnapshot(config);
console.log('After changes:', config.getSettings());

// Make more changes
config.setNotifications(false);
history.saveSnapshot(config);
console.log('After more changes:', config.getSettings());

// Restore to previous snapshot
history.restoreSnapshot(config, 1);
console.log('Restored to snapshot 1:', config.getSettings());

// List all snapshots
console.log('All snapshots:');
history.listSnapshots().forEach((snapshot, i) => {
  console.log(`Snapshot ${i}:`, snapshot.settings);
});
```

## 🎯 When to Use Memento Pattern

### ✅ Good Use Cases:
1. **Undo/Redo** - Text editors, image editors
2. **Save States** - Games, applications
3. **Transactions** - Database rollback
4. **Configuration** - Save/restore settings
5. **Checkpoints** - Restore to previous state

### ❌ When NOT to Use

1. **Simple State** - If state is simple, might be overkill
2. **Performance Critical** - Mementos use memory
3. **Frequent Saves** - Can consume too much memory

## 🔄 Memento vs Command

| Aspect | Memento | Command |
|--------|---------|---------|
| **Purpose** | Save/restore state | Encapsulate requests |
| **State** | Captures state | Stores action |
| **Undo** | Restore previous state | Execute reverse action |

## 📊 Pros and Cons

### ✅ Pros:
- Preserves encapsulation
- Easy to implement undo/redo
- Can save multiple states
- State is immutable

### ❌ Cons:
- Memory usage (storing states)
- Can be expensive for large objects
- Caretaker must manage lifecycle

## 🚀 Next Steps

Congratulations! You've completed all Behavioral Patterns! 🎉

- ✅ Review [Behavioral Patterns Overview](./README.md)
- ✅ Check out [Real-World Examples](../07-real-world-examples/README.md)
- ✅ Learn [Best Practices](../08-best-practices/README.md)

---

**Remember:** Use Memento when you need to save and restore object state without violating encapsulation! 🎯

