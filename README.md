# ė - Goal and Overview

The goal of this project is to program computers using pluggable units of software.

To do this we need:
- micro-concurrency
- 0D
- layers, relative sofware units
- multiple languages.

## Hello World 
Very simple example
## Leaf
![Leaf](./hello%20world%20eh-Leaf.png)

## Container
![Container](hello%20world%20eh-helloworld.png)

## Re-Architecting
![Different%20Routing](hello%20world%20eh-helloworldworld.png)

# Benefits
- technical drawings come "for free"
- concurrency comes "for free"
- "build and forget" development
- distributed programming comes "for free"
- multiple-CPU paradigm
- ability to plug together software components to create mimimal set of functionality, instead of using an all-in-one behemoth operating system

further discussion...[[Eh - Benefits]]

^
# Key Insights
- 0D - No Dependencies 
- FIFOs and LIFOs
- Pipelines
- Structured Message Passing
- "First Principles Thinking"
- Closures
- "Parallelism" is more than one thing
- Scalability
	- Pluggability is necessary for scalability, but, more elaborate (complicated) examples would be needed to show this off.

# Approach

## Formulate questions
Questions such as...
- Why do hardware designs tend to work while software designs fail and become more complicated?
- Pipelines are different from functions.  How are pipelines different? 
- Message passing.  Is message-passing possible in the synchronous paradigm?
- Message passing - asynchronous - has a bad rep because it is often ad-hoc.  Is there an equivalent to "structured programming" for async message-passing?
- Closures - are closures the same as "processes" in operating systems? 
- DaS - Diagrams as Syntax.  Why are most programming languages textual?
- Tells - what is currently considered difficult?  Multitasking, async, callbacks, mutation, sequencing, history, state ... Can these be improved?  Are they difficult because they're difficult or because our notation makes them difficult?
- Is "something" the same across all programming languages?
- What is parallelism?
- Operating Systems and Programming Languages were invented in the 1950's under the single-cpu assumption.  Is the single-cpu assumption still valid?
- Are end-users forced to use the "same" operating systems / computer environments as developers?

- Can the goal (pluggable components) be sub-divided into smaller sub-goals?
	- Which properties must components have to be pluggable?
	- Which properties inhibit pluggability?


## Synthesize
- upon answering the above questions, it is possible to synthesize a new programming environment?

(The most recent documentation is in Obsidian format](https://publish.obsidian.md/programmingsimplicity/2022-08-21-Eh+Pluggable+Software+Components))


# Install
After cloning this git, cd into it and run multigit:
> multigit -r

then, run make
> make

then, load _eh.html_ into a browser and click the "Generate ..." button

## Diagram
The diagram is _test5.drawio_.

To modify the diagram and re-transpile, run _make_, then copy/paste test5.json into the string `const jsonsrc = String.raw` in _eh.html_.  Then, re-load _eh.html_ and click the "Generate ..." button.
