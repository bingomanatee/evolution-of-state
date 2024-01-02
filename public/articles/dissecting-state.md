# Dissecting State

Given the ample points of data when it comes to state system 
what are the meaningful elements and characteristics of a state system? And have hooks provided the "last word"
in state or are they still a relevant mechanic?

## Data Containment and Schema

At the minimum state systems contain data. Not by any means the end of the road but a place to start. 
Some systems apply near zero control over what the data under management contains (RxJS, Redux, Immer).
Others constrain content with a predefined schema (RxDB, Immutable).

Systems with less stringent control can be combined with systems like Yup to improve their data control. 
More recently TypeScript can be used to enforce data control management as well. 

### Specific examples:

* hook: useState
* "Classic React" setState
* Redux

## Change functions/change management

This comes under several flavors: 

1. "holistic" change in which the entire state collection is mutated without restraint (Redux)
2. "collection" change in which data is stored in a series of records that are modified one by one
    or parametrically (deleteWhere, setFieldWhere): RxDB, Firebase, IndexedDB
3. "schema" change in which state is made of an arbitrary structure but checks are put in place to 
   ensure that the state structure is observed (Immutable.js)

Another variant in the wrinkle are the sequence of change. Sometimes change is *always synchronous*
(RxJS); Sometimes (often) change is *delayed* - as in Redux (and any of its downstream versions), hooks and RxDB.
This has some major implications such as --- 

* can a sequence of changes create and "bury" data changes to where validation or "triggers" are ignored because
  the changes come fast and loose between render cycles? This is a real risk with Redux *and* hooks. 
* Do tests run sluggishly because they contain too many state based systems all of which are async?

## Transmission

Data is nothing if it is not shared. A major characteristic is the ability to share the data to various 
potentially independent view components. In some scenarios that includes synchronizing data between
the server and the view layer but this isn't a primary characteristic of a client side state system. 

### Specific Examples

* Redux
* RxJS
* MobX

## Immutability 

This is a unique requirement of React is that when data changes it must be referentially unique; more specifically,
if the elements of a container (object, array, Map) are updated, the container must be updated with a new container
so that react's change detectors pick up on the fact that the view component must be refreshed. 

### Specific Examples

* Immutable
* Immer

## Scope and persistence

There are two main scopes in Web applications (relative to the single page application):

* __local__ to view components  (or clusters of components - such as "pages") 
* __global__ to the entire page 

### Persistence

By default, most state systems are isolated to a single page load. Sometimes the data is mirrored and persistent 
to servers but in general the quality of state is that it is to assist to filter, visualize or manage transient 
copies of records as they are being edited. 

There is also a session level "buffer" in the modern browser, systems like sessionStorage, localStorage, and indexedDB;
these systems have very limited persistence but can provide some carryover from page to page for things like
shopping carts or UX options. Other than RxDB, a system specifically designed for persistent data engines. 

## Independence

Some state systems are directly bound to their frameworks; this includes MobX, hooks and other native systems in React
such as setState and context. Other systems like RxJS, RxDB, Immer and Immutable are free of dependence to React or any 
one framework; RxJS for instance is also used heavily by Angular. 

This means for instance that independent systems can be used in other contexts such as server side JavaScript in 
Express, Nest 

## Testability

Clearly the more independent a framework is the easier it is to test apart from its presence in the view layer. 
This in general makes it much faster to test and debug. This may seem trivial and it is when you just begin - but as 
applications evolve and mature and develop complex issues, testing becomes extremely important as a mechanic to maintain
and improve application functionality. 

## Flexibility

This is catch all for a few details that may seem minor but in practice can be quite important. 

### Composable actions

Can one action call another one?

## Composable state

Can you embed sub-states in a larger system? Being able to nest and reuse structure in a larger context
can make it easier to scale operations. 

### Transactional integrity

Can you contain and regress changes on the event of an error?

### Async friendliness

Can actions call other actions? Conversely, do actions create unnecessary asynchronous delays making instant analysis
of state difficult?

### Filtering and validation hooks

Can you "clean up" data changes or reject changes with ad-hock "tests" of the state?

## In summation

The choices above and the combination of features they drive really color the usefulness and scalability of
state in a growing applicaiton. 