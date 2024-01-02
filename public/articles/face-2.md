This is best illustrated by the UCB skit above.

Initial React components didn't have hooks, but they did have a state "system" of sorts,
a local state object attached to each view component with a setState function to update it. 
React also had two ways of communicating information downward, context, a pub-sub component, 
and parameters, a code-equivalent of html attributes, which also allowed for the injection of
data down through the DOM tree to sub-views.

These concepts were both tangible and easy to inspect, and, so a new generation of
programmers ran rings around their competition. But its simplicity did cry out for a 
global data management, and Redux stepped in to fill that void.

## Redux and Flow

Redux was the demonic brainchild of a fairly solid architectural idea:
put application state outside the view layer and inject it like Botox
into each individual component as it was needed. It was in fact, invented because Facebook
employees noticed that the count of unread messages, managed by a red circled number on the UX,
was not in fact equal to the number of unread messages. This was because the parts of the
Facebook interface were not coordinated. (fun fact: the counts are still off)

The architects of Redux decided that if the messages were managed outside the view layer and
shot into it then the red circle count would be the same as the observable count of messages.

But as with many things, the manner of execution really determines the outcome more than
the original idea. Redux was weighed down by a two-tier system of actions, lack of schema
and no real respect for the asynchronous process.

But when a system with no global state management system gets one, it was rapidly adopted. 
This new system did have clear drawbacks including a lack of schema, and a burdensome 
action notation system. 

## From the Gates of Hell

Once it was discovered what a burden Redux was, a thousand developers got to work "fixing" it.
The fixes fell into one of these camps:

* "Decorate" Redux with a super-system that adds more functionality (Saga)
* Create a functionally alternative replacement that is better (Freactal, Redux Toolkit)
* focuses on a specific area and polish the cruft out of it (Immer, Immutable)
* Re-engineer a wholly different engine that is free from the taint of Redux entirely (RxJS, RxDB)
* Push the heavy lifting back on the server layer and focus on data IO (Relay, GraphQL)