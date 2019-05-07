# Hash-Service 
## Kindur home assigment
Encryption and decryption API service using SHA256 hashing algorithm.

### Stack: 

Express, Mongodb, Jest, Webpack with Babel, ESlint.

### End Points:

##### POST - encrypt message

```
POST https://204.48.29.202:8080/api/messages
Headers: "Content-Type": "Application/JSON"
Body: { "message": "YOUR ORIGINAL UNICODE MESSAGE" } 

RESPONSE {
"digest": "2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae"
}
```

##### GET - extract message
```
GET https://204.48.29.202:8080/api/messages/YOUR-ENCRYPTED-HASH

RESPONSE {
"message": "foo"
}

```


## Installation
(tested on Mac with node v10.15.0)

* install Node v10.15.0 (https://nodejs.org/en/download/)
* clone Repo: 
> $ git clone https://github.com/ronerlih/hash-service.git
* install packages (from within dir):
> $ npm install

* set up enviroment variables:
> export MONGO_USER=k****r

> export MONGO_PASS=********

* run scripts:
> $ npm run webpack

> $ npm run nodemon

## Tests

> $ npm run test

Server is running on [http://204.48.29.202:8080/](http://204.48.29.202:8080/)

#### TO-DO: 
* add documentation of API error code responses
* load tests
* Further unit tests
* and much more.

#### command line requests:
* POST message:
> $ curl -X POST -H "Content-Type: application/json" -d '{"message":"foo"}' http://204.48.29.202:8080/api/
* GET message:
> $ curl -i http://204.48.29.202:8080/api/messages/2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae 
* validate hash using openssl:
> $ echo -n "foo" | shasum -a 256