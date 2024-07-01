# Project Documentation for New Contributors

## Welcome to the Project!

Thank you for your interest in contributing to our project! This guide will help you get started with the necessary steps to set up your development environment, understand our workflow, and start contributing.

## Table of Contents

- [Project Documentation for New Contributors](#project-documentation-for-new-contributors)
  - [Welcome to the Project!](#welcome-to-the-project)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
  - [Development Workflow](#development-workflow)
    - [Branching Strategy](#branching-strategy)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following tools installed:

- Node.js (v18 or higher)
- npm
- Serverless Framework CLI (v4 or higher)
- Git
- GitHub Account

### Setup

1. **Fork the Repository:** Fork the project repository to your GitHub account.
2. **Clone the Repository:** Clone your forked repository to your local machine.

    ```bash
    git clone https://github.com/your-username/e-get-why.git
    cd e-get-why
    ```

3. **Install Frontend Dependencies:** Navigate to the frontend directory and install the dependencies.

    ```bash
    cd frontend
    npm install
    ```

4. **Install Backend Dependencies:** Navigate to the backend directory and install the dependencies.

    ```bash
    cd ../backend
    npm install
    ```

## Development Workflow

### Branching Strategy

We use the following branches:

- `development`: Active development branch.
- `production`: Stable production branch.