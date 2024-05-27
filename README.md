<p align="center" style="margin: 0px auto; margin-top: 15px; max-width: 600px">
    <a href="https://npmjs.com/package/Authilize"><img src="https://img.shields.io/npm/v/authilize"></a>
    <a href="#"><img src="https://img.shields.io/npm/dt/authilize"/></a>
</p>

## Introduction

> Library for authentication middleware using JWT

## Code Samples

Initialize Authilize instance

```js
const router = require("express").Router();
const { postController } = require("../controllers/controller");

const { isAuth, isAuthPass } = require("Authilize");

// POST
router.post("/", isAuth, postController);
router.post("/", isAuthPass, postController);

module.exports = router;
```

Controller example

```js
exports.postController = async (req, res, next) => {
  const { username, email } = req.decodedData // Get your data from req.decodedData.
  return res.status(200).json({ message: "successful" });
};
```

You can customize it as you like <br />
if not then the status code will be 401 by default and error message will be "Unauthorized Access"<br />
.env (VARIABLES MUST BE THE SAME)

```
AUTHILIZE_JWT_SECRET_KEY = Fdjjfklsdjfklasf
AUTHILIZE_STATUS_CODE = 401
AUTHILIZE_ERR_MESSAGE = Unauthorized Access
```

### If you are using isAuthPass and the token is invalid or not passed in the headers then req.decodedData will be undefined

## List of functions

| Functions | Description                                                                       |
| --------- | --------------------------------------------------------------------------------- |
| `isAuth`  | Function which checks if the user is authorized (retrieves bearer token from req) |
| `isAuthPass`  | Function which checks if the user is authorized (retrieves bearer token from req) |

## List of variables

| Functions | Description                                                                       | Default |
| --------- | --------------------------------------------------------------------------------- | ------- |
| `AUTHILIZE_JWT_SECRET_KEY`  | required (only for isAuth) |
| `AUTHILIZE_STATUS_CODE`  | optional | 401 |
| `AUTHILIZE_ERR_MESSAGE` | optional | "Unauthorized Access" |

## Installation

NPM:

```
npm install authilize
```

Yarn:

```
yarn add authilize
```
