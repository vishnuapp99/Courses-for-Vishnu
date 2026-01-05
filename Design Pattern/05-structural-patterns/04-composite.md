# Composite Pattern

## 🎯 What Problem Does It Solve?

**Problem:** You need to work with **tree structures** where individual objects and groups of objects are treated the same way.

### Real-World Examples:
- File system (files and folders)
- Menu systems (menu items and submenus)
- Organization charts (employees and departments)
- UI components (buttons and containers)
- Expression trees (operators and operands)

## 😵 Why Current Code Is Bad

### Without Composite (Problematic):

```javascript
// ❌ Bad: Different handling for files and folders
class File {
  constructor(name) {
    this.name = name;
  }
  
  getSize() {
    return 100; // File size
  }
}

class Folder {
  constructor(name) {
    this.name = name;
    this.children = [];
  }
  
  add(child) {
    this.children.push(child);
  }
  
  getSize() {
    // Problem: Different logic for folders
    let total = 0;
    for (let child of this.children) {
      if (child instanceof File) {
        total += child.getSize();
      } else if (child instanceof Folder) {
        total += child.getSize(); // Recursive, but different handling
      }
    }
    return total;
  }
}

// Problem: Client must know the difference!
function printSize(item) {
  if (item instanceof File) {
    console.log(`File ${item.name}: ${item.getSize()}`);
  } else if (item instanceof Folder) {
    console.log(`Folder ${item.name}: ${item.getSize()}`);
    // Must handle differently!
  }
}
```

**Problems:**
- Different handling for leaf and composite
- Client must know the structure
- Hard to add new types
- Code duplication
- Violates Open/Closed Principle

## ✅ Composite Pattern Solution

**Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions uniformly.**

### Structure:

```
┌──────────────┐
│  Component   │
├──────────────┤
│ + operation()│
│ + add()      │
│ + remove()   │
│ + getChild() │
└──────┬───────┘
       │
   ┌───┴────┐
   │        │
┌──▼──┐  ┌──▼──────┐
│Leaf │  │Composite│
└─────┘  ├─────────┤
         │children │
         │+ add()  │
         │+ remove()│
         └─────────┘
```

### Implementation:

```javascript
// ✅ Good: Composite Pattern

// Step 1: Component interface
class FileSystemItem {
  constructor(name) {
    this.name = name;
  }
  
  getSize() {
    throw new Error('Must implement getSize()');
  }
  
  display(indent = 0) {
    throw new Error('Must implement display()');
  }
}

// Step 2: Leaf (individual object)
class File extends FileSystemItem {
  constructor(name, size) {
    super(name);
    this.size = size;
  }
  
  getSize() {
    return this.size;
  }
  
  display(indent = 0) {
    const indentStr = '  '.repeat(indent);
    console.log(`${indentStr}📄 ${this.name} (${this.size} bytes)`);
  }
}

// Step 3: Composite (group of objects)
class Folder extends FileSystemItem {
  constructor(name) {
    super(name);
    this.children = [];
  }
  
  add(item) {
    this.children.push(item);
    return this;
  }
  
  remove(item) {
    const index = this.children.indexOf(item);
    if (index > -1) {
      this.children.splice(index, 1);
    }
  }
  
  getSize() {
    // Treats children uniformly!
    return this.children.reduce((total, child) => {
      return total + child.getSize(); // Works for both File and Folder!
    }, 0);
  }
  
  display(indent = 0) {
    const indentStr = '  '.repeat(indent);
    console.log(`${indentStr}📁 ${this.name}/`);
    
    // Recursively display children
    this.children.forEach(child => {
      child.display(indent + 1);
    });
  }
}

// Usage - Treat everything uniformly!
const root = new Folder('root');

const documents = new Folder('Documents');
documents.add(new File('resume.pdf', 50000));
documents.add(new File('letter.docx', 30000));

const pictures = new Folder('Pictures');
pictures.add(new File('photo1.jpg', 200000));
pictures.add(new File('photo2.jpg', 250000));

const subfolder = new Folder('Vacation');
subfolder.add(new File('beach.jpg', 300000));
pictures.add(subfolder);

root.add(documents);
root.add(pictures);

// Same interface for files and folders!
root.display();
// 📁 root/
//   📁 Documents/
//     📄 resume.pdf (50000 bytes)
//     📄 letter.docx (30000 bytes)
//   📁 Pictures/
//     📄 photo1.jpg (200000 bytes)
//     📄 photo2.jpg (250000 bytes)
//     📁 Vacation/
//       📄 beach.jpg (300000 bytes)

console.log(`Total size: ${root.getSize()} bytes`);
// Works the same for files and folders!
```

