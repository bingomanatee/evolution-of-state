# All Your Base Belong To Us: Javascript developers Assault the Server Side

Around the same time Ryan Dahl, beloved author and engineer, introduced
Node.js in 2010. Node allowed JavaScript to be run on the server, allowing it to
manage server side API endpoints or whole sites, using libraries like Express.js
to create site servers in a codebase much more concise than the ever-expanding
Ruby on Rails, and often with greater performance.

Node faced stiff resistance to the current standards, Rails and PHP. To date,
it exists on a minority of sites. But it would serve another role as the
foundation for advanced JavaScript preprocessors including WebPack,
TypeScript and CoffeeScript, and is the basis for all modern frontend systems
from React and Vue to Angular and RxJS. Virtually all open source libraries
are exposed to developers through NPM.

## The Node Package Manager

One of the foundational building blocks of Node.js was a system of Modules,
accessed by the Node Package Manager developed by Isaac Z. Schlueter. It addressed
a specific "Pain point" that occurs when included libraries depend on different
versions of the same library. Other languages like Rails that placed all
included libraeries in a "flat" directory cannot support multiple versions
of a given library. NPM's ability to place dependencies in a subfolder
of their parent library, permits multiple versions of a given dependency
to survive by putting them in different directories in the file system.
