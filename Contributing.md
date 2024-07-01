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
    - [Current Feature Branches](#current-feature-branches)
      - [List of Feature Branches](#list-of-feature-branches)
    - [Creating a New Feature or Fix](#creating-a-new-feature-or-fix)
      - [Working on a Feature Branch](#working-on-a-feature-branch)
    - [Running Tests](#running-tests)
    - [Building the Project](#building-the-project)
  - [Continuous Integration/Continuous Deployment (CI/CD)](#continuous-integrationcontinuous-deployment-cicd)
  - [Pull Requests](#pull-requests)
  - [Code of Conduct](#code-of-conduct)
  - [Support](#support)

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

### Current Feature Branches

We maintain feature branches for ongoing development of new features. Contributors are encouraged to work on these branches for specific features or create a new feature branch.

#### List of Feature Branches

- **User Registration and Authentication:**
  - `feature/user-authentication`
  - `feature/user-registration`
- **Story Submission:**
  - `feature/story-submission`
  - `feature/add-story`
- **Story Feed:**
  - `feature/story-feed`
  - `feature/story-list`
- **Upvote Feature:**
  - `feature/story-upvote`
  - `feature/add-upvote`
- **Categories for Stories:**
  - `feature/story-categories`
  - `feature/add-categories`
- **User Profile:**
  - `feature/user-profile`
  - `feature/profile-page`
- **Search Functionality:**
  - `feature/search`
  - `feature/story-search`
- **Notifications:**
  - `feature/notifications`
  - `feature/user-notifications`
- **Website Design:**
  - `feature/website-theme`
  - `feature/website-design`
  - `feature/homepage-design`
- **Homepage Features:**
  - `feature/homepage`
  - `feature/homepage-banner`
  - `feature/homepage-layout`

### Creating a New Feature or Fix

#### Working on a Feature Branch

To work on a feature branch, follow these steps:

1. **Switch to the Feature Branch:**
    ```bash
    git checkout feature/new-feature-name
    git pull origin feature/new-feature-name
    ```

2. **Make Your Changes:** Implement your feature or fix.
3. **Commit Changes:** Commit your changes with a meaningful commit message.
    ```bash
    git add .
    git commit -m "Implement part of new feature: description of changes"
    ```

4. **Push Changes:** Push your branch to your forked repository.
    ```bash
    git push origin feature/new-feature-name
    ```

5. **Submit Pull Request:** Open a pull request to merge your changes back into the feature branch.

### Running Tests

Before submitting your changes, ensure all tests pass.

### Building the Project

Follow the setup instructions in the main README to build and run the project locally.

## Continuous Integration/Continuous Deployment (CI/CD)

We use GitHub Actions for CI/CD. Pushing changes to the `development` branch triggers builds and deployments to the development environment. Pushing to the `production` branch triggers deployments to the production environment.

## Pull Requests

1. **Submit Pull Request:** Open a pull request to merge your feature branch into `development`.
2. **Review Process:** Your pull request will be reviewed by other contributors. Make necessary changes if requested.
3. **Merge:** Once approved, your pull request will be merged into `development`.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Support

For support, open an issue in the repository or contact the maintainers.
