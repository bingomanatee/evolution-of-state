# Design Patterns in State Management

State has emerged as a discrete pattern; before drilling too deep into it,
lets go over a few preliminaries. It is the Model in the "Model/View/Component" trinity

## Where does State Exist?

State is principally an artifact of a web application, one driven by frontend
code. It is primarily *global* -- sharing data relevant to an entire web application -- 
but it can also be *local* to a component or a *branch* of components. 

## What is the lifespan of State?

Some or all of state's data can be a mirror of a persistent data source (database)
synchronized through REST or a similar artifact. Some data is purely *transient* and 
disappears / re-initializes when a page is reloaded. 

### Extending lifespan of State using storage

Newer mechanics can be used to extend the scope of state:

* 'sessionStorage' can be used to keep data alive across page reloads or even between tabs.
* 'localStorage' and IndexedDB can be used to persist data indefinitely. 

Both of these mechanics are maintained by a specific **browser** on a single
**computer**, and behavior on mobile browsers can be hit and miss. 

## Why is State useful?

Web applications are composed of a series of view components. Applications under rapid 
development shift and remove components on a regular basis, and depending on the presence
of a parent component for provision of strategic resources (user record, shopping cart) 
is a fragile practice. It can be especially burdensome when components are isolated for testing. 

Creating view-independent providers of data can make applications more consistent and easier to test.
Further, a state system that is independent of view architecture can be useful by keeping key portions
of the application insulated from changes in the view layer's API. And testing an independent state system
can be faster and more practical than employing middleware view scaffolding to test changes that have 
nothing to do directly with the DOM. 

Lastly, extracting complexities like data validation, API I/0 and storage synchronization from the view layer
can make it easier to comprehend both the application state engine and the view layer systems as discrete cycles.

## What forms of data goes in State? 

State can contain virtually anything. But for the most part state contains *basic* data elements:

* Scalar data - numbers, strings, possibly Symbols
* Basic structures: Arrays, Objects
* (possibly) Basic record types: Maps, Sets

What does NOT go into state (or if it does, is stored in a separate registry and not "managed" like state data)
are 

* Instances that depend on class/prototypically set values and methods
* Any references or structures that have references in them (web socket connections, etc.)
* Canvas hooks, DOM, links to WebGL, sockets or windows, data connections, images, large BLOBS of data.
* Anything with *circular references*
* Complex instances from external libraries
* Anything that cannot be easily cloned or serialized into/from string/JSON formatting

##  What types of information does State track? 

State can track any sort of useful data but it generally falls into one of three "pools" of content:

* Mirrors of server side data, as exposed through APIs, REST or GraphQL. 
* Updates of server side data intended to be eventually synced with remote systems, as in updates to user preferences, before a "save" button is pressed.
* Local pools of data, such as a shopping cart of product requests, that are only synced at the end of long processes (if ever). 
* Tokens tracking things like progress through a wizard or which panel of an accordion UX is open, or a pagination index

State also includes a quality of data called *selectors* that simply recombines the existing state into a useful
expression, such as a "total" selector that reflects the sum cost of all items in a shopping cart, or 'error' values tied
to user fields that the UX needs to communicate to the user such as an insufficiently secure password field or a character count of a text field. 

One of the most fundamental pieces of information stored in state is the identity and authenticating tokens 
for the logged in user, or their absence, which drives large elements of the user interface and is usually 
required by APIs that save or change data back to the server.

## What makes a State Engine different from other parts of a web application?

A state system is critical for an applications' integrity. It usually has middleware or subsystems that:

* Enforce type or schema over updates
* Allow subscription (and unsubscription) to its content
* Enforce business laws (such as maximum shopping cart size)
* Manage thrown errors intelligently
* Allows tracing of data and change requests to debug errors
* Allows the reuse of successful sub-patterns to accelerate development
* Contains systems to synchronize data between remote servers and/or browser storage.

### Data Fitness

