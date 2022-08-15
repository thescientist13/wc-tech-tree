import { createMachine, interpret } from 'https://unpkg.com/xstate@4.33.1/dist/xstate.web.js';

// Stateless machine definition
// machine.transition(...) is a pure function used by the interpreter.
const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: { on: { TOGGLE: 'active' } },
    active: { on: { TOGGLE: 'inactive' } }
  }
});

XStateInspect.inspect();

// Machine instance with internal state
const toggleService = interpret(toggleMachine, { devTools: true })
  .onTransition((state) => console.log(state.value))
  .start();
// => 'inactive'

toggleService.send('TOGGLE');
// => 'active'

toggleService.send('TOGGLE');
// => 'inactive'