# MMBlog Backend with Nest.js

This is the backend repository for a personal blog built with Nest.js, a powerful and extensible Node.js framework for building server-side applications. This backend server provides APIs for managing blog posts, file uploads, comments (soon) and user authentication.

## App Tree

```bash
├───src
│   ├───components
│   │   ├───article
│   │   │   ├───dto
│   │   │   └───entities
│   │   ├───auth
│   │   │   ├───dto
│   │   │   ├───guards
│   │   │   └───strategies
│   │   └───user
│   │       ├───dto
│   │       └───entities
│   ├───config
│   ├───decorators
│   ├───interceptors
│   ├───pipes
│   └───utils
└───types
    ├───article
    ├───auth
    ├───comment
    ├───tokens
    └───user
  ```
  
## Demo

[![mmb-showcase.gif](https://s2.gifyu.com/images/mmb-showcase.gif)](https://gifyu.com/image/SdQB5)
    
## Features

- CRUD operations for managing blog posts, upload files, and users.
- User authentication and authorization using JWT (JSON Web Tokens).
- RESTful API endpoints for easy integration with frontend applications.
- Robust error handling and validation using Nest.js built-in features.

## Technologies Used

- [Nest.js](https://nestjs.com/) - A powerful and modular Node.js framework for building server-side applications.
- [TypeScript](https://www.typescriptlang.org/) - A statically typed superset of JavaScript that enhances developer productivity.
- [MySQL](https://www.mysql.com/) - A popular database for storing blog posts, comments, and user data.
- [Passport](http://www.passportjs.org/) - A flexible and widely used authentication middleware for Node.js.
- [JWT](https://jwt.io/) - JSON Web Tokens for secure and stateless authentication.

## License

This repository has no license, then all rights are reserved and it is not Open Source or Free. 
You cannot modify or redistribute this code without explicit permission from the copyright holder (Mateusz Masek).

## Contact

If you have any questions, suggestions, or feedback, please feel free to contact me through [mateusz.masek@gmail.com](mailto:mateusz.masek@gmail.com) or [https://github.com/EckhartPL](https://github.com/EckhartPL).
