# ZFlights

This is a website idea I had for a while when I was first looking for flights.
I did already design the systems for fetching the data and emailing it to the user but,
as I configured I realized it was a pain spinning up a lambda every time I wanted something
done.

## Demo Video
For those who cannot run the project, I have a demo video available here!

## Running the project
The entire project is available by simply running the `docker-compose` file.
```shell
docker compose up --build
```

This will initialize all the services. For the purpose of this branch however,
only 2 matter.

[frontend](localhost:5173): The website itself.

[json-server](localhost:8000): Static data meant to show off some features

Please be sure tp check out the interactive maps on the paths `/deals` and `/map`.
For the purposes of the branch I have disabled auth so you can either go there via a button
or by changing the url.
