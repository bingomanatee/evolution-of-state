# The Dawn of State

Single page apps transported the "Application" from the server to the client 
and with it new orders of magnitudes of complexity.

Even as early as Backbone there was the concept of a "Model" - a dedicated engine managing 
data I/O. However, the application state was present in the "View" with its own local variables.
The idea of a "state" as a separate entity wasn't part of the vocabulary. This was one third 
of the architectural pattern known as MVC - Model View Controller. (or alternatively "MVVM").

This pattern carried on for the most part in Angular, which unlike Backbone had actual controllers. 
However while it had code for fetching data, it didn't have any formal model for storing it
or schema for its values. 

With great freedom came not a whole lot of responsibility; there were no clear guidelines as to 
where data goes or how applications were structured, and the quality and readability of the 
applications were elevated or burdened by the relative experience of the developer. 