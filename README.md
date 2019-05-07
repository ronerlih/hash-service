# Hash-Service 
## Kindur home assigment
Encryption and decryption API service using SHA256 hashing algorithm.

### Stack: 

Express, Mongodb, Jest, Webpack with Babel, ESlint.

### End Points:

##### POST - encrypt message

```
POST https://localhost:8080/api/messages
Headers: "Content-Type": "Application/JSON"
Body: { "message": "YOUR ORIGINAL UNICODE MESSAGE" } 

RESPONSE {
"digest": "2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae"
}
```

##### GET - extract message
```
GET https://localhost:8080/api/messages/YOUR-ENCRYPTED-HASH

RESPONSE {
"message": "foo"
}

```


## Installation
(tested on Mac with node v10.15.0)

* clone Repo: ...
* install packages (from within dir):
> $ npm install

* run scripts:
> $ npm run webpack

> $ npm run nodemon

## Tests

> $ npm run test

Server will be running on [http://localhost:8080/](http://localhost:8080/)

#### TO-DO: 
* add documentation of API error code responses
* load tests
* Further unit tests
* and much more.