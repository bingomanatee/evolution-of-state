# Immutability

Because of the way React analyzes its parameters and values passed down through Context, it tries to economize
effort by not re-rendering a component if its inputs have not changed. Part of this economy is that it presumes that
if a particular parameter is a container type (like an object, Map, Set or Array) that is the same *reference* as it was
in a previous render, it doesn't inspect its *content* deeply to see if some of its values have changed or moved.

To signal to React that a property has changed it is necessary to make sure to *clone* arrays or objects to
signal to the consumer that they have changed content or fields. This is the principle behind systems like
Immutable.js or [Immer](https://immerjs.github.io/immer/) That is one of the reason that Redux Toolkit uses 
Immer "Under the hood" to manage its data. . 
