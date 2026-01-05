# Iterator Pattern

## 🎯 What Problem Does It Solve?

**Problem:** You need to **traverse a collection** without exposing its internal structure, and you want a **uniform way** to iterate over different types of collections.

### Real-World Examples:
- Iterating over arrays, lists, trees
- Database result sets
- File system traversal
- Social media feeds (posts, comments)
- Menu items traversal

## 😵 Why Current Code Is Bad

### Without Iterator (Problematic):

```javascript
// ❌ Bad: Exposing internal structure
class BookCollection {
  constructor() {
    this.books = [];
  }
  
  add(book) {
    this.books.push(book);
  }
  
  // Problem: Client must know about array structure
  getBooks() {
    return this.books; // Exposes internal structure!
  }
}

// Usage
const collection = new BookCollection();
collection.add('Book 1');
collection.add('Book 2');

// Client must know it's an array
const books = collection.getBooks();
for (let i = 0; i < books.length; i++) {
  console.log(books[i]);
}

// What if we change to a different data structure?
// All client code breaks!
```

**Problems:**
- Exposes internal structure
- Client code depends on implementation
- Hard to change data structure
- Different collections need different iteration code

## ✅ Iterator Pattern Solution

**Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation.**

### Structure:

```
┌──────────┐
│ Aggregate│
├──────────┤
│+iterator()│
└────┬─────┘
     │
     │ creates
     │
┌────▼──────────┐
│   Iterator    │
├───────────────┤
│ + next()      │
│ + hasNext()    │
└───────────────┘
```

### Implementation:

```javascript
// ✅ Good: Iterator Pattern

// Step 1: Iterator interface
class Iterator {
  next() {
    throw new Error('Must implement next()');
  }
  
  hasNext() {
    throw new Error('Must implement hasNext()');
  }
}

// Step 2: Concrete iterator
class BookIterator extends Iterator {
  constructor(books) {
    super();
    this.books = books;
    this.index = 0;
  }
  
  next() {
    if (this.hasNext()) {
      return this.books[this.index++];
    }
    return null;
  }
  
  hasNext() {
    return this.index < this.books.length;
  }
}

// Step 3: Aggregate interface
class Aggregate {
  createIterator() {
    throw new Error('Must implement createIterator()');
  }
}

// Step 4: Concrete aggregate
class BookCollection extends Aggregate {
  constructor() {
    super();
    this.books = [];
  }
  
  add(book) {
    this.books.push(book);
  }
  
  createIterator() {
    return new BookIterator(this.books);
  }
}

// Usage
const collection = new BookCollection();
collection.add('Book 1');
collection.add('Book 2');
collection.add('Book 3');

const iterator = collection.createIterator();

while (iterator.hasNext()) {
  console.log(iterator.next());
}
// Book 1
// Book 2
// Book 3
```

## 🧠 Real-World Analogy

**Think of a TV remote:**
- You have a **collection of channels** (aggregate)
- The **remote control** (iterator) lets you navigate
- You can go **next** or **previous**
- You don't need to know how channels are stored
- Same remote works for different TV models

## 💻 Complete Example: Tree Iterator

```javascript
// Node class
class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
  
  addChild(node) {
    this.children.push(node);
  }
}

// Iterator interface
class TreeIterator {
  next() {
    throw new Error('Must implement next()');
  }
  
  hasNext() {
    throw new Error('Must implement hasNext()');
  }
}

// Depth-First Iterator
class DepthFirstIterator extends TreeIterator {
  constructor(root) {
    super();
    this.stack = [root];
  }
  
  next() {
    if (this.hasNext()) {
      const node = this.stack.pop();
      // Add children in reverse order (for correct traversal)
      for (let i = node.children.length - 1; i >= 0; i--) {
        this.stack.push(node.children[i]);
      }
      return node.value;
    }
    return null;
  }
  
  hasNext() {
    return this.stack.length > 0;
  }
}

// Breadth-First Iterator
class BreadthFirstIterator extends TreeIterator {
  constructor(root) {
    super();
    this.queue = [root];
  }
  
  next() {
    if (this.hasNext()) {
      const node = this.queue.shift();
      this.queue.push(...node.children);
      return node.value;
    }
    return null;
  }
  
  hasNext() {
    return this.queue.length > 0;
  }
}

// Tree class
class Tree {
  constructor(root) {
    this.root = root;
  }
  
  createIterator(type = 'depth') {
    if (type === 'depth') {
      return new DepthFirstIterator(this.root);
    } else if (type === 'breadth') {
      return new BreadthFirstIterator(this.root);
    }
  }
}

// Usage
const root = new TreeNode('A');
const b = new TreeNode('B');
const c = new TreeNode('C');
const d = new TreeNode('D');
const e = new TreeNode('E');

root.addChild(b);
root.addChild(c);
b.addChild(d);
b.addChild(e);

const tree = new Tree(root);

// Depth-first traversal
console.log('Depth-First:');
const dfIterator = tree.createIterator('depth');
while (dfIterator.hasNext()) {
  console.log(dfIterator.next());
}
// A, C, B, E, D

// Breadth-first traversal
console.log('Breadth-First:');
const bfIterator = tree.createIterator('breadth');
while (bfIterator.hasNext()) {
  console.log(bfIterator.next());
}
// A, B, C, D, E
```

### Modern JavaScript: Built-in Iterators

```javascript
// JavaScript has built-in iterator support!
class NumberRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  
  // Symbol.iterator makes it iterable
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    
    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { done: true };
      }
    };
  }
}

// Usage with for...of
const range = new NumberRange(1, 5);
for (const num of range) {
  console.log(num); // 1, 2, 3, 4, 5
}

// Works with spread operator
console.log([...range]); // [1, 2, 3, 4, 5]
```

## 🎯 When to Use Iterator Pattern

### ✅ Good Use Cases:
1. **Traverse Collections** - Arrays, lists, trees
2. **Hide Implementation** - Don't expose internal structure
3. **Multiple Iteration Methods** - Different ways to traverse
4. **Uniform Interface** - Same interface for different collections
5. **Lazy Evaluation** - Generate values on demand

### ❌ When NOT to Use

1. **Simple Collections** - If array iteration is enough
2. **Performance Critical** - Iterator adds overhead
3. **No Traversal Needed** - If you don't need to iterate

## 🔄 Iterator vs Other Patterns

| Pattern | Purpose | Use When |
|---------|---------|----------|
| **Iterator** | Traverse collections | Need to iterate without exposing structure |
| **Composite** | Tree structures | Need to work with tree uniformly |

## 📊 Pros and Cons

### ✅ Pros:
- Hides internal structure
- Uniform iteration interface
- Multiple iteration methods
- Lazy evaluation possible
- Single Responsibility

### ❌ Cons:
- Adds complexity
- Performance overhead
- Can be overkill for simple cases

## 🚀 Next Steps

Now that you understand Iterator:
- ✅ Learn [Memento Pattern](./09-memento.md) - Save/restore state
- ✅ Or review [Behavioral Patterns Overview](./README.md)

---

**Remember:** Use Iterator to traverse collections without exposing their structure! 🎯