This is a specific form of a general requirement of "Data fitness;" ensuring that the data stored in a state
system is suitable for all purposes that it is intended for. If a state system is intended to be saved to 
localStorage for instance, ensure that the data is either composed of the subtypes of data that JSON accepts
(i.e., not Maps) or can be *serialized* to and from all the system that the state can interoperate with. 

### Data Hygiene

In general, this means only putting things into the State system that are meaningful to the web application. 
This includes filtering miscellaneous fields out of API data, and *denormalizing* instances of the same data
to indexed collections. State resources take up memory and space in storage. There may be cases where 
storing huge volumes of data like lists of messages in a message-board are *not* worth clogging the state 
system with, but are better to pass directly to the view layer from APIs. (or at the least are not serialized to local storage). 

Vast chunks of data, such as Canvas layers or image data, are as a rule not suitable for a state system because
you will want to update them rapidly and toss them away when you are done with it, and not journal or filter them 
or cache them in disk storage. 

## Independence

State engine as a rule are self contained and separate from the mechanics of a view engine. In general,
binding state management to a view engines' mechanics make it very fragile as view systems upgrade and evolve
in ways that a state engine should be immune to. 

For instance the Injection Dependency of Angular has evolved and shifted over 17 versions in two decades. 
Using Angulars' DI system to build a state engine with would be unwise, and mean it is not portable through
the years as Angular matures. By contrast, RxJS and Immer are self-contained and while transporting information 
from a state system to a view layer may require re-engineering, that is a much smaller scope of work than it would be
to rebuild the whole system from scratch. 

What would happen for instance if the next full version of React dropped hooks? How much of your application code
would you have to rebuild in some other fashion? Put another way -- how much *less work* would it be had the core
components of your business logic been embedded in a self-contained state engine?

### Is a State Engine a Database?

The answer is in part. Minimal state engines are noting more than Databases, or Data Dictionaries. But 
there are ways in which State engines *aren't as good* as Databases and ways in which they are *more* than
a Database. 

* __Databases generally have *strong* and usually *exclusive* schema.__ Every field in a record of a database
  has a single specific type and generally can only have the fields that its schemaa expects. 
* __Databases have a much broader storage capacity__. Databases have been optimized to store terrabytes of data;
  state systems at best can manage a window into a slice of that data due to being used on a variety of 
  platforms, some with very small memory capacities and limited CPUs.
* __Databases have relations and can easily express deep graphs.__ State systems generally don't manage
  relationships well (or at all).
* __Databases have a rich language (SQL) for both requesting and updating data.__ Postgres can for instance issue 
  SQL command to create temporary clusters of data with names, then query and join those names; no state system
  I know of have this rich lexicons, though most have a limited set of query commands (limits/counts, fields, criteria)
  they do not approach the richness of SQL. 
* __Databases have transactional integrity.__ You can issue a set of commands inside the boundaries of a transaction
  and if a failure arises, roll back any pending operations and restore the Database to a "last known good state". 
  Only one State system I know of currently attempts Transactional integrity
* __State systems use a richer scripting language than any Database.__ State systems can use the full power of their
  language to parse, sort, manipulate and form data in between requests and updates. Few databases have built in scripting
  and those that do are generally less powerful than a fully formed coding language. 
* __State systems have code to bind it to DOM and/or frontend frameworks.__ This is clearly not the responsibility of 
  any backend store. 

That being said -- Database engineers have been solving data problems for decades, and the conventions and design 
decisions present in any first tier Database are excellent models of management systems. Further, the patterns and
naming conventions of a database are well known and useful when naming systems and processes. 

## In Summation 

State Engines should fulfill the following roles:

* __Independent__ of the systems that subscribe to them
* __Apply consistency__ to the form and organization of application data
* __Express business logic__ in a clear and consistent manner
* __Be Easy to test__ (or at least easier than the view layer)
* __Bridge data store__ in remote systems or browser storage but generally operate within the lifespan of a single page load
* __Synchronize data__ across a set of independent view components
* __Manage quality concerns for data__ including Schema, immutability and type