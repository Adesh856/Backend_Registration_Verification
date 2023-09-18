# Registration Validation App

This is a Node.js application designed for user registration and validation. It utilizes various modules to perform different tasks including connecting to a MongoDB database, validating user IP addresses, sending OTP (One-Time Password) to users' phone numbers, and securing passwords.


## Prerequisites

Before running this application, ensure you have the following prerequisites installed and set up:

1. Node.js: Make sure you have Node.js installed on your machine. You can download it from [https://nodejs.org/](https://nodejs.org/).

2. MongoDB: You should have a MongoDB server set up and running. You can download MongoDB from [https://www.mongodb.com/](https://www.mongodb.com/).

3. Twilio Account: Create a Twilio account and set up your API credentials for sending SMS messages. You can sign up for Twilio at [https://www.twilio.com/](https://www.twilio.com/).

## Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/Adesh856/Backend_Registration_Verification.git
```

2. Navigate to the project directory:

```bash
cd Backend_Registration_Verification
```

3. Install the required npm packages:

```bash
npm install
```

## Usage

To run the application, follow these steps:

1. Configure the application (see [Configuration](#configuration) below).

2. Start the server:

```bash
npm start
```

3. Access the application in your web browser at `http://localhost:${process.env.port}`.

## Modules Used

This application uses the following modules to perform various tasks:

1. **mongodb**: For connecting to MongoDB and performing database operations.

2. **ipinfo**: For validating user IP addresses and retrieving additional information such as country code and city.

3. **twilio**: For sending OTP (One-Time Password) to user phone numbers using the Twilio SMS API.

4. **bcrypt**: For hashing and comparing passwords for user authentication.

## Configuration

Before running the application, you need to configure it by providing the necessary API keys and database connection details. Create a `.env` file in the project root directory and add the following environment variables:

```env
# MongoDB Configuration
mongourl=your_mongodb_uri
port=5000 || <Your prefered>
# Twilio Configuration
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# IPInfo Configuration (optional)
authip=your_ipinfo_api_key  ///IPInfo_auth
M_SID=<Message SID of Twilio>
```

Replace the placeholders with your actual values.

## Application Workflow

1. **User Registration**: Users can register by providing their name, email, phone number, and password.

2. **IP Validation**: The application validates the user's IP address using the IPInfo module. It may collect additional information such as country code and city.

3. **Sending OTP**: After successful registration and IP validation, an OTP is sent to the user's phone number using the Twilio module.

4. **OTP Validation**: Users are required to enter the OTP received on their phone to complete the registration process. The OTP is validated using Twilio.

5. **Password Security**: User passwords are securely hashed using the bcrypt module before storing them in the database.

6. **Database Storage**: User registration data is stored in MongoDB.




3. Access the application in your web browser at `http://localhost:3000`.

## Tech Stack

This application is built using the following technologies and libraries:

- **Node.js**: A JavaScript runtime used for building server-side applications.

- **Express.js**: A web application framework for Node.js used for building web applications and RESTful APIs.

- **MongoDB**: A NoSQL database used for storing user registration data.

- **Twilio**: A cloud communications platform used for sending OTP (One-Time Password) to user phone numbers.

- **bcrypt**: A library used for hashing and comparing passwords for user authentication.

- **ipinfo**: A module used for validating user IP addresses and retrieving additional information such as country code and city.







## API Endpoints

    "/register" - for registeration and send otp to the registeration number.
    "/verifyOTP" - for otp verification


## Contact Info

    Email:- taydeadesh591@gmail.com
    Contact Number:- 7709598474
