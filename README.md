# Good Tunes WWW

This is public facing site of [Good Tunes](http://www.goodtunes.org).

## Libraries used

To speed up development I have used JSPM which is a wrapper around System API. JSPM imports the dependencies into the project on run time and as requested.

An issue that needs figuring out is preparing the site for deployment. 

## How to run

Ideally I will Dockerise this thing as that seems to be what the cool cats are doing.

1. Edit the local-goodtunes.conf so that the "root" is pointing to the correct directory.
2. Copy the local-goodtunes.conf to your nginx conf.d folder.
3. Run `npm install` this will also install the JSPM dependencies too.
4. Run `nginx` to start your server.
