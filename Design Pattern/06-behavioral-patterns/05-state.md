# State Pattern

## 🎯 What Problem Does It Solve?

**Problem:** An object's behavior changes based on its **internal state**, and you want to avoid large if-else statements checking the state.

### Real-World Examples:
- Vending machine (idle → selecting → dispensing)
- Order status (pending → processing → shipped → delivered)
- Media player (stopped → playing → paused)
- Game character (idle → running → jumping → attacking)
- Traffic light (red → yellow → green)

## 😵 Why Current Code Is Bad

### Without State (Problematic):

```javascript
// ❌ Bad: If-else based on state
class MediaPlayer {
  constructor() {
    this.state = 'stopped'; // 'stopped', 'playing', 'paused'
  }
  
  play() {
    if (this.state === 'stopped') {
      this.state = 'playing';
      console.log('Playing...');
    } else if (this.state === 'paused') {
      this.state = 'playing';
      console.log('Resuming...');
    } else if (this.state === 'playing') {
      console.log('Already playing');
    }
  }
  
  pause() {
    if (this.state === 'playing') {
      this.state = 'paused';
      console.log('Paused');
    } else if (this.state === 'stopped') {
      console.log('Cannot pause - not playing');
    } else if (this.state === 'paused') {
      console.log('Already paused');
    }
  }
  
  stop() {
    if (this.state === 'playing' || this.state === 'paused') {
      this.state = 'stopped';
      console.log('Stopped');
    } else {
      console.log('Already stopped');
    }
  }
}

// Problems:
// - Large if-else statements
// - Hard to add new states
// - Violates Open/Closed Principle
// - State logic scattered
// - Hard to test
```

**Problems:**
- Large if-else statements
- Hard to add new states
- Violates Open/Closed Principle
- State logic scattered
- Hard to test and maintain

## ✅ State Pattern Solution

**Allow an object to alter its behavior when its internal state changes. The object will appear to change its class.**

### Structure:

```
┌──────────┐
│ Context  │
├──────────┤
│ - state  │
│ + request()│
└────┬─────┘
     │
     │ delegates to
     │
┌────▼──────────┐
│    State     │
├──────────────┤
│ + handle()   │
└────┬─────────┘
     │
  ┌──┴──────────────────┐
  │                     │
┌─▼────┐  ┌────────┐  ┌─▼────┐
│State1│  │State2  │  │State3│
└──────┘  └────────┘  └──────┘
```

### Implementation:

```javascript
// ✅ Good: State Pattern

// Step 1: State interface
class PlayerState {
  play(player) {
    throw new Error('Must implement play()');
  }
  
  pause(player) {
    throw new Error('Must implement pause()');
  }
  
  stop(player) {
    throw new Error('Must implement stop()');
  }
}

// Step 2: Concrete states
class StoppedState extends PlayerState {
  play(player) {
    console.log('Starting playback...');
    player.setState(new PlayingState());
  }
  
  pause(player) {
    console.log('Cannot pause - not playing');
  }
  
  stop(player) {
    console.log('Already stopped');
  }
}

class PlayingState extends PlayerState {
  play(player) {
    console.log('Already playing');
  }
  
  pause(player) {
    console.log('Pausing playback...');
    player.setState(new PausedState());
  }
  
  stop(player) {
    console.log('Stopping playback...');
    player.setState(new StoppedState());
  }
}

class PausedState extends PlayerState {
  play(player) {
    console.log('Resuming playback...');
    player.setState(new PlayingState());
  }
  
  pause(player) {
    console.log('Already paused');
  }
  
  stop(player) {
    console.log('Stopping playback...');
    player.setState(new StoppedState());
  }
}

// Step 3: Context
class MediaPlayer {
  constructor() {
    this.state = new StoppedState();
  }
  
  setState(state) {
    this.state = state;
  }
  
  play() {
    this.state.play(this);
  }
  
  pause() {
    this.state.pause(this);
  }
  
  stop() {
    this.state.stop(this);
  }
}

// Usage
const player = new MediaPlayer();

player.play();   // Starting playback...
player.pause();  // Pausing playback...
player.play();   // Resuming playback...
player.stop();   // Stopping playback...
player.pause();  // Cannot pause - not playing
```

## 🧠 Real-World Analogy

**Think of a traffic light:**
- **Red state**: Stop, can't go
- **Yellow state**: Prepare to stop
- **Green state**: Go
- Each state has **different behavior**
- The light **transitions** between states
- Behavior is **encapsulated** in each state

