# Business Technology Risk Assessment Website and System Proposal for Information Technology

## Technologies and Main Libraries

- **Node.js**: This is the primary platform to build your backend application.
- **Express.js**: Used as a web framework to handle HTTP requests and create APIs.
- **Prisma**: An ORM (Object-Relational Mapping) for Node.js and TypeScript, used to interact with the database. The current version you're using is `@prisma/client`.
- **bcrypt**: Library for password hashing.
- **body-parser**: Middleware to parse data from HTTP requests (`req.body`).
- **crypto**: Used to perform encryption, decryption, and generate random strings.
- **dotenv**: Library to load environment variables from a `.env` file into the Node.js process.
- **ejs**: Used as a view engine to render web pages.
- **express-session**: Middleware to manage sessions in Express.
- **method-override**: Middleware allowing the use of HTTP methods like PUT or DELETE in HTML requests.

## Model-Controller-View (MVC) Pattern

Your project may be using the MVC (Model-View-Controller) pattern to organize the application code. The main components of this pattern can be used as follows:

- **Model**: In your case, `models` are created to interact with the database through Prisma (`@prisma/client`). Models typically represent data objects in the database like User, Incident, Solution, and perform operations like create, read, update, delete (CRUD) through these models.

- **Controller**: Controllers are modules or files used to handle requests and return responses to clients. Controllers call models to perform data-related operations.

- **View**: Views are EJS files used to display the content of the application, like HTML pages rendered based on data returned from controllers.

With this pattern, you can organize your code clearly and maintain it easily.

Additionally, your project uses a `.env` file to manage environment variables, and has development dependencies like `prisma` to assist in development with Prisma.

## How to Use the Source Code

1. Clone the repository to your machine:
   ```bash
   git clone https://github.com/Hoang-Nguyen-Huy/ydcc2024-Securerror
   ```
2. Install npm and start
   ```bash
   npm i

   npm start
    ```

## [Our topic presentation](https://www.canva.com/design/DAGCS5j8ABw/jeNw_mpG6-caA9IAYnV7SQ/edit?utm_content=DAGCS5j8ABw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton&fbclid=IwZXh0bgNhZW0CMTAAAR13F39p-5qiVb-DXH0FthR56jzT1CpR6dy8G5TjjdQHvqgwCQXEBLIfjlw_aem_ATt5t0xfZGO-pijamhU7BUb-Kf3pcAtNmaSJY0T9_dAh-mQZbUBAcWrxJhKNNTAdRW4hEDIeITzQtCMFoPO-rvTA)
