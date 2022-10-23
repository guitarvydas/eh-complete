Fire-and-forget - most often called "concurrency" and "paralellism" entails two aspects:
- snipping dependencies
- the element of *time*, non-synchronization.

Humans understand *synchronization* at a visceral level.

For example, humans deal with other humans ("Hi, how are you?", "Can you do this for me...?", "I need this by Tuesday") on a daily basis.  

Synchronization is done on an as-needed basis ("give it to me when you're done.")

There is no need to install synchronization into *every* program[^ps].

[^ps]: I call this "pervasive synchronization".

Too much synchronization slows everything down.  

When there is too much synchronization, the slowest player determines the final speed of the result.

[aside: I found Harel's Statecharts to be a brilliantly wonderful idea.  I found Harel's synchronous analysis of Statecharts to be entirely unpractical, because it required all orthogonal states to be fully synchronized and micro-managed.]

The lazy way to analyze the behaviour of a system is to imagine micro-management - every action is synchronized at a very low-level.  Every action, even "concurrent" actions, are imagined to consist of small micro-steps that are fully synchronized with the operation of other actions.  
A less-lazy way to analyze the behaviour of a system is to imagine that it is composed of asynchronous levels (layers).

Example: A Swiss clock contains many interlocking gears, the micro-actions of the clock are completely synchronized with other actions of the clock.  The clock proceeds to tell time based on interlocking micro-actions.  

In the micro-managed model, two clocks are just like one bigger clock - all actions of each clock are completely synchronized and are dependent on each other's micro-steps.

In an async model, the two clocks are completely independent.  The actions of one clock's gears do not affect, do not slow down, the action of the other clock's gears.