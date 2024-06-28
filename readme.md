<h1 align="center">
   <img src="/public/images/logo.svg" alt="Almanac" width="300">
</h1>

## getting started

you will need:

* Ruby 3.0 (i recommend using [`rbenv`](https://github.com/rbenv/rbenv))
* Probably easiest to install Rails as a system gem idk `gem install rails`
* Node 12, npm, and yarn (`npm install -g yarn`) (yeah i know i can't work out how to make rails not want it)
* Postgres (`brew install postgresql ; brew services start postgresql ; createdb ; psql -c 'create database almanac_development;`)
* A [`.env` file](https://github.com/bkeepers/dotenv) with our `UNSPLASH_ACCESS_KEY` and `UNSPLASH_SECRET_KEY`

run:

```sh
bundle
npm install
npm start
```

npm runs Rails and the webpack dev server. yeah whatever i'm a node dev really

## licence

Almanac
Copyright (C) 2020 Kara Brightwell

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
