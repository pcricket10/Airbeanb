# Airbeanb
![project-image04](https://user-images.githubusercontent.com/44933925/172935659-684b7934-a6bf-4a34-91dd-58e1ab333b21.png)


## What is airbeanb?

Airbeanb is an Airbnb clone where instead of searching for a place to stay, you can search for beans and bean growers from all over. Logged in users can post and leave reviews

## Technologies used

### Frontend

- React
- Reactjs-popup
- Redux
- HTML
- CSS

### Backend

- Flask
- Python
- WTForms
- Postgres
- SQLAlchemy

## Airbeanb setup

1. Clone the Repository

```
   git clone git@github.com:pcricket10/Airbeanb.git
```

2. install dependencies

```
pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt && npm --prefix ./react-app install

```

3. create a `.env` file in the project root directory using `.env.example` as a guide

4. create a Postgres database and user using the values from the .env file

   ```
    psql
   ```

   ```
   CREATE USER <app name> WITH PASSWORD '<secure password' CREATEDB;
   ```

   ```
   CREATE DATABASE <database name> WITH OWNER <app name>;
   ```

5. migrate, seed, and run the flask app

```
   pipenv shell
```

```
flask db upgrade
```

```
flask seed all
```

```
flask run
```

6. start the frontend server

```
cd react-app
```

```
npm start
```
