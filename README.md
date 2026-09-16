# order-up-pizzeria
This is an application for code-401 classes 11-13. It teaches the concepts related to event driven programming.

# 🍕 Class 11 — Order Up! Pizzeria
## Event-Driven Basics: One Pizzeria, One Process

> **Module 3 • Class 11 of 13**
>
> Today we are learning the basic idea behind **event-driven programming**:
> one part of a program can announce that something happened, while other parts
> listen and respond.

---

## 🎯 Today's Big Idea

Imagine one pizzeria with three people:

- 👤 **Customer** — places an order and wants updates.
- 👨‍🍳 **Kitchen** — receives the order and prepares it.
- 🚗 **Driver** — picks up and delivers the order.

The important idea is that these actors **do not directly call each other's functions**.

Instead:

```text
Customer
   │
   │ emits "order-placed"
   ▼
Event Bus
   │
   ├──────────────► Kitchen listens
   │                    │
   │                    │ emits "confirmed"
   │                    ▼
   │               Event Bus
   │                    │
   │                    │ emits "in-the-oven"
   │                    │
   │                    │ emits "ready-for-pickup"
   │                    ▼
   │               Driver listens
   │                    │
   │                    │ emits "out-for-delivery"
   │                    │
   │                    │ emits "delivered"
   │                    ▼
   └──────────────► Customer listens
```

The **event bus** is the shared place where events are announced.

---

# 1. 📁 Create the Repository

Create a new GitHub repository for Class 11.

Suggested repository name:

```text
401-class11-order-up-pizzeria
```

You can use a different name if your class repository naming convention is different.

### 👉 DO

Create the repository on GitHub, then clone it to your computer.

Example:

```bash
git clone YOUR-REPOSITORY-URL
cd 401-class11-order-up-pizzeria
```

> Replace `YOUR-REPOSITORY-URL` with the URL for your own repository.

---

# 2. 🟢 Create the Node Project

Initialize the project:

```bash
npm init -y
```

This creates:

```text
package.json
```

---

# 3. 📦 Packages to Install

## Runtime package: None!

Class 11 intentionally uses **Node's built-in `EventEmitter`**.

That means we do **not** need to install an event library.

We will use:

```js
const EventEmitter = require('events');
```

### 💡 What is EventEmitter?

`EventEmitter` is a Node.js tool that lets one part of a program:

1. **emit** an event — announce that something happened.
2. **listen** for an event — wait for something to happen.
3. **handle** an event — run code when that event happens.

Think of it like a pizzeria announcement system:

> 📢 "Order #123 has been placed!"

Anyone listening for `"order-placed"` can respond.

---

# 4. 🧪 Testing Package

Install Jest as a development dependency:

```bash
npm install --save-dev jest
```

Jest is a **testing tool**.

We will test our own functions, such as:

> "When the kitchen receives an order, does it create the expected next event?"

We are **not** testing whether Node's `EventEmitter` works. Node already provides and tests that feature.

---

# 5. 📋 Update package.json

Change the `scripts` section to:

```json
"scripts": {
  "start": "node demo/monolithic/app.js",
  "start:modular": "node demo/modular/app.js",
  "test": "jest --runInBand"
}
```

Your package.json should look similar to:

```json
{
  "name": "401-class11-order-up-pizzeria",
  "version": "1.0.0",
  "description": "Class 11 event-driven programming demo",
  "main": "index.js",
  "scripts": {
    "start": "node demo/monolithic/app.js",
    "start:modular": "node demo/modular/app.js",
    "test": "jest --runInBand"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "jest": "^YOUR-INSTALLED-VERSION"
  }
}
```

> Do not manually type a version number if `npm install` already added one for you.

---

# 6. 📁 Project Structure

By the end of Class 11, your project should look similar to:

