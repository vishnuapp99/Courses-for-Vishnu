const patterns = [
  // Creational Patterns
  {
    id: 'singleton',
    name: 'Singleton',
    category: 'creational',
    icon: 'bi-1-circle-fill',
    priority: 'High',
    description: 'Ensure a class has only one instance and provide global access to it.',
    problem: 'You need exactly one instance of a class throughout your application (e.g., database connection, logger).',
    solution: 'Create a class with a method that returns the same instance every time it\'s called.',
    analogy: 'Think of a company\'s CEO - there\'s only one CEO at a time, and everyone accesses the same CEO.',
    example: `class DatabaseConnection {
  static instance = null;
  
  static getInstance() {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }
}`,
    useCases: [
      'Database connections',
      'Logging systems',
      'Configuration managers',
      'Cache managers'
    ],
    pros: [
      'Ensures single instance',
      'Global access point',
      'Lazy initialization',
      'Saves memory'
    ],
    cons: [
      'Hard to test',
      'Hidden dependencies',
      'Global state',
      'Violates SRP'
    ]
  },
  {
    id: 'factory',
    name: 'Factory Method',
    category: 'creational',
    icon: 'bi-factory',
    priority: 'High',
    description: 'Create objects without specifying the exact class of object that will be created.',
    problem: 'You need to create objects, but don\'t want to specify the exact class (e.g., different user types, payment processors).',
    solution: 'Define an interface for creating objects, but let subclasses decide which class to instantiate.',
    analogy: 'Think of a car factory - you order a car by type (SUV, Sedan), and the factory decides which specific model to create.',
    example: `class UserFactory {
  static createUser(type, name) {
    switch(type) {
      case 'admin': return new AdminUser(name);
      case 'customer': return new CustomerUser(name);
      default: throw new Error('Unknown type');
    }
  }
}`,
    useCases: [
      'Creating different user types',
      'Payment processor selection',
      'Notification channels',
      'Database connections'
    ],
    pros: [
      'Reduces coupling',
      'Easy to extend',
      'Centralized creation',
      'Hides complexity'
    ],
    cons: [
      'Can be overkill',
      'Adds abstraction',
      'More classes'
    ]
  },
  {
    id: 'builder',
    name: 'Builder',
    category: 'creational',
    icon: 'bi-tools',
    priority: 'Medium',
    description: 'Construct complex objects step by step. Builder allows you to produce different types using the same construction code.',
    problem: 'Creating complex objects with many optional parameters is messy and hard to read.',
    solution: 'Separate the construction of a complex object from its representation.',
    analogy: 'Think of ordering a pizza - you build it step by step: choose size, crust, toppings, cheese. Each step is clear and optional.',
    example: `const user = new UserBuilder()
  .setName('John')
  .setEmail('john@example.com')
  .setAge(30)
  .build();`,
    useCases: [
      'SQL query building',
      'HTTP request construction',
      'Configuration objects',
      'Complex data structures'
    ],
    pros: [
      'Clear and readable',
      'Flexible parameters',
      'Step-by-step construction',
      'Method chaining'
    ],
    cons: [
      'More code',
      'Extra objects',
      'Can be overkill'
    ]
  },
  // Structural Patterns
  {
    id: 'adapter',
    name: 'Adapter',
    category: 'structural',
    icon: 'bi-plug',
    priority: 'High',
    description: 'Make incompatible interfaces work together.',
    problem: 'You have two incompatible interfaces that need to work together, and you can\'t modify the source code.',
    solution: 'Create an adapter that translates one interface to another.',
    analogy: 'Think of a travel adapter - your device has a US plug, the wall is European. The adapter makes them work together.',
    example: `class PaymentAdapter {
  constructor(oldSystem) {
    this.oldSystem = oldSystem;
  }
  
  process(amount) {
    return this.oldSystem.processPayment(amount);
  }
}`,
    useCases: [
      'Integrating third-party libraries',
      'Legacy code integration',
      'API versioning',
      'Data format conversion'
    ],
    pros: [
      'Makes incompatible work',
      'Reuses existing code',
      'Single Responsibility',
      'Open/Closed Principle'
    ],
    cons: [
      'Adds complexity',
      'Performance overhead',
      'Can be overused'
    ]
  },
  {
    id: 'decorator',
    name: 'Decorator',
    category: 'structural',
    icon: 'bi-gift',
    priority: 'High',
    description: 'Add functionality to objects dynamically without modifying their code.',
    problem: 'You want to add features to objects without using inheritance or modifying the base class.',
    solution: 'Wrap objects with decorators that add functionality.',
    analogy: 'Think of decorating a phone - add a case, screen protector, camera lens. Each decorator adds functionality.',
    example: `let coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
coffee.cost(); // Adds milk and sugar costs`,
    useCases: [
      'Adding middleware',
      'Feature toggles',
      'Logging and caching',
      'UI components'
    ],
    pros: [
      'Add features dynamically',
      'Avoids class explosion',
      'Single Responsibility',
      'Open/Closed Principle'
    ],
    cons: [
      'Many layers',
      'Order matters',
      'Can be complex'
    ]
  },
  {
    id: 'facade',
    name: 'Facade',
    category: 'structural',
    icon: 'bi-window',
    priority: 'Medium',
    description: 'Provide a simple interface to a complex subsystem.',
    problem: 'You have a complex subsystem with many classes, and you want to provide a simple interface.',
    solution: 'Create a facade that provides a simplified interface to the complex subsystem.',
    analogy: 'Think of a remote control - TV has complex internals, but remote provides simple buttons.',
    example: `class ComputerFacade {
  start() {
    this.cpu.start();
    this.memory.load();
    this.hardDrive.read();
  }
}`,
    useCases: [
      'API gateways',
      'Simplifying complex systems',
      'Legacy code wrappers',
      'Layered architecture'
    ],
    pros: [
      'Simplifies interface',
      'Reduces coupling',
      'Easier to use',
      'Single entry point'
    ],
    cons: [
      'Hides functionality',
      'Can become god object',
      'Adds abstraction'
    ]
  },
  // Behavioral Patterns
  {
    id: 'strategy',
    name: 'Strategy',
    category: 'behavioral',
    icon: 'bi-shuffle',
    priority: 'Very High',
    description: 'Define a family of algorithms, encapsulate each one, and make them interchangeable.',
    problem: 'You have multiple ways to perform a task and want to choose which one to use at runtime.',
    solution: 'Define each algorithm as a strategy class and let the client choose which to use.',
    analogy: 'Think of navigation apps - different strategies: Driving, Walking, Public Transport. You choose based on your needs.',
    example: `class PaymentProcessor {
  constructor(strategy) {
    this.strategy = strategy;
  }
  
  process(amount) {
    return this.strategy.pay(amount);
  }
}`,
    useCases: [
      'Payment processing',
      'Sorting algorithms',
      'Compression methods',
      'Discount calculations'
    ],
    pros: [
      'Eliminates if-else',
      'Easy to extend',
      'Runtime selection',
      'Easy to test'
    ],
    cons: [
      'More classes',
      'Clients must know strategies',
      'Can be overkill'
    ]
  },
  {
    id: 'observer',
    name: 'Observer',
    category: 'behavioral',
    icon: 'bi-bell',
    priority: 'Very High',
    description: 'Define a one-to-many dependency between objects so that when one object changes state, all dependents are notified.',
    problem: 'You need to notify multiple objects when something happens without tightly coupling them.',
    solution: 'Subjects notify observers when state changes. Observers subscribe/unsubscribe dynamically.',
    analogy: 'Think of YouTube - channel publishes videos, subscribers get notified. Can subscribe/unsubscribe anytime.',
    example: `class NewsPublisher {
  attach(observer) {
    this.subscribers.push(observer);
  }
  
  notify() {
    this.subscribers.forEach(obs => obs.update());
  }
}`,
    useCases: [
      'Event systems',
      'Notifications',
      'Model-View architecture',
      'Pub-Sub systems'
    ],
    pros: [
      'Loose coupling',
      'Dynamic relationships',
      'Broadcast communication',
      'Open/Closed Principle'
    ],
    cons: [
      'Unexpected updates',
      'Performance issues',
      'Memory leaks possible',
      'Order matters'
    ]
  },
  {
    id: 'chain',
    name: 'Chain of Responsibility',
    category: 'behavioral',
    icon: 'bi-link-45deg',
    priority: 'High',
    description: 'Pass requests along a chain of handlers until one handles it.',
    problem: 'You have multiple handlers that can process a request, and you want to pass it along a chain.',
    solution: 'Chain handlers together. Each handler tries to process the request or passes it to the next.',
    analogy: 'Think of customer support - Level 1 tries, if can\'t handle, passes to Level 2, then to Manager.',
    example: `class Middleware {
  setNext(middleware) {
    this.next = middleware;
  }
  
  handle(request) {
    if (canHandle(request)) {
      return process(request);
    }
    return this.next.handle(request);
  }
}`,
    useCases: [
      'Middleware pipelines',
      'Validation chains',
      'Support systems',
      'Event processing'
    ],
    pros: [
      'Decouples sender/receiver',
      'Flexible chain',
      'Easy to add/remove',
      'Single Responsibility'
    ],
    cons: [
      'No guarantee handled',
      'Performance overhead',
      'Hard to debug',
      'Order matters'
    ]
  },
  {
    id: 'state',
    name: 'State',
    category: 'behavioral',
    icon: 'bi-toggle-on',
    priority: 'High',
    description: 'Allow an object to alter its behavior when its internal state changes.',
    problem: 'An object\'s behavior changes based on its state, and you want to avoid large if-else statements.',
    solution: 'Encapsulate each state in a class. Object delegates behavior to current state.',
    analogy: 'Think of a traffic light - Red (stop), Yellow (prepare), Green (go). Each state has different behavior.',
    example: `class MediaPlayer {
  setState(state) {
    this.state = state;
  }
  
  play() {
    this.state.play(this);
  }
}`,
    useCases: [
      'State machines',
      'Order processing',
      'Game development',
      'Media players'
    ],
    pros: [
      'Eliminates if-else',
      'Easy to add states',
      'State logic encapsulated',
      'Clear transitions'
    ],
    cons: [
      'More classes',
      'Can be complex',
      'Transitions must be clear'
    ]
  },
  {
    id: 'command',
    name: 'Command',
    category: 'behavioral',
    icon: 'bi-terminal',
    priority: 'Medium',
    description: 'Encapsulate requests as objects, allowing you to parameterize clients with different requests.',
    problem: 'You want to encapsulate requests, support undo/redo, and queue operations.',
    solution: 'Create command objects that encapsulate requests. Commands can be stored, queued, and undone.',
    analogy: 'Think of a remote control - each button is a command. Can undo, redo, and record sequences.',
    example: `class Command {
  execute() { }
  undo() { }
}

class CommandManager {
  execute(command) {
    command.execute();
    this.history.push(command);
  }
  
  undo() {
    const cmd = this.history.pop();
    cmd.undo();
  }
}`,
    useCases: [
      'Undo/redo',
      'Macro recording',
      'Job queues',
      'Transaction systems'
    ],
    pros: [
      'Encapsulates requests',
      'Undo/redo support',
      'Queue operations',
      'Log operations'
    ],
    cons: [
      'More classes',
      'Memory overhead',
      'Can be complex'
    ]
  }
];

export default patterns;

