# University Explorer - Node.js, Express, MongoDB

## Description
University Explorer is a Node.js-based web application that allows users to explore universities around the world. The app integrates with the [University Domains API](https://github.com/Hipo/university-domains-list-api) to fetch university data and uses MongoDB to store and manage the data for efficient querying. The application also provides CRUD functionality for university records.

---
## Table of Contents

- [Technologies](#technologies)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [GET /universities/capitals](#get-universitiescapitals)
  - [GET /university/:universityName](#get-universityuniversityname)
  - [PUT /university/:universityName](#put-universityuniversityname)
- [Functionality](#functionality)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

---
## Features
- **Search by Country**  
  Retrieve a list of universities in a specified country and the total count.
- **Search by University Name**  
  Fetch a university's details, including its website address.
- **Database Integration**  
  - Store university data fetched from the API.
  - Separate collections for at least five countries.
  - A consolidated collection for all universities.
- **CRUD Operations**  
  Add, update, and delete universities from the database.
- **Capitals Search**  
  Find universities in the capitals of five countries using single or separate collections.
- **HTML Forms**  
  User-friendly forms for input and result display.

---
## Technologies

- **Node.js**: Backend runtime
- **Express.js**: Web framework for building APIs
- **MongoDB**: NoSQL database for storing university data
- **Mongoose**: ODM (Object Data Modeling) for MongoDB
- **JavaScript (ES6)**: Programming language

---
## APIs Used
- **University Domains API**  
  - **Base URL:** `http://universities.hipolabs.com`  
  - **Endpoint:** `/search?country={country}`  

---

## Setup and Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or above)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [Postman](https://www.postman.com/) (optional for testing)

### Installation Steps
1. **Clone the Repository**  
   ```bash
   git clone https://github.com/yourusername/university-explorer.git
   cd university-explorer
Make sure you have the following installed:

- **Node.js** (version 14 or higher)
- **MongoDB** (or use a cloud-based instance like MongoDB Atlas)

### Steps to Set Up the Project

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/university-api.git
   cd university-api