```text
401-class11-order-up-pizzeria/
│
├── demo/
│   │
│   ├── monolithic/
│   │   └── app.js
│   │
│   └── modular/
│       ├── app.js
│       ├── events.js
│       ├── customer.js
│       ├── kitchen.js
│       └── driver.js
│
├── tests/
│   ├── kitchen.test.js
│   └── driver.test.js
│
├── package.json
├── package-lock.json
└── README.md
```

---

# 7. 🍕 Order Status Lifecycle

The same status names will continue through **Classes 11, 12, and 13**.

```text
order-placed
     ↓
confirmed
     ↓
in-the-oven
     ↓
ready-for-pickup
     ↓
out-for-delivery
     ↓
delivered
```

### ⚠️ !! IMPORTANT

**Do not rename these events between classes.**

Keeping the same event names and payload shape will allow students to see how the same idea grows from:

```text
ONE PROCESS
   ↓
NETWORK
   ↓
RELIABLE MESSAGE QUEUE
```

---

# 8. 🧱 Class 11 — Part 1: Monolithic Version

Start with:

```text
demo/monolithic/app.js
```

**Monolithic** means we put the main application logic together in one file.

This is intentional.

We first learn **what the event system does** before worrying about splitting our code into multiple files.

The file will contain:

- the shared `EventEmitter`
- customer behavior
- kitchen behavior
- driver behavior
- event listeners
- the order status flow

Run it with:

```bash
npm start
```

---

# 9. 🧠 What Students Should Notice

Watch the console carefully.

The customer starts the process:

```text
Customer: Placing order...
```

Then an event is emitted:

```text
order-placed
```

The kitchen is listening for that event.

The kitchen responds:

```text
Kitchen: Order confirmed.
```

Then it emits:

```text
confirmed
```

The process continues until:

```text
delivered
```

### ❓ CHECK-IN QUESTION

Ask:

> "Where does the customer directly call the kitchen?"

The answer should be:

> **Nowhere.**

The customer emits an event.

The kitchen listens for that event.

That is the beginning of **decoupling**.

---

# 10. 🧩 Important Vocabulary

| Term | Plain-English Meaning |
|---|---|
| **Event** | A message saying that something happened |
| **Emit** | Announce an event |
| **Listen** | Wait for a particular event |
| **Handler** | The function that responds to an event |
| **EventEmitter** | Node's tool for sending and receiving events |
| **Event bus** | A shared EventEmitter used by different parts of an application |
| **Decoupled** | Parts can communicate without directly calling each other |
| **Payload** | The information carried by an event |
| **Singleton** | One shared instance used by multiple files |
| **Timeout** | Code scheduled to run after a delay |

---

# 11. 🍕 Class 11 — Part 2: Modular Version

After students understand the one-file version, move to:

```text
demo/modular/
```

Now we split the actors into separate files:

```text
customer.js
kitchen.js
driver.js
events.js
app.js
```

The important new idea is:

> **Separate files need to use the SAME EventEmitter instance.**

---

# 12. ⚠️ !! IMPORTANT — EventEmitter vs. Event Bus

This is a major teaching point.

When we write:

```js
const EventEmitter = require('events');
```

we get the **EventEmitter class**.

A class is a blueprint.

We still need to create an instance:

```js
const events = new EventEmitter();
```

Our `events.js` file does exactly that:

```js
const EventEmitter = require('events');

const events = new EventEmitter();

module.exports = events;
```

Then every actor imports that same exported object:

```js
const events = require('./events');
```

Now all of the actors are using the same event bus.

```text
customer.js ──┐
              │
kitchen.js ───┼──► events.js ──► ONE EventEmitter
              │
driver.js ────┘
```

### ❓ CHECK-IN QUESTION

Ask:

> "If customer.js and kitchen.js each created their own EventEmitter, would they hear each other's events?"

**No.**

They would be using two different event buses.

---

# 13. 📦 Event Payload

For Class 11, introduce the common status payload:

```js
{
  orderId,
  status,
  timestamp
}
```

Example:

