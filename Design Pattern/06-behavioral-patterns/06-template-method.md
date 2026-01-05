# Template Method Pattern

## 🎯 What Problem Does It Solve?

**Problem:** You have an algorithm with **fixed steps**, but some steps can have **different implementations**. You want to define the skeleton of the algorithm and let subclasses override specific steps.

### Real-World Examples:
- Data processing pipeline (fetch → process → save)
- Build process (compile → test → package → deploy)
- Report generation (fetch data → format → export)
- App installation (download → verify → install → configure)
- Payment processing (validate → process → notify)

## 😵 Why Current Code Is Bad

### Without Template Method (Problematic):

```javascript
// ❌ Bad: Code duplication
class PDFReport {
  generate() {
    const data = this.fetchData();
    const formatted = this.formatForPDF(data);
    this.saveAsPDF(formatted);
  }
  
  fetchData() { /* ... */ }
  formatForPDF(data) { /* ... */ }
  saveAsPDF(data) { /* ... */ }
}

class ExcelReport {
  generate() {
    const data = this.fetchData(); // Duplicated!
    const formatted = this.formatForExcel(data);
    this.saveAsExcel(formatted);
  }
  
  fetchData() { /* ... */ } // Duplicated!
  formatForExcel(data) { /* ... */ }
  saveAsExcel(data) { /* ... */ }
}

// Problem: Algorithm steps duplicated!
// Problem: If algorithm changes, must update all classes!
```

**Problems:**
- Code duplication
- Algorithm scattered across classes
- Hard to maintain
- Violates DRY principle

## ✅ Template Method Pattern Solution

**Define the skeleton of an algorithm in an operation, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.**

### Structure:

```
┌──────────────┐
│  Abstract    │
│   Class      │
├──────────────┤
│ + template() │
│ # step1()    │
│ # step2()    │
│ # step3()    │
└──────┬───────┘
       │
   ┌───┴────┐
   │        │
┌──▼──┐  ┌──▼──┐
│Class1│  │Class2│
└──────┘  └──────┘
```

### Implementation:

```javascript
// ✅ Good: Template Method Pattern

// Step 1: Abstract class with template method
class ReportGenerator {
  // Template method - defines algorithm skeleton
  generate() {
    const data = this.fetchData();
    const formatted = this.format(data);
    this.save(formatted);
    this.notify();
  }
  
  // Steps that subclasses must implement
  fetchData() {
    throw new Error('Must implement fetchData()');
  }
  
  format(data) {
    throw new Error('Must implement format()');
  }
  
  save(data) {
    throw new Error('Must implement save()');
  }
  
  // Hook method (optional step)
  notify() {
    // Default: do nothing
    // Subclasses can override if needed
  }
}

// Step 2: Concrete implementations
class PDFReport extends ReportGenerator {
  fetchData() {
    console.log('Fetching data from database...');
    return { users: 100, sales: 50000 };
  }
  
  format(data) {
    console.log('Formatting data for PDF...');
    return `PDF Report: ${JSON.stringify(data)}`;
  }
  
  save(data) {
    console.log(`Saving PDF: ${data}`);
  }
}

class ExcelReport extends ReportGenerator {
  fetchData() {
    console.log('Fetching data from API...');
    return { users: 200, sales: 75000 };
  }
  
  format(data) {
    console.log('Formatting data for Excel...');
    return `Excel Report: ${JSON.stringify(data)}`;
  }
  
  save(data) {
    console.log(`Saving Excel: ${data}`);
  }
  
  // Override hook method
  notify() {
    console.log('Sending email notification...');
  }
}

// Usage
const pdfReport = new PDFReport();
pdfReport.generate();
// Fetching data from database...
// Formatting data for PDF...
// Saving PDF: ...

const excelReport = new ExcelReport();
excelReport.generate();
// Fetching data from API...
// Formatting data for Excel...
// Saving Excel: ...
// Sending email notification...
```

## 🧠 Real-World Analogy

**Think of a recipe:**
- **Template**: The recipe steps (mix → bake → cool → serve)
- **Concrete implementations**: Different recipes (chocolate cake, vanilla cake)
- Each recipe follows the **same steps**, but with **different ingredients**
- The **structure is fixed**, but **details vary**

## 💻 Complete Example: Build Process

