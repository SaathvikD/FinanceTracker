Finance Tracker

Description

Finance Tracker is a full-stack web application designed to help users manage their personal finances effectively. It enables users to log in, track expenses, and view a detailed breakdown of their spending. The application includes a responsive user interface, intuitive expense management tools, and a secure authentication system.

The project consists of two main components:

	1.	Backend: A Flask-powered REST API that handles user authentication, expense management, and database operations.
	2.	Frontend: A React-based single-page application (SPA) that provides users with a seamless interface to interact with the backend API.

Features

Backend

	•	Developed with Flask and SQLAlchemy.
	•	Secure user authentication with JWT (JSON Web Tokens).
	•	CRUD operations for managing expenses.
	•	Filtering and querying expenses based on category and date.
	•	Endpoint documentation for testing with tools like Postman.

Frontend

	•	Built using React with Bootstrap for responsive UI.
	•	User-friendly forms for adding, editing, and filtering expenses.
	•	Dynamic dashboard with daily expenditure summaries.
	•	Navbar updates with the logged-in user’s name, and a dropdown logout option.
	•	State management for authentication using React Context API.


Getting Started

Prerequisites

	•	Node.js and npm (for frontend)
	•	Python 3.7+ (for backend)
	•	Virtual environment for Python dependencies
	•	A web browser (e.g. Chrome)

Installation

Backend Setup

	1.	Navigate to the FinanceTracker-backend directory:

cd FinanceTracker-backend


	2.	Create and activate a Python virtual environment:

python -m venv env
source env/bin/activate  # macOS/Linux
env\Scripts\activate     # Windows


	3.	Install dependencies:

pip install -r requirements.txt


	4.	Run the Flask server:

flask run



Frontend Setup

	1.	Navigate to the FinanceTracker-frontend directory:

cd FinanceTracker-frontend


	2.	Install dependencies:

npm install


	3.	Start the React development server:

npm start



Usage

	1.	Sign Up/Log In: Create an account or log in to start tracking expenses.
	2.	Add Expenses: Add expenses with details like description, amount, category, and date.
	3.	Filter Expenses: Use category and date filters to view specific expenses.
	4.	View Dashboard: See a daily summary of expenditures and drill down into expense details.
	5.	Log Out: Log out securely via the dropdown menu.

Technologies Used

Backend

	•	Flask: Web framework
	•	SQLAlchemy: ORM for database interactions
	•	JWT: Secure authentication

Frontend

	•	React: User interface library
	•	Bootstrap: Responsive CSS framework
	•	Axios: HTTP client for API calls
	•	React Router: SPA navigation

Acknowledgments

	•	This project was developed with assistance from ChatGPT, it provided guidance in troubleshooting the code.

License

This project is open-source and available under the MIT License.

Feel free to adapt this template as needed for your project!