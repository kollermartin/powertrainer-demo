# PowerTrainer Demo

## Introduction

**PowerTrainer Demo** is a demo version of a comprehensive training management application designed for powerlifting and
fitness professionals, including trainers and athletes. This demo showcases a portion of the key features of the full
PowerTrainer app, which is hosted in a private organizational repository. PowerTrainer enables users to create and
manage training programs, add custom exercises with embedded tutorials, and organize these into structured sessions.

## Features

This demo includes a limited set of features that represent core functionality of the PowerTrainer app:

- **Tutorial Management**
    - Create global tutorials meant to inspire all users.
    - View, edit, and delete existing tutorials. These tutorials are PowerTrainer-specific resources, separate from
      training-specific exercises.
- **Training Administration**
    - **Training Management:** Create and organize training sessions for athletes.
    - **Exercise Management:** Add exercises that are used within specific training programs. Each exercise can include
      an instructional YouTube video for guidance.

> **Note:** This demo showcases only a portion of the key features of PowerTrainer. The full app is significantly more
> advanced, with a broader range of capabilities and deeper integrations for managing training programs at scale.

In the real app, API calls facilitate data persistence using `@tanstack/react-query` for data fetching and state
management. However, in this demo, all data is mocked. Instead of making real API calls, the app returns mock promises
with placeholder data, and local state is managed entirely through `@tanstack/react-query`. Any changes made to the data
will reset upon refreshing the app, reverting back to the original mock data.

## Technology Stack

This project is built with the following technologies:

- **React** – Core framework for building a responsive and interactive UI.
- **Vite** – Bundler for fast development and optimized builds.
- **@tanstack/react-query** – Used to manage local state with mock data, simulating API responses by returning promises
  with placeholder data.
- **Ant Design** – Provides ready-to-use UI components and icons to ensure a clean design.
- **Axios** – For handling HTTP requests (used in real app, mocked in demo).
- **React Router** – Enables navigation within the app.
- **React-Player** – Embeds YouTube videos for exercise tutorials.
- **UUID** – Generates unique identifiers for entities such as tutorials and exercises.
- **Day.js** – Lightweight library for date formatting and manipulation.

## Local Setup

To set up and run the project locally, follow these steps:

1. **Clone the Repository and Install Dependencies**:
   ```bash
   git clone https://github.com/kollermartin/powertrainer-demo
   cd powertrainer-demo
   npm install

2. **Clone the Repository and Install Dependencies**:
   ```bash
   npm run dev
