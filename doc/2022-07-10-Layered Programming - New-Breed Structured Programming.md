One thing I haven't mentioned in essay form is the notion of chopping programs into 2 kinds: 

- Leaf programs 
- Container programs.

Leaf components are where code (the traditional notion of code) goes, while the only job of Containers is to route messages between FIFO queues.  

Containers are recursive and layered.  Containers contain Leaves and/or other Containers.

Components, whether Leaf or Container, contain a FIFO output queue and can only communicate with other components by leaving messages in their output queue, to be routed by their parent Container.  Output messages are deferred and are not routed until all children have given control back to the Container.  No Component can refer directly to any other component, except that a parent Container can see its own direct children and can route messages between them.

I think of routing as being a programming language - beyond what is traditionally considered to be part of programming languages.  

I see FBP in this light.  I see internet in this light.  I see IoT in this light.  I see robotics in this light.  

Routing is sometimes called "coordination language", but I think that it is important to think of it as a programming language.  

In the same vein, I think of "compiling" diagrams instead of merely "modelling" programs using diagrams.  A subtle difference, but, one which leads to vastly different ways of approaching the problem(s).  Maybe akin to the shift in art, when drawing-with-perspective was introduced.

With "modelling", you try to express the diagrams using data structures in standard general-purpose programming languages.

With "compiling", you treat diagrams as *syntax*.  Boxes and ellipses are like *characters* to be parsed as part of the ecosystem of a programming language.

*Text characters* are not usually overlapped and are displayed in grid form.  Boxes and ellipses (and lines and text-elements) are not restricted to grid layouts and can be overlapped and resized in the editor.

The idea of programming languages using overlappable/resizable cells opens up new avenues of thought beyond that of using only programming languages that disallow overlapping of cells.  

I think that this results in distributed-thinking instead of synchronous-thinking.

Layers are to modern programming as "Structured Programming" was to assembler programming.
