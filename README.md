# blog-node-express-mongo-docker
A simple blog with Nodejs, express, mongodb, docker
#### This is my simple project with Nodejs, express framework, mogodb, and docker. 

## Get started
This is structor of my project:
```bash
📦nodejs-typescript
 ┣ 📂dist    ------------------------------------ The directory contains of buid file, it was created when you build the project
 ┣ 📂src     ------------------------------------ The directory contains all main source code                                  
 ┃ ┣ 📂constants -------------------------------- The directory contains all constans used for the project                                   
 ┃ ┃ ┣ 📜enum.ts -------------------------------- Defines the enums used for the project
 ┃ ┃ ┣ 📜httpStatus.ts -------------------------- Defines the status reponse for the http method
 ┃ ┃ ┗ 📜message.ts ----------------------------- Defines message
 ┃ ┣ 📂controllers  ----------------------------- The controllers
 ┃ ┃ ┗ auth.controllers.ts ------------------- Controller
 ┃ ┣ 📂middlewares ------------------------------ contains Middlewares
 ┃ ┃ ┣ 📜error.middlewares.ts ------------------- middlewares handle error, exception
 ┃ ┃ ┣ 📜file.middlewares.ts  ------------------- middlewares file
 ┃ ┃ ┣ 📜users.middlewares.ts
 ┃ ┃ ┗ 📜validation.middlewares.ts
 ┃ ┣ 📂models ----------------------------------- config models with database
 ┃ ┃ ┣ 📂database ------------------------------- contains entites
 ┃ ┃ ┃ ┗ 📜User.ts
 ┃ ┃ ┣ 📜Error.ts
 ┃ ┃ ┗ 📜Success.ts
 ┃ ┣ 📂decorator
 ┃ ┃ ┣ 📂controllerDecorator -------------------- Decorator of controller: method, controller,...
 ┃ ┃ ┃ ┗ 📜apiParameter.decorator.ts ------------ Defines the params use for swagger
 ┃ ┃ ┃ ┗ 📜apiProperites.decorator.ts ----------- Defines properties of api for swagger
 ┃ ┃ ┃ ┗ 📜controller.decorator.ts -------------- Defines controller
 ┃ ┃ ┃ ┗ 📜generateProperties.ts ---------------- Generate Properties of api
 ┃ ┃ ┃ ┗ 📜methods.decorator.ts ----------------- Defines method of api controller
 ┃ ┃ ┣ 📂controllerDecorator -------------------- Decorator of validate
 ┃ ┃ ┃ ┗ validate.decorator.ts ------------------ Defines validate of api
 ┃ ┃ ┣ 📜meta.keys.ts
 ┃ ┣ 📂routes ----------------------------------- The directory contains config, inital, register all router
 ┃ ┃ ┗ 📜users.routes.ts
 ┃ ┣ 📂services --------------------------------- The directory contains all services hanlde
 ┃ ┃ ┣ 📜bookmarks.services.ts
 ┃ ┣ 📂type ------------------------------------- contains type of project
 ┃ ┃ ┣ 📜ApiProperty.ts
 ┃ ┃ ┣ 📜BaseResponse.ts ------------------------ Defines the struct of response http
 ┃ ┃ ┣ 📜Parameter.ts
 ┃ ┣ 📂utils ------------------------------------ Other handle: eg: email,....
 ┃ ┃ ┣ 📜crypto.ts
 ┃ ┃ ┣ 📜email.ts
 ┃ ┃ ┣ 📜file.ts
 ┃ ┃ ┣ 📜helpers.ts
 ┃ ┃ ┗ 📜jwt.ts
 ┃ ┣ 📜index.ts
 ┃ ┗ 📜type.d.ts
 ┣ 📜.editorconfig
 ┣ 📜.env -------------------------------------- Eviroment variable
 ┣ 📜.eslintignore
 ┣ 📜.eslintrc
 ┣ 📜.gitignore
 ┣ 📜.prettierignore
 ┣ 📜.prettierrc
 ┣ 📜nodemon.json ------------------------------ use for run Typescript code directly without build to javascript in local
 ┣ 📜package.json ------------------------------ 
 ┣ 📜tsconfig.json
 ┗ 📜yarn.lock
```

Then you can view my code in this project. This project is just a demo and I used it to start learning express with mongoDb, so there will be many shortcomings. Looking forward to receiving everyone's contributions.
