# ė Overview
Computer programs can be written using pluggable units of LEGO®-like software.

ė (spelled "eh" in ASCII) is a proof-of-concept that shows how to build a "Hello World" program using 3 pluggable software units.

ė generates code in several "traditional" programming languages:
- C
- Python
- Lisp

Generating code for many other languages, like Rust, is possible.

ė subsumes the traditional notion of "operating systems" and "programming languages", by replacing the idea of "programming languages" with a more expressive notation.
# Teaser
An illustration of software-as-pluggable-units is shown in the diagram below.

![[hello world eh-helloworld.png]]

The diagram - for this POC - is drawn using off-the-shelf *draw.io* and transpiled to Python code using *make*.

In general, software units - Components - can have 0 or more inputs and 0 or more outputs.  In contrast, functional notation can only express components - functions - with exactly one input[^oneinput] and exactly one output.

[^oneinput]: The concept of "multiple arguments" to a function is syntactic sugar for de-structuring of a single input parameter block of data that arrives as a whole, all at the same time.
The simplicity of this example belies the power of the paradigm.  For example, an earlier prototype of this system (Arrowgrams) was used to self-compile the transpiler.
# Secret Sauce
The secret sauce of ė is 
- The addition of *asynchronous message passing* to complement the construct of *function calling*, i.e. the additional use of Queues instead of only using Stacks
- Layering, hierarchy - software units come in two basic types (1) Leaves and (2) Containers
- Components - software units - are *hierarchical state machines*[^hsm] that react to incoming messages.

Leaf Components are what is currently thought of as *functions* and *libraries*.  Leaves are degenerate state machines, composed of only one (1) state - the *default state*.

Container Components are like *routers* at the programming statement level, instead of the whole-computer level.  Containers compose applications using Leaf Components and other Container Components.  Containers can be nested to any depth, i.e. Containers are recursive layers.  Routing of messages is performed by Containers and is not hard-wired into Leaf Components, as is currently done with function-based programming languages.

[^hsm] Hierarchical State Machines are much like Harel's Statecharts, except without concurrency (called *orthogonal states* in StateCharts).  Concurrency is lifted out of StateChart notation and made into a separate notation.  Operating system *processes* are simple state machine envelopes for synchronous, function-based code.  Operating systems impose no hierarchy on compositions of processes, therefore, are ad-hoc, unstructured versions of hierarchical state machines.  StateCharts use hierarchy to conquer the *state explosion problem*.
# 0D - Removing Implicit Dependencies
0D - zero dependency - is the idea of removing all dependencies from a software unit.

0D enables architectural flexibility.

0D enables "build and forget".  A programmer can build and test and ship a software unit, knowing that *nothing* can change the unit's behaviour.

Programmers *mis-believe* that they can "build and forget" software units by using code libraries, git, etc.  Yet, they find that making a small change "here" can cause something "over there" to behave differently.  Programmers must resort to wrapping *operating system processes* around their software units ("apps") to achieve the "build and forget" paradigm.

## What Causes Implicit Dependencies?

1. the use of functions and call/return
2. hard-wired names in code
3. hard-wired routing decisions due to the function-calling protocol

## How To Work Around Implicit Dependencies?

An easy solution to achieving 0D using present-day programming languages is to use Queues (FIFOs) for passing messages between software units.

Functions, though, use LIFOs, i.e. stacks, not queues (FIFOs).  

Functions are suitable only for building synchronous, inside-the-box, clockwork functionality.  Attempts to use functions for building asynchronous software units - "build and forget" units - results in bloatware.  This bloatware is called "operating systems".

Existing operating systems, such as Windows, MacOSX, Linux, ROS, etc. create Queues and provide low-level APIs for message-passing.  

ė shows that it is possible to push message-passing down to the fine-grained function level rather than relegating all message passing to coarse-grained process levels.  Further, ė shows that this can be done - easily - with exising programming languages.  Most modern programming languages support closures and objects, which makes the implementation of fine-grained message-passing even easier.

Existing operating systems have two uses: 
1. parallelism/0D, and, 
2. libraries of functionality, e.g. device drivers.

ė directly addresses only the first issue: 0D.  To use all existing functionality (2), requires wrapping the existing functionality in ė wrappers (including wrapping a complete operating system inside a single ė Container) - this is addressed in another project. 