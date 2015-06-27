# Good Tunes WWW

This is the WWW for Good Tunes.

## Getting started

1. You need to build the image `docker build -t good-tunes-www .`
2. Run `docker run --name good-tunes-www -p 3010:80 -d good-tunes-www`
3. Run `boot2docker ip` to find out what IP your boot2docker VM is running on
4. Browse to `http://[boot2dockerIP]:3010`
