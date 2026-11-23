# ZFlights

This is a website idea I had for a while when I was first looking for flights.
I did already design the systems for fetching the data and emailing it to the user but,
as I configured I realized it was a pain spinning up a lambda every time I wanted something
done.

## Running the project
The entire project is available by simply running the `docker-compose` file.
```shell
docker compose up --build
```

This will initialize all the services. For the purpose of this branch however,
only one matters.

[frontend](http://localhost:5173): The website itself.

Please be sure to check out the interactive maps on the paths `/deals` and `/map`.
For the purposes of the branch I have disabled auth so you can either go there via a button
or by changing the url.
