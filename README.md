# theScore "the Rush" Interview Challenge
At theScore, we are always looking for intelligent, resourceful, full-stack developers to join our growing team. To help us evaluate new talent, we have created this take-home interview question. This question should take you no more than a few hours.

**All candidates must complete this before the possibility of an in-person interview. During the in-person interview, your submitted project will be used as the base for further extensions.**

### Why a take-home challenge?
In-person coding interviews can be stressful and can hide some people's full potential. A take-home gives you a chance work in a less stressful environment and showcase your talent.

We want you to be at your best and most comfortable.

### A bit about our tech stack
As outlined in our job description, you will come across technologies which include a server-side web framework (like Elixir/Phoenix, Ruby on Rails or a modern Javascript framework) and a front-end Javascript framework (like ReactJS)

### Challenge Background
We have sets of records representing football players' rushing statistics. All records have the following attributes:
* `Player` (Player's name)
* `Team` (Player's team abbreviation)
* `Pos` (Player's postion)
* `Att/G` (Rushing Attempts Per Game Average)
* `Att` (Rushing Attempts)
* `Yds` (Total Rushing Yards)
* `Avg` (Rushing Average Yards Per Attempt)
* `Yds/G` (Rushing Yards Per Game)
* `TD` (Total Rushing Touchdowns)
* `Lng` (Longest Rush -- a `T` represents a touchdown occurred)
* `1st` (Rushing First Downs)
* `1st%` (Rushing First Down Percentage)
* `20+` (Rushing 20+ Yards Each)
* `40+` (Rushing 40+ Yards Each)
* `FUM` (Rushing Fumbles)

In this repo is a sample data file [`rushing.json`](/rushing.json).

##### Challenge Requirements
1. Create a web app. This must be able to do the following steps
    1. Create a webpage which displays a table with the contents of [`rushing.json`](/rushing.json)
    2. The user should be able to sort the players by _Total Rushing Yards_, _Longest Rush_ and _Total Rushing Touchdowns_
    3. The user should be able to filter by the player's name
    4. The user should be able to download the sorted data as a CSV, as well as a filtered subset
    
2. The system should be able to potentially support larger sets of data on the order of 10k records.

3. Update the section `Installation and running this solution` in the README file explaining how to run your code

### Submitting a solution
1. Download this repo
2. Complete the problem outlined in the `Requirements` section
3. In your personal public GitHub repo, create a new public repo with this implementation
4. Provide this link to your contact at theScore

We will evaluate you on your ability to solve the problem defined in the requirements section as well as your choice of frameworks, and general coding style.

### Help
If you have any questions regarding requirements, do not hesitate to email your contact at theScore for clarification.

### Installation and running this solution
#### Required tools
Docker, Docker compose

1. Install docker and docker-compose
2. cd to top level of repo directory
3. `docker-compose build`
4. `docker-compose up --detach` (or without detach argument to see container logs)
    1. On the first time booting the stack up, need to run migrations
    2. `docker-compose exec web bash` -- connect to the container running the Django application
    3. `python manage.py migrate` -- run migration command
    4. `exit` -- exit the container
5. navigate to `localhost:80/nfl-rushing`

#### Front end
The front end is a React application, created with Create React App (using the TypeScript template).

Core libraries: Redux, React-Redux, Redux-Thunk, Typesafe Actions
##### Required tools
Yarn

1. cd into front-end directory
2. `yarn install` to install javascript dependencies
3. `yarn run start` to start a webpack dev server

NOTE: If you choose to run the docker-compose under a docker-machine -- may need to change `front-end/src/constants.ts` to the docker-machine env ip address. Currently it is assuming the server is addressable from `http://localhost:80`. So far, I have only been using the native docker driver on Linux.

#### Server Tests
Required: poetry -- https://python-poetry.org/docs/#installation

So far, I have been running the Django tests I've written on the host machine. So, you need the dependencies installed via poetry locally (it is automatically in a virtualenv).

The tests I have right now, are more on the integration side rather than strictly unit tests, as this is what Django is readily able to do, and provides convenient utilities for loading fixture data.

1. cd to `web` directory
2. `poetry install`
3. `./bin/test` -- runs poetry command to launch test; uses a different settings file from normal, instantiating an in-memory database instead of postgres

### High level explanation

This solution runs 3 containers with docker-compose: nginx webserver, django application (backed by gunicorn), and a PostgreSQL database.

Using a database so that the file does not have to be read on every request. Also, crucial for the future use of the system to handle > 10K records.

A liberty of the data model was taken when I created the data migration to load the data into the database. Namely, that the `Lng` (longest rush) is a string in the json file, with a `T` ending character indicating it is a touchdown. My data model stores the longest rush as a plain integer and has a columnn to store a boolean indicating the longest rush resulted in a touchdown. The `Yds` (total rushing yards) was also a problem, as some of the values were strings and included commas.

NOTE: original `rushing.json` moved to migrations folder and renamed `0002_rushing.json` to be co-located with the migration that uses the file. After the migration is run, that file is not used again.

#### Extensions

- indexes on columns used in sorting/filtering
  - very easy to add with Django migrations
- if dataset becomes very large and the CSV cannot be generated in-memory in a timely fashion, use asyncronous processing (Celery is the standard for Django) to offload creating the CSV. Return a url where the finished file will be found (some other storage, like S3)
