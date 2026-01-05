# Strategy Pattern

## 🎯 What Problem Does It Solve?

**Problem:** You have multiple ways to perform a task (algorithms), and you want to **choose which one to use at runtime** without using if-else chains.

### Real-World Examples:
- Payment processing (Credit Card, PayPal, Stripe)
- Sorting algorithms (QuickSort, MergeSort, BubbleSort)
- Compression algorithms (ZIP, RAR, 7Z)
- Navigation (Driving, Walking, Public Transport)
- Discount calculations (Percentage, Fixed, Buy-One-Get-One)

## 😵 Why Current Code Is Bad

### Without Strategy (Problematic):

```javascript
// ❌ Bad: If-else chain
class PaymentProcessor {
  processPayment(amount, method) {
    if (method === 'creditcard') {
      console.log('Processing credit card payment...');
      // Credit card logic
      return { success: true, method: 'creditcard' };
    } else if (method === 'paypal') {
      console.log('Processing PayPal payment...');
      // PayPal logic
      return { success: true, method: 'paypal' };
    } else if (method === 'stripe') {
      console.log('Processing Stripe payment...');
      // Stripe logic
      return { success: true, method: 'stripe' };
    } else {
      throw new Error('Unknown payment method');
    }
  }
}

// Problems:
// - Violates Open/Closed Principle (need to modify for new methods)
// - Hard to test
// - Code duplication
// - Tight coupling
// - Hard to maintain
```

**Problems:**
- Violates Open/Closed Principle
- Hard to test each algorithm separately
- Code duplication
- Tight coupling
- Hard to maintain and extend

## ✅ Strategy Pattern Solution

**Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it.**

### Structure:

```
┌──────────┐
│ Context  │
├──────────┤
│ - strategy│
│ + execute()│
└────┬─────┘
     │
     │ uses
     │
┌────▼──────────┐
│   Strategy    │
├───────────────┤
│ + algorithm() │
└────┬──────────┘
     │
  ┌──┴────────────────────┐
  │                       │
┌─▼────┐  ┌────────┐  ┌───▼──┐
│Strat1│  │Strat2  │  │Strat3│
└──────┘  └────────┘  └──────┘
```

### Implementation:

```javascript
// ✅ Good: Strategy Pattern

// Step 1: Strategy interface
class PaymentStrategy {
  pay(amount) {
    throw new Error('Must implement pay()');
  }
}

// Step 2: Concrete strategies
class CreditCardStrategy extends PaymentStrategy {
  pay(amount) {
    console.log(`Processing $${amount} via Credit Card`);
    return {
      success: true,
      method: 'creditcard',
      amount: amount
    };
  }
}

class PayPalStrategy extends PaymentStrategy {
  pay(amount) {
    console.log(`Processing $${amount} via PayPal`);
    return {
      success: true,
      method: 'paypal',
      amount: amount
    };
  }
}

class StripeStrategy extends PaymentStrategy {
  pay(amount) {
    console.log(`Processing $${amount} via Stripe`);
    return {
      success: true,
      method: 'stripe',
      amount: amount
    };
  }
}

// Step 3: Context
class PaymentProcessor {
  constructor(strategy) {
    this.strategy = strategy;
  }
  
  setStrategy(strategy) {
    this.strategy = strategy;
  }
  
  processPayment(amount) {
    if (!this.strategy) {
      throw new Error('Payment strategy not set');
    }
    return this.strategy.pay(amount);
  }
}

// Usage
const processor = new PaymentProcessor(new CreditCardStrategy());
processor.processPayment(100);

// Change strategy at runtime!
processor.setStrategy(new PayPalStrategy());
processor.processPayment(200);

processor.setStrategy(new StripeStrategy());
processor.processPayment(300);
```

## 🧠 Real-World Analogy

**Think of navigation apps:**
- You want to go from Point A to Point B
- Different **strategies**: Driving, Walking, Public Transport
- You **choose the strategy** based on your needs
- The app uses the **selected strategy** to calculate the route
- You can **switch strategies** anytime

## 💻 Complete Example: Sorting Algorithms

