# City List App

A simple React app to display a list of cities in a table format with filtering and sorting functionality.

## Features

- **Display Cities**: Click "Display Cities" to load city data.
- **Filter**: Search cities by name or state.
- **Sort**: Sort cities by name or state in ascending/descending order.
- **Table View**: Displays cities in a structured table format.

## Technologies Used:

- **React**: For building the UI.
- **CSS Flexbox**: For responsive layout.
- **HTML Table**: For displaying cities.
- **Jest**: For writing and running unit tests.
- **React Testing Library**: For testing React components.

## Setup

### Prerequisites

- **Node.js** and **npm**

### Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/masonma21/city-list-app.git

2. Navigate to the project directory:
    ```bash
    cd city-list-app

3. Install dependencies:
    ```bash
    npm install

### Running the APP

Run the following command to start the app:

```bash
npm start
```

After that, open [`http://localhost:3000`](http://localhost:3000) in your browser to view the app.

### Testing

This project uses unit tests for verifying the functionality within this app. The tests are written using React Testing Library and Jest.

Use the following command to run the tests:

```bash
npm test
```

## Project Structure

```
city-list-app/
├── public/
├── src/
│   ├── App.js          # Main component
│   ├── App.css         # Styles
│   ├── App.test.js     # Ensure all feautures work as expected
│   └── index.js        # Entry point
└── README.md
```

## License

This project is licensed under the MIT License.