```js
{
  orderId: 101,
  status: 'confirmed',
  timestamp: '2026-09-16T15:00:00.000Z'
}
```

### 💡 Why do we care about the payload?

An event tells us:

> "Something happened."

The payload tells us:

> "What happened, to which order, and when?"

This exact shape will be reused in Classes 12 and 13.

---

# 14. ⏱️ The Bake

The kitchen uses:

```js
setTimeout()
```

This lets us pretend the pizza takes time to cook.

Example:

```js
setTimeout(() => {
  // pizza is ready
}, 1000);
```

### 💡 Important

`setTimeout()` does **not** stop the whole program and wait.

It says:

> "Run this function later."

This is another early example of asynchronous programming.

---

# 15. 🧪 Testing Strategy

Test **your code**, not Node.

Good test:

```text
Given an order,
when kitchen.handleOrder() runs,
does it create the expected next event?
```

Less useful test:

```text
Does EventEmitter emit an event?
```

Node's `EventEmitter` is already responsible for that behavior.

Our responsibility is the logic **we wrote around it**.

---

# 16. ▶️ Run the Demos

### Monolithic

```bash
npm start
```

### Modular

```bash
npm run start:modular
```

### Tests

```bash
npm test
```

---

# 17. 🧪 Suggested Demo Tests

Use the console to demonstrate:

### Test 1 — Customer places an order

Expected:

```text
Customer places order
↓
order-placed
↓
Kitchen receives order
```

### Test 2 — Kitchen confirms

Expected:

```text
Kitchen receives order
↓
confirmed
```

### Test 3 — Pizza goes into the oven

Expected:

```text
confirmed
↓
in-the-oven
```

### Test 4 — Pizza becomes ready

Expected:

```text
in-the-oven
↓
ready-for-pickup
```

### Test 5 — Driver delivers

Expected:

```text
ready-for-pickup
↓
out-for-delivery
↓
delivered
```

---

# 18. 🧑‍🏫 Teaching Challenge

Ask students to trace the entire process **without looking for a direct function call** between actors.

Ask:

> "Customer places an order. Who responds?"

Then:

> "How does the kitchen know?"

Then:

> "Who responds to `ready-for-pickup`?"

Then:

> "How does the customer learn that the order was delivered?"

The goal is for students to begin thinking:

```text
EVENT
  ↓
LISTENERS
  ↓
HANDLERS
  ↓
NEW EVENT
```

rather than:

```text
functionA()
   ↓
functionB()
   ↓
functionC()
```

---

# 19. 🔗 How Class 11 Connects to Classes 12–13

### Class 11

```text
One Node process
One shared EventEmitter
```

### Class 12

```text
Customer process
      ↓
Socket.io
      ↓
Pizzeria Hub
      ↓
Socket.io
      ↓
Kitchen / Driver processes
```

The events now travel across a network.

### Class 13

```text
Customer
   ↓
Message Queue
   ↓
Order waits safely
   ↓
Kitchen reconnects
   ↓
Order can still be processed
```

The system becomes more reliable.

---

# 🎯 Class 11 Learning Goals

By the end of class, students should be able to explain:

- What an event is.
- What it means to emit an event.
- What it means to listen for an event.
- What an event handler does.
- What `EventEmitter` provides.
- Why multiple files need a shared EventEmitter instance.
- What an event payload is.
- Why decoupling can be useful.
- How `setTimeout()` can simulate an asynchronous operation.
- Why we test our handler logic instead of Node's built-in event system.

---

# 🚦 The Big Picture

Students should leave Class 11 understanding:

> **"Instead of one function directly telling another function what to do, I can announce that something happened and let interested parts of my application respond."**

That is the foundation for the next two classes.

```text
🍕 CLASS 11
EventEmitter
    ↓
📡 CLASS 12
Socket.io
    ↓
📬 CLASS 13
Message Queues / FIFO
```

**Same pizzeria. Same order lifecycle. Bigger and more reliable system.**

