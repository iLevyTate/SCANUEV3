# SCANUEV3 Repository

![SCANUEV3](https://github.com/user-attachments/assets/7be5e78f-e216-49db-987a-33ae52214786)

Welcome to the SCANUEV3 project! This repository is a Next.js conversion of SCANUE, focused on developing a Synthetic Cognitive Augmentation Network (SCAN) using **Experts.js** and other web-based technologies to simulate and enhance the cognitive functions of the prefrontal cortex (PFC) in humans. SCANUEV3 assists with real-time cognitive tasks like decision-making, problem-solving, and planning.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running the Project](#running-the-project)
4. [Usage](#usage)
5. [Contributing](#contributing)

---

## Overview

SCANUEV3 aims to extend and enhance the functions of the prefrontal cortex (PFC) using artificial intelligence (AI). The project utilizes **Experts.js** and modern web technologies to create AI agents that simulate the functions of various PFC regions, assisting in cognitive tasks in real-time. These agents provide support in decision-making, problem-solving, and adaptive planning.

### Name Change Notification

We have rebranded from "SCANJS" to "SCANUE" due to SCANJS being a deprecated project from another developer. If you encounter any references to "SCANJS" in documentation or code, these refer to instances before the name change.

### Versioning Note

**SCANUEV2** was a temporary repository that existed during the development of SCANUE but was not considered an official version. For this reason, the chronological project flow skips directly from **SCANUE** to **SCANUEV3**. It does not make sense to incorporate SCANUEV2 into the version history, as it was a transitional, non-functional iteration. The project’s version progression is therefore as follows:

- **SCANUE** (initial version)
- **SCANUEV3** (current version)

---

## Features

- **Cognitive Augmentation**: Simulate and enhance PFC functions, such as decision-making and planning, to improve real-time cognitive tasks.
- **Multi-Agent System**: Use specialized AI agents that focus on different cognitive functions.
- **Web-Based**: Built using JavaScript and web technologies, deployable as a scalable web application.
- **Scalable and Extensible**: Easily extendable architecture for adding new cognitive functions and agents.

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 14 or later)
- **npm** (Node Package Manager)

### Installation

1. Clone the repository to your local system:

    ```bash
    git clone https://github.com/iLevyTate/scanuev3.git
    ```

2. Navigate to the project directory:

    ```bash
    cd scanuev3
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

### Running the Project

To run the project locally, follow these steps:

1. **Set Up Environment Variables**:

    - Create a `.env` file in the root directory with the following content:

      ```bash
      OPENAI_API_KEY=your_openai_api_key_here
      ```

    Replace `your_openai_api_key_here` with your actual OpenAI API key.

2. **Start the Server**:

    ```bash
    npm start
    ```

3. **Access the Application**:

    Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

---

## Usage

Once the application is running, you can interact with AI agents that simulate the functions of different PFC regions. These agents can help with tasks such as:

- **Decision-making**: Providing real-time suggestions and guidance.
- **Problem-solving**: Offering insights and possible solutions based on cognitive models.
- **Planning**: Assisting in structuring tasks and creating adaptive plans for future actions.

Explore the agents and experiment with different cognitive tasks to see how they augment your decision-making processes.

---

## Contributing

We welcome contributions to enhance SCANUEV3! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add a feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a Pull Request.

---
