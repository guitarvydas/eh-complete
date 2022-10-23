Programming is the act of controlling a computer.

Programming is done by connecting a series of stand-alone units together.

Software units send Messages to one another using Structured Message Passing.

"Operating systems" and "programming languages" as we know them today, are not needed when all programming is done by composition of stand-alone units of software.

# How Is This Different From What We Already Have?
## Current Operating Systems

State-of-the-art operating systems, like Linux, Windows, MacOS, have two (2) main functions:
1. control multitasking and blocking
2. provide a rich set of device drivers.

Wrapper operating systems cannot control blocking when the progamming units perform ad-hoc, unstructured blocking on their own.  "Functions" *block* when calling other functions.  State-of-the-art O/Ss  need to resort to brute-force methods to pry blocking away from programming units, e.g. preemption.

This proposal does not *directly* address the issue of providing a rich set of device drivers (2), since, each device driver represents "hard work" - specific knowledge about the internal workings of each device, where each device might have wildly different operations.  Programming such devices is made harder by the over-use of synchronization, etc., outlined in this proposal.  As such, writing device drivers in a stand-alone style should be "easier".  Incorporating already-existing device drivers is discussed below.
## Current Programming Languages
- over-use of synchronization
- over-use of blocking (AKA "functions" ; functions *block* when calling other functions)
- over-use of dependencies
- programmers are under the illusion that Code Libraries provide stand-alone units of software
	- this is not the case, for example "changing something here" might cause "something over there" to function differently (due to over-use of dependencies).
- ASCII Art instead of diagrams
	- use of textual programming languages led to the "global variable problem"
		- Textual programming languages attempt to fake-out drawing of nested containers, leaving too much room for crossing the boundaries of containers
		- The "problem" would have been instantly visible if diagrams had been used, and, I assert that we would never have had to have dealt with "global variables"
		- Global variables are possible to express only with textual languages, or, with diagrams that omit container boundaries

## Programming
- Programming consists of two (2) main activities
1. Design, "creativity"
2. Production Engineering, "optimization".

State-of-the-art programming languages, like Rust, C++, Haskell, Python, etc. address the issues of Production Engineering (2), but tend to ignore Design (1).

Methodologies like Agile, Pair Programming, etc., are attempts at adding structure to the process of Design.

Previous attempts at structuring the Design process tend to be ignored:
- Dynamic Languages
- REPLs
- Rapid Prototyping


### Design in Other Disciplines
More-established disciplines, like song-writing, teach methods for "creation", such as
- brainstorming
- mind-mapping
- iteration

Brainstorming tends not to be discussed with respect to modern programming, although Agile and Pair Programming hint at this process.  

The idea of a REPL is iteration - experiment and modify and repeat. Agile is simply a very-slow-REPL.

Requirements-gathering hasn't been formalized and pinned down.

Most non-programmers don't want to deal with (specify) all of the details.  The amount of detail that non-programmers provide is variable, making it hard to formalize the process.  Additionally, non-programmers will try to describe what they want by, instead, describing how they think it should be done - this makes it even harder to piece together what it is they want.  Non-programmers are often wrong about how something should be programmed.  (A sign at my auto-mechanic says something like "shop rate: $70/hour or $90/hour if you watch").

Likewise, theorists are usually wrong about what tools would help the software-creation process.  A glaring example of this is the invention of language-theory and tools like YACC.  In 2004, the PEG process was (re-)invented and is markedly more flexible than YACC.  PEG is not based on language-theory.  PEG is essentially a DSL for specifying parsers directly, instead of using Language-Theory to for specifying parsers.  A very flexible manifestation of PEG is the Ohm-JS language.  Another example is the attempt to insert macros into programming languages.  Macros make more sense as part of editors, not programming languages.

## FDD vs Waterfall Design Method
[Failure Driven Design](https://guitarvydas.github.io/2021/04/23/Failure-Driven-Design.html)

If you don't iterate a Design or the understanding of the Requirements, you are designing using the Waterfall Method.

Agile is an attempt to iterate a Design and Requirements (i.e. a very-slow REPL).

TDD is an attempt to iterate the understanding of a Design.

## Epicycles
We have been adding epicycles to the programming workflow to fake out programming via stand-alone units of software, e.g.
- packages
- package managers
- make

- text-only

# How Do We Incorporate Already-Existing Software Into This Scheme?
- run Comopnent-based software "under" existing operating systems with "FLI" interfaces to existing operating systems

- commonality between all programming languages
	- functions -> sync, blocking
	- 

# Notes
- all languages and OSs were invented in the 1950's mindset of "single CPU"
- now, we have multiple CPUs and the ground rules have changed, but, techniques are still stuck on the single-cpu/everything-is-a-calculator model
- steaming pile of bloatware (Linux, Windows, MacOS, Rust, C++, Python, JavaScript, node.js, etc.)
- over-use of synchronization (due to 1950's single-cpu model)
- ad-hoc blocking - O/S must fight with functions for control
- epicycles due to using "calculator model" for "distributed programming" -> extra code to work around forcing distributed programming into the "calculator model" domain
- eh inner concurrency instead of O/S-supplied concurrency

# Principles
- FIFOs (queues) for inter-component communication
	- LIFOs (stack) for inner communication (function calls)
- child cannot override parent - every layer makes stand-alone sense and cannot depend-on (be altered by) adding children
	- parent gets "first dibs" on all incoming messages
	- parent punts messages to child if message unwanted by parent
	- parent recursively exits children if parent state changes
- little communicating operating systems instead of 1 huge one
- SVG is a super-set of Text (SVG contains rectangles, ellipses, lines, text, grouping)
- pure functions are pure functions - i.e. no mutatation, hence, do not express RAM, Concurrency, etc. (they can model these concepts, but modeling is not as good as expressing)