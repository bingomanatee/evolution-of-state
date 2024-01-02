# Delayed Gratification: 
## Async and State

Async is problematic when it comes to state systems. The ideal pattern an action
is for the change to be processed *immediately*, prepared in a nice little bubble
of change to be validated, and then either rejected or accepted. 

Asynchronous processes include work done on a separate thread, or subscriptions to a
service or DOM element, but usually imply the existence of a networked API call. 
This generally is a __multi part process__: 

1. Forming the query to be presented to the remote data source from user input and/or 
   existing values in the state
2. Transmitting the query to the remote data source (and flipping switches in state to indicate
   that we have a "request in process")
3. Receiving data from the remote data source
4. Filtering the data to pick and format a potential change in the State Engine
5. Rejecting bad data and either expressing the rejection as a State managed error field
   or logging the error to a peer system built for error handling
6. Submitting the processed change into the State Engine

This implies every Async action has at least three distinct parts, the equivalent of a 
Promise's 'try/catch/error' subparts. Where this becomes problematic is that it is 
*impossible to contain an asynchronous action in a transactional context.* each of the three
(or more) sub-actions can be transactionally contained, but the whole arc cannot. This is because
the async "gap" between the call and response leaves time for the state system to move on and 
do other things and to "roll back" the state system on the occurrence of a remote error
(or a code error in part of the async action) is far too problematic. 

## Cancellation of asynchronous requests

One of the great hazards of using Promises in JavaScript is that they are autonomous and cannot be
cancelled externally. For instance if you have a panel in your application that displays user information,
you may make an async request to fetch a picture of that user. If the user logs off while that request is in transit
(or worse yet logs off then logs in as another user) you do not want to finish "fulfilling" the registration
of the user request after user's image comes back to the State System. 

This is one of the reasons that *using promises in State is not always a good idea.* 

## The Observable Pattern

What is the alternative? the __Observable pattern__ as implemented by [RxJS](https://rxjs.dev/guide/overview)
or other similar systems. (But honestly, mostly, by RxJS.) Where a Promise locks its flow in closure, 
Observables can accept events and responses intermittently and also, can be *cancelled* from the outside. 
The term for that is "completed" but the meaning is essentially, we are cancelling all further listening
and response to a given channel of communication. A completed/cancelled Observable will no longer execute;
it's *listeners* when an incoming message is sent to them. 
Like a cell phone, when it is turned off (yes, you can do that; try it sometime.) it will not ring. 

Also, Promises are *singular* -- they only accept one response and have one initial trigger. Observables can
accept any number of signals (until they are "completed"). [This article](https://www.wonderlandlabs.com/articles/javascript/mastering-rxjs)
further details RxJS and Promises and other event systems by comparison. 

## Tracking pending requests

There is more than one way to track signals in flux. One is with a simple "sent" flag in state. 
The other is by tracking each request for data with a formal "request" object containing documentation on
what was sent, to whom, when, and anything else that is useful in a record in state. Then, when a response is
received the request token can be updated (to mark it as fulfilled) and / or "flushed" from state memory. 
Formal request tokens can be one way of telling a promise-based system to not complete its submission of the new
data to State, for instance. 

Where this may be important is you might find it better to "lock up" a record form against user changes 
after the send button has clicked. Also, you may review pending requests with an unusual lifespan to detect 
"broken" apis, or the fact that the user no longer has a working internet connection. You don't want to 
lock up UX forever, if the reasonable expectation is you'll never hear back from a remote server.

Also, there are times when multiple parts of the UX make the same request for remote data (almost) simultaneously.
If you know there is an outstanding request for a specific record, you can make all these requests "watch" for the
first request of a specific piece of information and "piggyback" on that response, instead of "hammering" the API
with multiple identical requests. 

It can also be useful to rationalize multiple *related* requests; for instance a request to *fetch* a given record
rapidly followed by an attempt to *delete* or *update* that same record. If you can reasonably expect a record to change,
you may make all pending requests for information wait for the response to *change* that record complete. 

In sum the goals of a remote mirror should be to 

* Allow cancellation of requests for information that are no longer relevant
* Prevent redundant identical requests from being sent to the APIs 
* Be intelligent about managing fetch requests and change requests to the same target

One example of this is that if you ask for a single record, then a range of records, and the latter request
returns faster for some reason, you should be willing to accept the data from the recordset to also satisfy
the request for a single record (provided all the fields needed are present). This is perhaps "over-designing"
but it is an option if your system is well engineered, and if you can easily make your system more responsive, why not?