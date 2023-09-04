<h1 align="center">
  <br>
<img src="https://raw.githubusercontent.com/martinbobbio/frontend-challenge-vibragaming/master/src/assets/images/branding/vibragaming.png" width="200">
  <br><br>
  <a href="https://backend-challenge-vibragaming.vercel.app/">
  Challenge Vibragaming - Backend
  </a>
  <br>
  <br>
</h1>
<h4 align="center">
  <a href="https://github.com/martinbobbio/frontend-challenge-vibragaming">Vibragaming - Frontend</a>
</h4>
<br>

## Description

This project is a backend API developed using Node.js with TypeScript and Express. It utilizes Axios for making HTTP requests and Dotenv for managing environment variables. The API interacts with the World time API to retrieve item information based on search parameters.

## Getting started

1. Clone the repository:

```bash
git clone https://github.com/martinbobbio/backend-challenge-vibragaming
```

2. Install dependencies

```bash
npm install
```

3. Start the server

```bash
npm start
```

4. The API will be accessible at http://localhost:3000/api.

### Timezone List

- URL: `/api/timezones`
- Method: `GET`
- Description: Method for obtainig list of timezones in a array of strings and app configurated timezones

- Body:

```JSON
{
    "list": [
        "Africa/Abidjan",
        "Africa/Algiers",
        "Africa/Bissau",
        // ...
    ],
    "current": [
        "America/Argentina/Buenos_Aires",
        "Africa/Cairo",
        "Asia/Dubai",
        // ...
    ]
}
```

### Timezone Detail

- URL: `/api/timezones/:name`
- Method: `GET`
- Description: Method for obtainig detail of timezones with more info

- Body:

```JSON
{
    "abbreviation": "-03",
    "client_ip": "",
    "datetime": "2023-09-04T11:02:04.344184-03:00",
    "day_of_week": 1,
    "day_of_year": 247,
    "dst": false,
    "dst_from": null,
    "dst_offset": 0,
    "dst_until": null,
    "raw_offset": -10800,
    "timezone": "America/Argentina/Buenos_Aires",
    "unixtime": 1693836124,
    "utc_datetime": "2023-09-04T14:02:04.344184+00:00",
    "utc_offset": "-03:00",
    "week_number": 36
}
```

### Timezone Add

- URL: `/api/timezones/:name`
- Method: `PUT`
- Description: Method for adding a timezone in the array of clocks in redis db

- Body:

```JSON
{
  "message": "Africa/Abidjan added to clocks."
}
```

### Timezone Delete

- URL: `/api/timezones/:name`
- Method: `DELETE`
- Description: Method for removing a timezone in the array of clocks in redis db

- Body:

```JSON
{
  "message": "Africa/Abidjan deleted of clocks."
}
```

## Scripts

- `npm start`: Builds the TypeScript files and starts the server using `node`
- `npm start`: Starts the server in development mode using `nodemon`.
- `npm run build`: Builds the TypeScript files to the `dist` directory.

<br><br>

## Quick Start with Docker

Below are the steps to get this project up and running using Docker.

### Step 1: Build the Docker Image

To get started, you need to build the Docker image for this project. Open a terminal and execute the following command in the root directory of the project:

```bash
docker build -t backend-challenge-vibragaming .
```

### Step 2: Run the Docker Container

Once you have built the image, you can run a Docker container based on that image. Use the following command to run the container and expose port 3000:

```bash
docker run -p 3000:3000 backend-challenge-vibragaming
```
