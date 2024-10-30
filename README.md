# ELearnApp

ELearnApp is an educational platform developed using Angular 17 with standalone components and RxJS. The primary objective of this application is to create a dynamic educational environment that enhances communication between students and trainers. The portal leverages AWS API Gateway for backend communication, ensuring smooth interaction with various services.

## Table of Contents

- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Static Assets](#static-assets)
- [Dark Mode](#dark-mode)
- [Getting Started](#getting-started)
- [Mocked Users](#mocked-users)

## Features

- **Dynamic Educational Environment**: Facilitates interaction between students and trainers.
- **CRUD Operations**: Supports creating, reading, updating, and deleting user data.
- **JWT Authentication**: Ensures secure access to the application.
- **Route Guards**: Protects routes and ensures only authorized users can access specific functionalities.
- **Profile Management**: Users can edit their profiles, upload photos, and manage their training sessions.
- **AWS Integration**: Utilizes AWS API Gateway for backend communication and S3 buckets for storing and serving static images.
- **Dark Mode**: A dark theme option is available to enhance user experience and reduce eye strain.

## API Endpoints

The application communicates with various backend services through the following API endpoints:

```json
{
  "login": "https://lryie611ua.execute-api.eu-north-1.amazonaws.com/dev/login",
  "register": "https://lryie611ua.execute-api.eu-north-1.amazonaws.com/dev/users",
  "myAccount": "https://lryie611ua.execute-api.eu-north-1.amazonaws.com/dev/myAccount",
  "logout": "http://localhost:8000/api/logout",
  "changePassword": "https://lryie611ua.execute-api.eu-north-1.amazonaws.com/dev/change-password",
  "editUser": "https://lryie611ua.execute-api.eu-north-1.amazonaws.com/dev/edit",
  "myTrainingTrainer": "http://localhost:8000/api/trainings/my-trainings-trainer",
  "myUsers": "https://lryie611ua.execute-api.eu-north-1.amazonaws.com/dev/my-users",
  "allTrainers": "https://lryie611ua.execute-api.eu-north-1.amazonaws.com/dev/trainers",
  "uploadPhoto": "https://lryie611ua.execute-api.eu-north-1.amazonaws.com/dev/import-photo",
  "myTrainings": "https://lryie611ua.execute-api.eu-north-1.amazonaws.com/dev/my-trainings",
  "addMyUsers": "https://lryie611ua.execute-api.eu-north-1.amazonaws.com/dev/add-my-users",
  "createTraining": "https://lryie611ua.execute-api.eu-north-1.amazonaws.com/dev/create-training"
}
```

## Static Assets

Static images are served from an AWS S3 bucket, providing a seamless and efficient user experience for image handling.

## Dark Mode

ELearnApp includes a Dark Mode option to enhance the user experience by reducing eye strain and providing a visually appealing interface, especially when viewing static images served from AWS S3. Users can toggle between Light and Dark modes, with their preference saved for future sessions. This feature complements the seamless and efficient image-handling experience provided by AWS S3.

## Getting Started

Run ng serve for a dev server. Navigate to http://localhost:4200/.

## Mocked Users

Test Trainers:

```json

{[
    {
        "username": "stTest",
        "password": "test"
    },
    {
        "username": "IvTest",
        "password": "test"
    },
    {
        "username": "mTest",
        "password": "test"
    }
]}
```

Test Students

```json
{[
    {
        "username": "student1Test",
        "password": "test"
    },
    {
        "username": "student2Test",
        "password": "test"
    },
    {
        "username": "student3Test",
        "password": "test"
    }
]
}
```
