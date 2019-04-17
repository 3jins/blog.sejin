# blog.sejin
It's running on [https://enhanced.kr](https://enhanced.kr)



## Before you use

This blog is not a blog platform, but is designed for the maintainer's own use, so some parts of the code (like my name) are hard-coded. It is not recommended to use the whole code for creating your own blog. (The appearance of the blog would be same with mine.)



## Usage

### To run this project

First of all, please **install** necessary packages for this blog.

```
npm install
```

Then you should **set an environment variable** to tell your server if it is test environment or not. Each mode will use different configuration info from `server/Configuration.js`. You can edit the configuration info if you need.

- Mac / Linux

    - production mode

        ```
        export SERVER_ENV=production
        ```

    - development mode

        ```
        export SERVER_ENV=development
        ```

- Windows

    - production mode

        ```
        set SERVER_ENV=production
        ```

    - development mode

        ```
        set SERVER_ENV=development
        ```

Now you can **build the server**.

```
npm run build
```

and **the bundle file**.

- production mode

    ```
    npm run wpp
    ```

- development mode

    ```
    npm run wpd
    ```

Great job! Let's run the blog on your own server!

```
npm start
```

### Upload & update posts

There's no admin page for this blog. You should upload and update your posts by synchronizing the blog database with your directory.

First of all, make some files to post in markdown form. The directory that post files should be in is '**md_files**' right under the project root path.

Then, synchronize your MongoDB database with command below.

```
npm run syncDB
```

### Rollback database

Each time you run `syncDB` script, the blog system will make a backup file of the database. The backup files would be created in '**backup**' path with a name in the form of '**{timestamp}.json**'. You can rollback your database with the latest backup file.

```
npm run rollbackDB
```

If you want to rollback your database with specific backup file, you can give the file name as an argument.

```
npm run rollbackDB 1553596117130.json
```

Argument can be just a single number. If you give '2' as an argument, the system will rollback the database with the 2nd-latest backup file.

```
npm run rollbackDB 2
```