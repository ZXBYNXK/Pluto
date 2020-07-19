# MERN Social Media Project

### Back-End

```javascript
{
"dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "express-validator": "^6.6.0",
    "gravatar": "^1.8.0",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.9.23",
    "request": "^2.88.2"
}
```

#### Developing the back-end:

- Setting up mongoose database connection & server.
  - Creating a config folder and index file.

```javascript
// Location: ./config/index.js
module.exports = {
  mongoUri:
    "mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER-NAME>-xhcxn.mongodb.net/<APP-NAME>?retryWrites=true",
  jwtSec: "<ANY-STRING>",
  githubClientId: "<GET-FROM-GITHUB-OAUTH-DEV-SETTINGS>",
  githubClientSecret: "<GET-FROM-GITHUB-OAUTH-DEV-SETTINGS>",
};
```

- DB connection file.

```javascript
// Location: ./config/db/index.js
const { mongoUri } = require("../index");
module.exports = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Connected to database.");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
```

- Initialization of the server.js file & importing the above.

```javascript
// SERVER MAIN

// Server
const express = require("express");
const server = express();
const PORT = process.env.PORT || 5000;

// Database
const connectDB = require("./config/db");

// Connections
connectDB();
server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
```

- Creating the API.
  - Models
    - [./models/User.js](https://github.com/DariusRain/Pluto/blob/master/models/User.js) ( User model )
    - [./models/Post.js](https://github.com/DariusRain/Pluto/blob/master/models/Post.js) ( Post model )
    - [./models/Profile.js](https://github.com/DariusRain/Pluto/blob/master/models/Profile.js) ( Profile model )
  - Routes
    - [./routes/api/users.js](https://github.com/DariusRain/Pluto/blob/master/routes/api/users.js) ( Users route )
    - [./routes/api/posts.js](https://github.com/DariusRain/Pluto/blob/master/routes/api/posts.js) ( Posts route for users )
    - [./routes/api/profiles.js](https://github.com/DariusRain/Pluto/blob/master/routes/api/profiles.js) ( Profiles routes for users )
    - [./routes/api/auth.js](https://github.com/DariusRain/Pluto/blob/master/routes/api/auth.js) ( Authenticated routes )
  - JsonWebToken
    - Create a payload you want to sign and send a response <br />
      with the signed token.

```javascript
// Jwt
// Whats needed.
const jwt = require("jsonwebtoken");
const { jwtSec } = require("../../config");

// Creating a payload that you want to sign.
const payload = {
  user: userDocId,
};

// You would perorm a .find(<Unique Key/Value>) on a model
// in order to get 'userDocId' above in the payload.

// Sign the token, set experation, and callback and return either error or token.
jwt.sign(
  // Arg1 Payload: Could be anything.
  payload,
  // Secret string imported from ./config/index.js
  jwtSec,
  // Set an expiration date on the token.
  { expiresIn: 360000 },
  // Callback with either error either false or truthy val
  // and then the token as the second value passed
  (err, token) => {
    if (err) throw err;
    return res.status(200).json(token);
  }
);
```

- Token verification middleware for tokens sent by the client.

```javascript
// Location: ./middleware/auth.js
const { verify } = require("jsonwebtoken");
const { jwtSec } = require("../config");
module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");
  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied." });
  }

  // Verify token
  try {
    const decoded = verify(token, jwtSec);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid." });
  }
};
```

## Front-End:

```javascript
"dependencies": {
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.5.0",
    "@testing-library/user-event": "^7.2.1",
    "axios": "^0.19.2",
    "moment": "^2.27.0",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-moment": "^0.9.7",
    "react-redux": "^7.2.0",
    "react-router-dom": "^5.2.0",
    "react-scripts": "3.4.1",
    "redux": "^4.0.5",
    "redux-devtools-extension": "^2.13.8",
    "redux-thunk": "^2.3.0"
  },
```

_Darius Rain_
