---
source_url: https://example.com/angular-signals-demo
---

# Angular Signals: Reactive State Without the Complexity

Hey everyone, welcome back. Today we are going to take a look at Angular Signals, which were introduced as a stable feature in Angular 17. If you have been writing Angular apps with RxJS, this is going to feel like a breath of fresh air for a lot of scenarios.

## What Are Signals?

So a Signal is basically a reactive value container. When the value inside a Signal changes, Angular automatically knows what parts of the UI need to update. You do not have to manually trigger change detection, and you do not need to set up subscriptions and teardown logic for simple state.

Here is the simplest possible example. You import the signal function from Angular core:

```typescript
import { signal } from '@angular/core';

const count = signal(0);
```

That is it. You have created a reactive count that starts at zero.

## Reading and Writing Signals

To read the value, you call the signal like a function:

```typescript
console.log(count()); // prints 0
```

To update it, you use the set method:

```typescript
count.set(1);
```

Or you can use update to derive a new value from the previous one:

```typescript
count.update(prev => prev + 1);
```

## Computed Signals

One of the coolest things is computed signals. Let's say you want a derived value that is always double the count:

```typescript
import { computed } from '@angular/core';

const doubleCount = computed(() => count() * 2);
```

Now whenever count changes, doubleCount recalculates automatically. And it is memoized, so it only recalculates when its dependencies actually change.

## Using Signals in a Component

In your component template, you read the signal exactly the same way:

```typescript
@Component({
  template: `<p>Count: {{ count() }}</p>`
})
export class CounterComponent {
  count = signal(0);

  increment() {
    this.count.update(v => v + 1);
  }
}
```

Angular's change detection sees the signal read in the template and subscribes automatically. When you call increment, the template updates.

## When to Use Signals vs RxJS

Signals are great for local component state, derived UI values, and simple shared state. RxJS is still the right choice for async streams, HTTP requests, event streams, and anything that needs operators like debounce, switchMap, or combineLatest.

The two systems interoperate: you can convert an Observable to a Signal using the toSignal function from Angular/core/rxjs-interop.

## Wrapping Up

Signals are a genuinely useful addition to Angular. They reduce boilerplate, improve performance by being more precise about what changes, and make simple reactive state much easier to reason about. Give them a try in your next component refactor.

Thanks for watching. Drop any questions below.
