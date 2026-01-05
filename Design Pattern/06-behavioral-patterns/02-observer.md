# Observer Pattern

## 🎯 What Problem Does It Solve?

**Problem:** You need to notify multiple objects when something happens, without tightly coupling them together.

### Real-World Examples:
- Event systems (button clicks, form submissions)
- Notifications (email, SMS, push notifications)
- Model-View architecture (UI updates when data changes)
- Stock market updates (notify all investors)
- Social media feeds (notify followers of new posts)

## 😵 Why Current Code Is Bad

### Without Observer (Problematic):

```javascript
// ❌ Bad: Tight coupling
class NewsPublisher {
  constructor() {
    this.subscribers = []; // Hard-coded list
  }
  
  publishNews(news) {
    console.log(`Publishing: ${news}`);
    
    // Problem: Must know about all subscribers
    this.emailSubscriber.notify(news);
    this.smsSubscriber.notify(news);
    this.pushSubscriber.notify(news);
    
    // What if we want to add a new subscriber?
    // Must modify this class!
  }
}

// Problems:
// - Tight coupling
// - Hard to add/remove subscribers
// - Violates Open/Closed Principle
// - Publisher must know about all subscribers
```

**Problems:**
- Tight coupling between publisher and subscribers
- Hard to add/remove subscribers dynamically
- Violates Open/Closed Principle
- Publisher must know about all subscribers

## ✅ Observer Pattern Solution

**Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.**

### Structure:

```
┌──────────────┐
│   Subject    │
├──────────────┤
│ + attach()   │
│ + detach()   │
│ + notify()   │
└──────┬───────┘
       │
       │ notifies
       │
┌──────▼──────────┐
│    Observer     │
├─────────────────┤
│ + update()      │
└────┬────────────┘
     │
  ┌──┴──────────────────┐
  │                     │
┌─▼────┐  ┌────────┐  ┌─▼────┐
│Obs1  │  │Obs2    │  │Obs3  │
└──────┘  └────────┘  └──────┘
```

### Implementation:

```javascript
// ✅ Good: Observer Pattern

// Step 1: Subject (Observable)
class NewsPublisher {
  constructor() {
    this.subscribers = [];
    this.news = null;
  }
  
  attach(observer) {
    this.subscribers.push(observer);
  }
  
  detach(observer) {
    const index = this.subscribers.indexOf(observer);
    if (index > -1) {
      this.subscribers.splice(index, 1);
    }
  }
  
  notify() {
    this.subscribers.forEach(observer => {
      observer.update(this.news);
    });
  }
  
  setNews(news) {
    this.news = news;
    this.notify(); // Notify all observers
  }
}

// Step 2: Observer interface
class Observer {
  update(news) {
    throw new Error('Must implement update()');
  }
}

// Step 3: Concrete observers
class EmailSubscriber extends Observer {
  constructor(email) {
    super();
    this.email = email;
  }
  
  update(news) {
    console.log(`📧 Sending email to ${this.email}: ${news}`);
  }
}

class SMSSubscriber extends Observer {
  constructor(phone) {
    super();
    this.phone = phone;
  }
  
  update(news) {
    console.log(`📱 Sending SMS to ${this.phone}: ${news}`);
  }
}

class PushSubscriber extends Observer {
  constructor(userId) {
    super();
    this.userId = userId;
  }
  
  update(news) {
    console.log(`🔔 Sending push notification to user ${this.userId}: ${news}`);
  }
}

// Usage
const publisher = new NewsPublisher();

const emailSub = new EmailSubscriber('user@example.com');
const smsSub = new SMSSubscriber('+1234567890');
const pushSub = new PushSubscriber('user123');

// Subscribe
publisher.attach(emailSub);
publisher.attach(smsSub);
publisher.attach(pushSub);

// Publish news - all subscribers notified!
publisher.setNews('Breaking: New product launched!');

// Unsubscribe
publisher.detach(smsSub);

// Publish again - only email and push notified
publisher.setNews('Update: Product features added');
```

## 🧠 Real-World Analogy

**Think of a YouTube channel:**
- **Channel** (Subject) publishes videos
- **Subscribers** (Observers) get notified when new video is uploaded
- Subscribers can **subscribe/unsubscribe** anytime
- Channel doesn't need to know who subscribes
- When video is published, **all subscribers** are notified automatically

