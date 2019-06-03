## NEM-Boilerplate
### A Node, Express, Mongoose boilerplate
---

To install
```
git clone https://github.com/GabrielvonPlaten/NEM-boilerplate.git
mv NEM-boilerplate server
cd server
```

Before you start the server locally, you need to change the default values in the config files into your own values. The two most important values are **jwtSecret** and **mongoURI**. After you are done, you are ready to initiate the server using nodemon.
```
nodemon app.js
```

---
## File Strutre
```
+config
│  config.json
│  db.js
│
+middleware-
│  auth.js
+models-
│  User.js
│
+routes-
│  api-
│  auth.js
│  user.js
│
│.env
│.app.js
```