## 🧠 Real-World Analogy

**Think of a file system:**
- **Files** are individual items (leaf)
- **Folders** contain files and other folders (composite)
- You can **get size** of both (same operation)
- You can **display** both (same operation)
- Folders can contain folders (recursive structure)
- You treat files and folders **the same way**

## 💻 Complete Example: Menu System

```javascript
// Component
class MenuComponent {
  constructor(name) {
    this.name = name;
  }
  
  add(component) {
    throw new Error('Unsupported operation');
  }
  
  remove(component) {
    throw new Error('Unsupported operation');
  }
  
  getChild(index) {
    throw new Error('Unsupported operation');
  }
  
  display() {
    throw new Error('Must implement display()');
  }
  
  execute() {
    throw new Error('Unsupported operation');
  }
}

// Leaf
class MenuItem extends MenuComponent {
  constructor(name, action) {
    super(name);
    this.action = action;
  }
  
  display() {
    console.log(`  - ${this.name}`);
  }
  
  execute() {
    if (this.action) {
      this.action();
    }
  }
}

// Composite
class Menu extends MenuComponent {
  constructor(name) {
    super(name);
    this.children = [];
  }
  
  add(component) {
    this.children.push(component);
    return this;
  }
  
  remove(component) {
    const index = this.children.indexOf(component);
    if (index > -1) {
      this.children.splice(index, 1);
    }
  }
  
  getChild(index) {
    return this.children[index];
  }
  
  display() {
    console.log(`\n${this.name}:`);
    this.children.forEach(child => {
      child.display(); // Works for both Menu and MenuItem!
    });
  }
  
  execute() {
    console.log(`Executing menu: ${this.name}`);
    this.children.forEach(child => {
      child.execute(); // Recursive execution
    });
  }
}

// Usage
const mainMenu = new Menu('Main Menu');

const fileMenu = new Menu('File');
fileMenu.add(new MenuItem('New', () => console.log('Creating new file...')));
fileMenu.add(new MenuItem('Open', () => console.log('Opening file...')));
fileMenu.add(new MenuItem('Save', () => console.log('Saving file...')));

const editMenu = new Menu('Edit');
editMenu.add(new MenuItem('Cut', () => console.log('Cutting...')));
editMenu.add(new MenuItem('Copy', () => console.log('Copying...')));
editMenu.add(new MenuItem('Paste', () => console.log('Pasting...')));

const viewMenu = new Menu('View');
viewMenu.add(new MenuItem('Zoom In', () => console.log('Zooming in...')));
viewMenu.add(new MenuItem('Zoom Out', () => console.log('Zooming out...')));

mainMenu.add(fileMenu);
mainMenu.add(editMenu);
mainMenu.add(viewMenu);

// Same interface for menus and menu items!
mainMenu.display();
// Main Menu:
// File:
//   - New
//   - Open
//   - Save
// Edit:
//   - Cut
//   - Copy
//   - Paste
// View:
//   - Zoom In
//   - Zoom Out

mainMenu.execute(); // Executes all items recursively
```

## 🎯 When to Use Composite Pattern

### ✅ Good Use Cases:
1. **Tree Structures** - Files, folders, menus
2. **Part-Whole Hierarchies** - Parts and groups of parts
3. **Uniform Treatment** - Want to treat individual and group the same
4. **Recursive Structures** - Nested structures
5. **UI Components** - Buttons, panels, containers

### ❌ When NOT to Use

1. **Simple Structures** - If no tree structure, don't use
2. **Different Operations** - If leaf and composite need different operations
3. **Performance Critical** - Recursive operations can be slow

## 🔄 Composite vs Other Patterns

| Pattern | Purpose | Use When |
|---------|---------|----------|
| **Composite** | Tree structures | Part-whole hierarchies |
| **Decorator** | Add functionality | Need to extend behavior |
| **Facade** | Simplify interface | Complex subsystem |

## 📊 Pros and Cons

### ✅ Pros:
- Uniform treatment of objects
- Easy to add new types
- Simplifies client code
- Recursive composition
- Open/Closed Principle

### ❌ Cons:
- Can make design overly general
- Hard to restrict operations
- Can be confusing (leaf vs composite)

## 🚀 Next Steps

Now that you understand Composite:
- ✅ Learn [Proxy Pattern](./05-proxy.md) - Control access to objects
- ✅ Or review [Structural Patterns Overview](./README.md)

---

**Remember:** Use Composite when you need to work with tree structures uniformly! 🎯

