# "Doesn't TypeScript do that?"

Typescript is a great tool for quality control; however the structures that State manages
often have concerns that go past the ability of Typescript to constrain. In addition. TypeScript is 
a *preprocessor system" that ensures the *code* does not validate its own APIs. State Engines,
by their nature, detail with dynamic structures, not static classes and code, and therefore generally
define their schema *after* your code has been preprocessed by TypeScript, and therefore don't fit 
into the pattern TypeScript implements.

## Tiers of validation

Validation is a broad field and comes in "tiers" - from the most simple to concerns so specific that 
they are better handled "parametrically" (through functions) than by convention or schema. 

### Structural validation

Typescript can perform structural validation: making sure that things that expect strings don't get fed 
arrays. 

### Mechanical validation

There are a lot of aspects of data that go beyond type; insulating state from containing instances that 
depend on prototypical inheritance, for instance, can pass Typescript validation but still be "bad news;"
for instance instances of a class that has a static parameter that can be changed through external action
means that your sate can change in ways that is not immediately broadcast to subscribers and is difficult 
to analyze when your data changes in "wierd ways". Or, circular reference that look "fine" to Typescript but 
break middleware designed to serialize them, or again, create situations were a change in one place "Magically"
alters data in another. Or Dom instances, or WebGL references, which again have fields and references 
that are volatile.

The implicit promise that data is "well managed" can be broken by careless use of structure with "problematic"
references. Passing input through "sanitization" (or throwing on discovery of bad patterns) is part of a 
State Engine's job. 

### Business Logic

This is a whole school of things that if "systematized" in a state system can bloat its code; things like 

* keeping numbers in a specific range
* Ensuring strings contain only "good" characters (and are of a proper length)
* Ensuring an array contains unique data
* Ensuring dates are meaningful to the context (shipping promi ses in a shopping cart are in the future, birthdays are in the past)

Business logic in some cases _can_ be systematized but in general it's better to put those sort of things in "validation hooks" 
and let application authors constrain data to the specific needs of their project. 

That being said there are plenty of validation libraries such as [Yup](https://yup-docs.vercel.app/docs/intro) that try to give
the user an extended schema of validation rules to apply to data, which are "fun" to play with but often more work than hand coded validation hooks. 

### What to do with bad data

The simple answer is to not hold it in state. However there are cases where the bad data needs to be "flagged" but 
accepted -- in a specific scope. It's better when a user is typing in data to *explain* why their data cannot be submitted
than to "block" their choice and freeze up their keyboards. Allowing the user to feel agency while still guiding them to 
create usable records is important to the user experience. As is, telling them their data is bad *before* they submit it 
instead of after it's sent to the server. 

This is generally done with "error" metadata in a pending record. 