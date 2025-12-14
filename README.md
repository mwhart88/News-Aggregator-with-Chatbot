# News Aggregator with Chatbot 🌐📰

![GitHub release](https://img.shields.io/github/release/mwhart88/News-Aggregator-with-Chatbot.svg?style=flat-square) ![License](https://img.shields.io/github/license/mwhart88/News-Aggregator-with-Chatbot.svg?style=flat-square)

Welcome to the **News Aggregator with Chatbot** repository! This project combines the power of artificial intelligence with a user-friendly interface to deliver Australian news in a structured manner. The system automatically collects, categorizes, and presents news articles, while also offering a Retrieval-Augmented Generation (RAG) chatbot to assist users in finding relevant information.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [API Documentation](#api-documentation)
7. [Contributing](#contributing)
8. [License](#license)
9. [Contact](#contact)

## Introduction

In today’s fast-paced world, staying updated with the latest news is crucial. This project aims to simplify that process for users in Australia by aggregating news from various sources. The integrated chatbot helps users interact with the news data, making the experience more engaging and informative.

For the latest releases, visit our [Releases page](https://github.com/mwhart88/News-Aggregator-with-Chatbot/releases). Here, you can download the latest version and execute it to explore the functionalities.

## Features

- **AI-Powered Aggregation**: The system uses machine learning algorithms to collect and categorize news articles automatically.
- **User-Friendly Chatbot**: The RAG chatbot allows users to ask questions and receive relevant news articles based on their queries.
- **Content Clustering**: Articles are grouped by topics, making it easier for users to find what interests them.
- **DevOps Friendly**: The architecture supports continuous integration and deployment, ensuring smooth updates and maintenance.
- **Microservices Architecture**: Each component operates independently, allowing for better scalability and reliability.
- **Responsive Design**: The frontend is built with React, TypeScript, and Tailwind CSS for a seamless user experience across devices.

## Technologies Used

This project utilizes a variety of technologies to deliver its features effectively:

- **Backend**: Flask REST API
- **Frontend**: React, TypeScript, Tailwind CSS
- **Machine Learning**: Natural Language Processing (NLP) for content categorization
- **Database**: MongoDB for storing articles and user interactions
- **DevOps Tools**: Docker for containerization and Kubernetes for orchestration

## Installation

To get started with the News Aggregator with Chatbot, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/mwhart88/News-Aggregator-with-Chatbot.git
   cd News-Aggregator-with-Chatbot
   ```

2. **Set Up the Backend**:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install the required packages:
     ```bash
     pip install -r requirements.txt
     ```

3. **Set Up the Frontend**:
   - Navigate to the frontend directory:
     ```bash
     cd ../frontend
     ```
   - Install the required packages:
     ```bash
     npm install
     ```

4. **Run the Application**:
   - Start the backend server:
     ```bash
     cd backend
     flask run
     ```
   - Start the frontend application:
     ```bash
     cd ../frontend
     npm start
     ```

Now, you can access the application at `http://localhost:3000`.

## Usage

Once the application is running, you can interact with the chatbot on the homepage. Here are some example queries you can try:

- "What are the latest news articles?"
- "Show me news about technology."
- "Give me updates on sports."

The chatbot will respond with relevant articles and summaries, making it easy to stay informed.

## API Documentation

The backend provides a RESTful API for accessing news articles and interacting with the chatbot. Here are some key endpoints:

- **GET /api/articles**: Fetch all news articles.
- **GET /api/articles/{id}**: Fetch a specific article by ID.
- **POST /api/chat**: Send a query to the chatbot and receive a response.

For detailed API documentation, refer to the [API Documentation](docs/API.md).

## Contributing

We welcome contributions to improve the News Aggregator with Chatbot. If you want to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push your changes:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Create a pull request.

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, please reach out to the project maintainer:

- **Name**: [Your Name]
- **Email**: [your.email@example.com]
- **GitHub**: [mwhart88](https://github.com/mwhart88)

Feel free to check the [Releases page](https://github.com/mwhart88/News-Aggregator-with-Chatbot/releases) for updates and new features. Your contributions and feedback are valuable to us!