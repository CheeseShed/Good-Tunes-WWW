# Good Tunes WWW

This is public facing site of [Good Tunes](http://www.goodtunes.org).

## Get started

I would recommend using a folder structure such as:

/goodtunes/
/goodtunes/www/
/goodtunes/api/

I have structured my files like this with the intention of Dockerising the projects.

You will also need to install:

1. nginx v1.8.0 (I installed this with Homebrew)
2. NVM
3. Node v4.1

I have used NVM to manage different versions of node on my computer.

To set up nginx copy my config file from the nginx folder to `/usr/local/etc/nginx/conf.d` you will also need to change the path to the project folder.

The WWW runs on port 7080.

## Developing

Run `npm install` which will also install the JSPM dependencies. JSPM is a package manager wrapped around SystemJS library. You will notice that Grunt or Gulp are not currently used. JSPM manages the process of importing dependencies and transpiling them in the browser. This is extremely fast.

I have used the CommonJS module format and in some places made use of `let` and `const` but the code is inconsistent. I used whatever I felt like using at the time.

No form of linting is used.

No tests exist.

I have used vanilla CSS.

## Libraries

The codebase is written using Angular 1.4, Angular Resource for RESTful services, Angular UI-Router for states.

## The current state

So far the WWW site is fairly basic but has the ability to register, login, view playlist(s), search for tracks from Spotify and add a track to a playlist.
