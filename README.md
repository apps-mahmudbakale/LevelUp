# Credit Card Validation App - Level Up Assessment By Mahmud Bakale

This is a simple web application for validating credit card information using a backend API. The application allows users to enter their credit card details, including the card number, expiration date, and CVV. It then sends this information to a backend API for validation and displays the result to the user.

## Features

- Input form for collecting credit card information.
- Backend API for validating credit card details.
- Display of success or error messages based on validation results.
- Card type identification based on the card number prefix.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Validation**: Luhn's Algorithm for card number validation
- **Styling**: Tailwind CSS

## Getting Started

1. Clone the repository:
`git clone <repository-url>`
`cd LevelUp`
2. Install dependencies:
`npm install`
3. Run the frontend application:
`npm run dev`
4. Run the backend application:
`cd server`
`npm install`
`npm run dev`

This will launch the React development server and the Node.js backend server.

5. Access the application in your web browser at `http://localhost:3000`.

## Usage

- Enter your credit card information in the form fields.
- Click the "Submit" button to validate the information.
- View the validation result: success or error message.
- The card type will also be dynamically identified based on the card number prefix.

## API Endpoint

- The backend API endpoint for credit card validation is `/verify`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Credit card validation logic based on Luhn's Algorithm.
- Create React App for the React project setup.
- Express.js for the backend server.

Feel free to customize this README file to include additional information or specific details about your project. Provide clear instructions on how to install and use the application, and consider including a license section to specify the project's licensing terms.
