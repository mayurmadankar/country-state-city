# Country-State-City Management Application

A simple **ReactJS application** to manage countries, states, and cities in a hierarchical structure. Users can **add, edit, and delete** countries, states, and cities, with confirmation prompts to prevent accidental changes.

This project is built using **plain React and JavaScript**, without any external libraries or frameworks.

## Features

- **Country Management**
  - Add, edit, and delete countries
  - Deleting a country removes all its states and cities
- **State Management**
  - Add, edit, and delete states under a specific country
  - Deleting a state removes all its cities
- **City Management**
  - Add and delete cities under a specific state
- **Confirmation Alerts**
  - Prompts for confirmation before updating or deleting any entity

## Technologies Used

- ReactJS (Functional Components & Hooks)
- JavaScript (ES6)
- HTML / CSS (plain styling)
- Local Storage for persistent data

## Usage

1. Clone the repository:

```bash
git clone https://github.com/mayurmadankar/country-state-city.git
cd country-state-city
```

 2. Install Dependencies
```sh
npm install
```

 3. Start the development server
 ```bash
 npm start
 ```