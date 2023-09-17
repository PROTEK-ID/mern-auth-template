# mern-auth-template
MERN Stack Authentication using Sequelize (MySQL as dialect) for backend template.

## setup
create `.env` file in root project or in server (recommended in root because hosting provider sometimes need to put in root directory), and create these variables:

```bash
DB_HOST = localhost
DB_PORT = 3306
DB_USERNAME = root
# leave empty if dont need password
DB_PASSWORD = 
DB_DATABASE_NAME = my_database

ACCESS_TOKEN_SECRET = random-string
REFRESH_TOKEN_SECRET = different-random-string
```

the value could be vary depending on your local database setup and also the dialect could be vary.
dont forget to create `my_database` in your database first or change it to other name that exist.

## installation
only need to run this for installing both client and server.

```bash
npm run install
```

## development
this command will run both client and server development server. run it in root directory (not client or server).

```bash
npm run dev
```

## deploy
customize the install command to follow the [installation part](#installation), if `start` command failed, customize it to look like this `npm start --prefix server`,
this is sometimes happen when npm cannot be used inside package.json a.k.a internal npm command through npm command.