## 💻 Complete Example: Order Processing

```javascript
// State interface
class OrderState {
  process(order) {
    throw new Error('Must implement process()');
  }
  
  cancel(order) {
    throw new Error('Must implement cancel()');
  }
  
  ship(order) {
    throw new Error('Must implement ship()');
  }
  
  deliver(order) {
    throw new Error('Must implement deliver()');
  }
}

// Concrete states
class PendingState extends OrderState {
  process(order) {
    console.log('Processing order...');
    order.setState(new ProcessingState());
  }
  
  cancel(order) {
    console.log('Cancelling order...');
    order.setState(new CancelledState());
  }
  
  ship(order) {
    console.log('Cannot ship - order not processed');
  }
  
  deliver(order) {
    console.log('Cannot deliver - order not shipped');
  }
}

class ProcessingState extends OrderState {
  process(order) {
    console.log('Order already being processed');
  }
  
  cancel(order) {
    console.log('Cannot cancel - order is being processed');
  }
  
  ship(order) {
    console.log('Shipping order...');
    order.setState(new ShippedState());
  }
  
  deliver(order) {
    console.log('Cannot deliver - order not shipped');
  }
}

class ShippedState extends OrderState {
  process(order) {
    console.log('Order already shipped');
  }
  
  cancel(order) {
    console.log('Cannot cancel - order already shipped');
  }
  
  ship(order) {
    console.log('Order already shipped');
  }
  
  deliver(order) {
    console.log('Delivering order...');
    order.setState(new DeliveredState());
  }
}

class DeliveredState extends OrderState {
  process(order) {
    console.log('Order already delivered');
  }
  
  cancel(order) {
    console.log('Cannot cancel - order already delivered');
  }
  
  ship(order) {
    console.log('Order already delivered');
  }
  
  deliver(order) {
    console.log('Order already delivered');
  }
}

class CancelledState extends OrderState {
  process(order) {
    console.log('Cannot process - order cancelled');
  }
  
  cancel(order) {
    console.log('Order already cancelled');
  }
  
  ship(order) {
    console.log('Cannot ship - order cancelled');
  }
  
  deliver(order) {
    console.log('Cannot deliver - order cancelled');
  }
}

// Context
class Order {
  constructor(id) {
    this.id = id;
    this.state = new PendingState();
  }
  
  setState(state) {
    this.state = state;
  }
  
  process() {
    this.state.process(this);
  }
  
  cancel() {
    this.state.cancel(this);
  }
  
  ship() {
    this.state.ship(this);
  }
  
  deliver() {
    this.state.deliver(this);
  }
  
  getStatus() {
    return this.state.constructor.name.replace('State', '');
  }
}

// Usage
const order = new Order('ORD-123');

console.log(`Order status: ${order.getStatus()}`); // Pending

order.process();
console.log(`Order status: ${order.getStatus()}`); // Processing

order.ship();
console.log(`Order status: ${order.getStatus()}`); // Shipped

order.deliver();
console.log(`Order status: ${order.getStatus()}`); // Delivered

// Try invalid transition
order.cancel(); // Cannot cancel - order already delivered
```

## 🎯 When to Use State Pattern

### ✅ Good Use Cases:
1. **State Machines** - Objects with clear states
2. **Behavior Changes** - Behavior depends on state
3. **Complex State Logic** - Many if-else statements
4. **State Transitions** - Clear state transitions
5. **Game Development** - Character states, game states

### ❌ When NOT to Use

1. **Simple States** - If only 2-3 states, might be overkill
2. **No Behavior Change** - If behavior doesn't change with state
3. **Performance Critical** - State objects add overhead

## 🔄 State vs Strategy

| Aspect | State | Strategy |
|--------|-------|----------|
| **Purpose** | Behavior changes with state | Interchangeable algorithms |
| **Change** | Automatic (state transitions) | Manual (client chooses) |
| **Context** | Object's internal state | External algorithm selection |

## 📊 Pros and Cons

### ✅ Pros:
- Eliminates if-else statements
- Easy to add new states
- State logic encapsulated
- Clear state transitions
- Open/Closed Principle

### ❌ Cons:
- More classes
- Can be complex
- State transitions must be clear

## 🚀 Next Steps

Now that you understand State:
- ✅ Learn [Template Method Pattern](./06-template-method.md) - Algorithm skeleton
- ✅ Or review [Behavioral Patterns Overview](./README.md)

---

**Remember:** Use State when object behavior changes based on internal state! 🎯