```javascript
// Strategy interface
class SortStrategy {
  sort(array) {
    throw new Error('Must implement sort()');
  }
}

// Concrete strategies
class QuickSortStrategy extends SortStrategy {
  sort(array) {
    console.log('Using QuickSort algorithm');
    // QuickSort implementation
    return [...array].sort((a, b) => a - b);
  }
}

class MergeSortStrategy extends SortStrategy {
  sort(array) {
    console.log('Using MergeSort algorithm');
    // MergeSort implementation
    return [...array].sort((a, b) => a - b);
  }
}

class BubbleSortStrategy extends SortStrategy {
  sort(array) {
    console.log('Using BubbleSort algorithm');
    // BubbleSort implementation
    return [...array].sort((a, b) => a - b);
  }
}

// Context
class Sorter {
  constructor(strategy) {
    this.strategy = strategy;
  }
  
  setStrategy(strategy) {
    this.strategy = strategy;
  }
  
  sort(array) {
    return this.strategy.sort(array);
  }
}

// Usage
const numbers = [64, 34, 25, 12, 22, 11, 90];

const sorter = new Sorter(new QuickSortStrategy());
console.log(sorter.sort(numbers));

// Switch to different algorithm
sorter.setStrategy(new MergeSortStrategy());
console.log(sorter.sort(numbers));
```

### Real-World Example: E-commerce Discounts

```javascript
// Strategy interface
class DiscountStrategy {
  calculate(price) {
    throw new Error('Must implement calculate()');
  }
}

// Concrete strategies
class PercentageDiscountStrategy extends DiscountStrategy {
  constructor(percentage) {
    super();
    this.percentage = percentage;
  }
  
  calculate(price) {
    const discount = price * (this.percentage / 100);
    return {
      originalPrice: price,
      discount: discount,
      finalPrice: price - discount,
      type: `Percentage (${this.percentage}%)`
    };
  }
}

class FixedDiscountStrategy extends DiscountStrategy {
  constructor(amount) {
    super();
    this.amount = amount;
  }
  
  calculate(price) {
    const discount = Math.min(this.amount, price);
    return {
      originalPrice: price,
      discount: discount,
      finalPrice: price - discount,
      type: `Fixed ($${this.amount})`
    };
  }
}

class BuyOneGetOneStrategy extends DiscountStrategy {
  calculate(price) {
    return {
      originalPrice: price,
      discount: price, // Get second item free
      finalPrice: price,
      type: 'Buy One Get One Free'
    };
  }
}

// Context
class PricingCalculator {
  constructor(strategy) {
    this.strategy = strategy;
  }
  
  setDiscountStrategy(strategy) {
    this.strategy = strategy;
  }
  
  calculatePrice(originalPrice) {
    return this.strategy.calculate(originalPrice);
  }
}

// Usage
const calculator = new PricingCalculator(new PercentageDiscountStrategy(20));
const result1 = calculator.calculatePrice(100);
console.log(result1);
// { originalPrice: 100, discount: 20, finalPrice: 80, type: 'Percentage (20%)' }

calculator.setDiscountStrategy(new FixedDiscountStrategy(15));
const result2 = calculator.calculatePrice(100);
console.log(result2);
// { originalPrice: 100, discount: 15, finalPrice: 85, type: 'Fixed ($15)' }

calculator.setDiscountStrategy(new BuyOneGetOneStrategy());
const result3 = calculator.calculatePrice(50);
console.log(result3);
// { originalPrice: 50, discount: 50, finalPrice: 50, type: 'Buy One Get One Free' }
```

## 🎯 When to Use Strategy Pattern

### ✅ Good Use Cases:
1. **Multiple Algorithms** - Different ways to do the same thing
2. **Runtime Selection** - Choose algorithm at runtime
3. **Avoid If-Else Chains** - Replace conditional logic
4. **Algorithm Variations** - Many variations of an algorithm
5. **Testing** - Easy to test each strategy separately

### ❌ When NOT to Use

1. **Simple Cases** - If only one way to do something
2. **Few Algorithms** - If only 2-3 options, if-else might be simpler
3. **Performance Critical** - Strategy adds small overhead

## 🔄 Strategy vs Other Patterns

| Pattern | Purpose | Use When |
|---------|---------|----------|
| **Strategy** | Interchangeable algorithms | Multiple ways to do same thing |
| **State** | Behavior changes with state | Object behavior depends on state |
| **Template Method** | Algorithm skeleton | Fixed steps, variable implementations |

## 📊 Pros and Cons

### ✅ Pros:
- Eliminates if-else chains
- Easy to add new strategies
- Open/Closed Principle
- Easy to test
- Runtime algorithm selection
- Single Responsibility

### ❌ Cons:
- More classes
- Clients must know strategies exist
- Can be overkill for simple cases

## 🚀 Next Steps

Now that you understand Strategy:
- ✅ Learn [Observer Pattern](./02-observer.md) - For event-driven communication
- ✅ Or review [Behavioral Patterns Overview](./README.md)

---

**Remember:** Use Strategy to replace if-else chains with interchangeable algorithms! 🎯

