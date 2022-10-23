# FIFOs vs LIFOs
- LIFOs are implemented in most modern programming languages (i.e. function call and call-stack)
- LIFOs make implementing Operating Systems and pluggable components more difficult than necessary
- both LIFOs and FIFOs are useful, but only LIFOs are inherently supported by modern programming languages 
	- e.g. function calling employs a LIFO, and does not employ a FIFO
	- FIFOs *can* be modeled as classes, but that is not the same as being inherently supported by the notation

# Pipelines
- pipelines are useful for plumbing software units together
	- but, functions calling functions do not implement pipelines (due to LIFO issue)
	- pipelines use FIFOs for communication

# Structured Message Passing
[[structured message passing.png]]
# First Principles Thinking
[[WIP/First Principles Thinking]]
# Various Random Issues
My notes about Operating Systems, in screencast form: [https://beta-share.descript.com/view/gdfwt4MfKjF](https://beta-share.descript.com/view/gdfwt4MfKjF)
- divide-and-conquer - developers vs. end-users  
- divide-and-conquer - 2 main technical aspects of operating systems  
- bloatware  
- processes  
- (disclaimer: I'm toying with Descript beta to produce tech video. This is my first attempt and might be unduly klunky)  
- (disclaimer: I'm still mulling on what to do for the jam. There is a strong chance that I won't be able to decide before the jam ends.)  
- (ps. I would be happy to discuss this stuff with anyone who is interested...)
# Divide and Conquer
- divide and conquer is understood by most programmers
- but, most programmers do not employ *enough* divide-and-conquer
	- e.g. what is commonly call "parallelism" can be broken into 2 categories
		1. 0D
		2. Simultaneity
# Closures
- Operating Systems are Greenspun's 10th Rule applied to Closures
