<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src=".github/gympoint-logo.png" width="200px" />
</h1>

<h3 align="center">
  Bootcamp application
</h3>

<blockquote align="center">“Faça seu melhor, mas sempre com prazo de entrega”!</blockquote>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/jopcmelo/gostack-gympoint?color=%2304D361">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/jopcmelo/gostack-gympoint/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/jopcmelo/gostack-gympoint?style=social">
  </a>
</p>

## Overview

This is a repository made in bootcamp gostack of [Rocketseat](http://rocketseat.com.br).

This is an application ...

## Preparing and running application

> Cloning repository:

```shell
  ~ git clone https://github.com/jopcmelo/gostack-gympoint.git
  ~ cd gostack-gympoint/backend
```

> Installing dependencies:

```shell
  ~ yarn install
  or
  ~ npm install
```

> Setting up database

To the database you need to have a SQL database remote or localy. All sensible configs should be setted in environment as `environments variables`.

To make this localy, just create a .env file in root of application and put the values like the template `.env.example` file with the values that you want.

```shell
DB_HOST=localhost
DB_USER=postgres
DB_PASS=gympoint
DB_NAME=gympoint
```

> Preparing database

To prepare the database, you need to use Sequelize CLI, so to create and prepare database to use, just run:

```shell
  ~ yarn sequelize db:create
  ~ yarn sequelize db:migrate
  ~ yarn sequelize db:seed:all
```

If database already exists, just run the bellow command to delete it.

```shell
  ~ yarn sequelize db:drop
```

> Using Docker and Docker Compose

You can set your database with Docker and Docker Compose, using the follow commands:

```shell
  ~ cd ..
  ~ docker-compose up -d
```

## Documentation

There is a file called `insomnia.json` in ./backend/ of this repository, that is the exported documentation of [insomnia](https://insomnia.rest/).

Insomnia is a software similar to postman, you use that to test the requests to your application server side, seeing the response for each route with it params.