```javascript
// Abstract class
class BuildProcess {
  build() {
    this.prepare();
    this.compile();
    this.test();
    this.package();
    this.deploy();
  }
  
  prepare() {
    throw new Error('Must implement prepare()');
  }
  
  compile() {
    throw new Error('Must implement compile()');
  }
  
  test() {
    throw new Error('Must implement test()');
  }
  
  package() {
    throw new Error('Must implement package()');
  }
  
  deploy() {
    throw new Error('Must implement deploy()');
  }
}

// Concrete implementations
class JavaScriptBuild extends BuildProcess {
  prepare() {
    console.log('[JS] Installing npm dependencies...');
  }
  
  compile() {
    console.log('[JS] Transpiling TypeScript to JavaScript...');
  }
  
  test() {
    console.log('[JS] Running Jest tests...');
  }
  
  package() {
    console.log('[JS] Creating npm package...');
  }
  
  deploy() {
    console.log('[JS] Deploying to npm registry...');
  }
}

class JavaBuild extends BuildProcess {
  prepare() {
    console.log('[Java] Downloading Maven dependencies...');
  }
  
  compile() {
    console.log('[Java] Compiling Java source files...');
  }
  
  test() {
    console.log('[Java] Running JUnit tests...');
  }
  
  package() {
    console.log('[Java] Creating JAR file...');
  }
  
  deploy() {
    console.log('[Java] Deploying to Maven repository...');
  }
}

// Usage
const jsBuild = new JavaScriptBuild();
jsBuild.build();

const javaBuild = new JavaBuild();
javaBuild.build();
```

### Real-World Example: Payment Processing

```javascript
class PaymentProcessor {
  process(amount) {
    this.validate(amount);
    const result = this.executePayment(amount);
    this.logTransaction(result);
    this.notify(result);
    return result;
  }
  
  validate(amount) {
    if (amount <= 0) {
      throw new Error('Invalid amount');
    }
  }
  
  executePayment(amount) {
    throw new Error('Must implement executePayment()');
  }
  
  logTransaction(result) {
    console.log(`[LOG] Transaction: ${JSON.stringify(result)}`);
  }
  
  notify(result) {
    // Hook method - optional
  }
}

class CreditCardProcessor extends PaymentProcessor {
  executePayment(amount) {
    console.log(`Processing $${amount} via Credit Card...`);
    return {
      success: true,
      method: 'creditcard',
      amount: amount,
      transactionId: 'CC-' + Date.now()
    };
  }
  
  notify(result) {
    console.log('Sending email receipt...');
  }
}

class PayPalProcessor extends PaymentProcessor {
  executePayment(amount) {
    console.log(`Processing $${amount} via PayPal...`);
    return {
      success: true,
      method: 'paypal',
      amount: amount,
      transactionId: 'PP-' + Date.now()
    };
  }
}

// Usage
const ccProcessor = new CreditCardProcessor();
ccProcessor.process(100);

const ppProcessor = new PayPalProcessor();
ppProcessor.process(200);
```

## 🎯 When to Use Template Method Pattern

### ✅ Good Use Cases:
1. **Fixed Algorithm Steps** - Same steps, different implementations
2. **Code Reuse** - Share common algorithm structure
3. **Framework Development** - Define hooks for customization
4. **Build Processes** - Same steps, different tools
5. **Data Processing** - Same pipeline, different processors

### ❌ When NOT to Use

1. **Simple Algorithms** - If algorithm is simple, might be overkill
2. **No Common Structure** - If steps vary too much
3. **Performance Critical** - Template method adds abstraction

## 🔄 Template Method vs Strategy

| Aspect | Template Method | Strategy |
|--------|----------------|----------|
| **Structure** | Fixed steps, variable implementations | Completely different algorithms |
| **Inheritance** | Uses inheritance | Uses composition |
| **Flexibility** | Less flexible (fixed structure) | More flexible (any algorithm) |

## 📊 Pros and Cons

### ✅ Pros:
- Code reuse
- Defines algorithm structure
- Easy to add new implementations
- DRY principle
- Inversion of Control

### ❌ Cons:
- Less flexible than Strategy
- Requires inheritance
- Can be complex

## 🚀 Next Steps

Now that you understand Template Method:
- ✅ Learn [Mediator Pattern](./07-mediator.md) - Centralized communication
- ✅ Or review [Behavioral Patterns Overview](./README.md)

---

**Remember:** Use Template Method when you have a fixed algorithm structure with variable implementations! 🎯