## 💻 Complete Example: Stock Market

```javascript
// Subject
class StockMarket {
  constructor() {
    this.observers = [];
    this.stocks = {};
  }
  
  attach(observer) {
    this.observers.push(observer);
  }
  
  detach(observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }
  
  notify(stockSymbol, price) {
    this.observers.forEach(observer => {
      observer.update(stockSymbol, price);
    });
  }
  
  updateStockPrice(symbol, price) {
    this.stocks[symbol] = price;
    this.notify(symbol, price);
  }
}

// Observer interface
class StockObserver {
  update(symbol, price) {
    throw new Error('Must implement update()');
  }
}

// Concrete observers
class Investor extends StockObserver {
  constructor(name, symbol, targetPrice) {
    super();
    this.name = name;
    this.symbol = symbol;
    this.targetPrice = targetPrice;
  }
  
  update(symbol, price) {
    if (symbol === this.symbol) {
      console.log(`📊 ${this.name}: ${symbol} is now $${price}`);
      
      if (price >= this.targetPrice) {
        console.log(`💰 ${this.name}: Target price reached! Consider selling.`);
      }
    }
  }
}

class Trader extends StockObserver {
  constructor(name) {
    super();
    this.name = name;
    this.watchlist = [];
  }
  
  addToWatchlist(symbol) {
    this.watchlist.push(symbol);
  }
  
  update(symbol, price) {
    if (this.watchlist.includes(symbol)) {
      console.log(`📈 ${this.name}: ${symbol} updated to $${price}`);
    }
  }
}

// Usage
const market = new StockMarket();

const investor1 = new Investor('John', 'AAPL', 150);
const investor2 = new Investor('Jane', 'GOOGL', 2500);
const trader = new Trader('Bob');
trader.addToWatchlist('AAPL');
trader.addToWatchlist('GOOGL');

market.attach(investor1);
market.attach(investor2);
market.attach(trader);

// Update prices - all observers notified!
market.updateStockPrice('AAPL', 145);
market.updateStockPrice('GOOGL', 2450);
market.updateStockPrice('AAPL', 150); // John's target reached!
```

### Modern JavaScript: Using Events

```javascript
// Modern approach using EventEmitter pattern
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
}

// Usage
const eventEmitter = new EventEmitter();

eventEmitter.on('user-login', (user) => {
  console.log(`📧 Sending welcome email to ${user.email}`);
});

eventEmitter.on('user-login', (user) => {
  console.log(`📱 Sending SMS to ${user.phone}`);
});

eventEmitter.on('user-login', (user) => {
  console.log(`🔔 Sending push notification to ${user.id}`);
});

// Trigger event
eventEmitter.emit('user-login', { 
  id: '123', 
  email: 'user@example.com', 
  phone: '+1234567890' 
});
```

## 🎯 When to Use Observer Pattern

### ✅ Good Use Cases:
1. **Event Systems** - User interactions, system events
2. **Notifications** - Multiple notification channels
3. **Model-View** - UI updates when data changes
4. **Pub-Sub Systems** - Publish-subscribe architecture
5. **Decoupling** - Reduce coupling between components

### ❌ When NOT to Use

1. **Simple Notifications** - If only one observer, might be overkill
2. **Performance Critical** - Many observers can be slow
3. **Circular Dependencies** - Can cause issues

## 🔄 Observer vs Other Patterns

| Pattern | Purpose | Use When |
|---------|---------|----------|
| **Observer** | One-to-many notifications | Need to notify multiple objects |
| **Mediator** | Centralized communication | Complex many-to-many communication |
| **Chain of Responsibility** | Request handling chain | Sequential request processing |

## 📊 Pros and Cons

### ✅ Pros:
- Loose coupling
- Dynamic relationships
- Broadcast communication
- Open/Closed Principle
- Easy to add/remove observers

### ❌ Cons:
- Unexpected updates (hard to track)
- Performance (many observers)
- Memory leaks (if not detached)
- Order of notifications matters

## 🚀 Next Steps

Now that you understand Observer:
- ✅ Learn [Command Pattern](./03-command.md) - Encapsulate requests
- ✅ Or learn [Chain of Responsibility](./04-chain-of-responsibility.md) - Request handling chain

---

**Remember:** Use Observer when you need to notify multiple objects without tight coupling! 🎯

