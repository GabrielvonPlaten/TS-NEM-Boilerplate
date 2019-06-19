## NEM-Boilerplate
### A Node, Express, Mongoose boilerplate
---

To install
```
git clone https://github.com/GabrielvonPlaten/NEM-boilerplate.git
mv NEM-boilerplate server
cd server
```

Before you start the server locally, you need to create a **.net** file on the root folder and add two variables for your jsonwebtoken secret and your mongoDB URIs.
  + jwtSecret
  + DB_URI_PROD
  + DB_URI_DEV

```
nodemon app.js
```

---
## Project Strutre
```
config
│     db.js
│
middleware
│     auth.js
models
│     User.js
│
routes
│─────api
│     │   auth.js
│     │   user.js
│
│.env
│.app.js
```