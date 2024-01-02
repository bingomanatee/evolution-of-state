# Model View Controller

This is one of the most prevalent patterns in framework design across all
languages. Model View Controller (MVC) is based on the general pattern of
"Separation of concerns" -- that is, instead of trying to make one "mega system"
that solves all problems, design several specialized systems that deal with
specific parts of your overarching concern and link them.


Trygve Reenskaug created MVC while working on Smalltalk-79 as a visiting
scientist at the Xerox Palo Alto Research Center (PARC) in the late 1970s.
He wanted a pattern that could be used to structure any program where users
interact with a large, convoluted data set.

His design initially had four parts: Model, view, thing, and editor.
After discussing it with the other Smalltalk developers, he and the rest of
the group settled on model, view, and controller instead. [Wikipedia](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)

(As a background note, PARC was the source of most of the fundamental patterns
behind the Macintosh's initial design including the desktop, icons, windows, and 
the whole principle of a GUI).

Its worth noting that Backbone.js began with explicit systems with the names
'Model', 'View' and 'controller'. But defining these boundaries in existing
frameworks is not always easy.

The Model View Controller divides any human facing system in to three 'types' 
of systems:

1. **The Model**: which is where State belongs -- the basic information in the system,
2. **The View**: the visible part of the system the user interacts with in a GUI. React is at essence a "View manager."
3. **The Controller**: a somewhat difficult thing to define perfectly, the "orchestration" layer that
   coordinates communication between the Model and the View. 

## The dual use of the term "View" 

View is not just a term for user interface. It is also used by Database architects to describe
queries that summarize or organize data; these are often "parameterized" such as a view taking a single
record's ID that returns that record and related data. 

This concept is also present in frontend coding as a "selector" -- that is, a 
function or property that organizes or filters a cluster of data to make it suitable
for a specific purpose. 

## Alternate models

As good as MVC is at defining complex systems, other models exist besides MVC
to describe the same thing; this list is in roughly descending order of 
use in the community:

### Model-View-ViewModel (MVVM):
MVVM is a pattern commonly used in modern web and mobile applications. It enhances the separation of concerns by introducing a ViewModel, which serves as an abstraction of the View's state and behavior. MVVM is popular in frameworks like Angular and Knockout.js.

### Model-View-ViewModel-Controller (MVVMC):
MVVMC is an extension of the MVVM pattern that adds a Controller to manage navigation and application flow. It is often used in mobile app development, especially with platforms like iOS using frameworks like SwiftUI.

### Entity-Component-System (ECS):
ECS is a pattern commonly used in game development and simulation systems. It separates entities (objects), components (data), and systems (behavior) to create highly flexible and performant architectures.

### Event-Driven Architecture:
In an event-driven architecture, components or services communicate through events and event handlers. This approach is particularly useful for building systems that need to react to asynchronous events, such as message queues, IoT systems, and real-time applications.

### Model-View-Presenter (MVP):
MVP is an architectural pattern that separates the presentation logic from the UI components. In MVP, the Presenter acts as an intermediary between the Model (data) and the View (UI). It is often used in scenarios where testing and maintainability are crucial.

### Flux
Flux is an architectural pattern developed by Facebook for building web applications. It emphasizes unidirectional data flow and is commonly used with React applications. In Flux, data flows in a single direction, making it easier to manage state and application logic.

### Microservices: 
In a microservices architecture, a complex system is broken down into small, independently deployable services that communicate through APIs. Each service focuses on a specific business capability, which can make the system more scalable and maintainable.

### Hexagonal Architecture (Ports and Adapters):
Hexagonal architecture emphasizes the separation of concerns by structuring the application into ports (interfaces) and adapters (implementations). It is designed to be technology-agnostic, making it easier to swap out components without affecting the core logic.

### CQRS (Command Query Responsibility Segregation): 
CQRS is an architectural pattern that separates the command (write) and query (read) operations in a system. It is often used in systems where the read and write requirements differ significantly.
