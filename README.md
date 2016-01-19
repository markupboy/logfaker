#Logfaker

Generate fake logs with an accompanying JSON api.

##Installation and Usage

Logfaker requires the latest version of node (v5.4.0 at time of writing).  To install requisite dependencies, run:

`npm install`

and to begin the dev server run:

`set DEBUG=logfaker:* & npm start`

This will begin the web interface at http://localhost:8080 and the api endpoint at http://localhost:8080/log.

__Note__: Logfaker is intended for development use only and is in no way built to be used in production.
