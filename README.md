# ConcertTrack

## Introduction

Welcome to ConcertTrack, where tracking concerts just became easier. This app is designed for concert enthusiasts who want to keep a record of all the concerts they've attended, discover new events, and stay connected with the music they love.

## Purpose/Motivation

Tired of going to a ton of concerts? Who am I kidding—going to concerts is never tiring! Let me rephrase the question: tired of going to tons of concerts and not being able to track how many concerts you attend as a frequent concert-goer? Well, this is the app for you. With ConcertTrack, you can easily keep track of past concerts, add new ones, and organize your experiences in one convenient place.

## Features

ConcertTrack offers a seamless user experience for managing your concert history:

- **Concert List**: View a list of concerts you've attended, including details like the artist, venue, and date.

- **Add New Concerts**: Use a simple form to input information about new concerts, including the name of the artist, genre, venue, date, and rating.

- **Artist Information**: Click on an artist's picture to view additional information, such as genre and similar artists.

- **Edit and Delete Concerts**: Easily update concert details or remove events from your list if needed.

- **Community Tab**: Explore the "Community" section to see other users' concert experiences, reviews, and ratings. You can also comment on these posts, share your thoughts, and engage with fellow concert-goers.

## How was ConcertTrack developed?

ConcertTrack was developed using modern front-end technologies:

- **Framework**: Built with React.js for a component-based architecture, allowing for dynamic rendering and state management.
  Styling: Styled with vanilla CSS and animations using keyframes and transitions to create a lively user experience.

- **State Management**: Utilized React's useState and useEffect hooks to manage data.

- **API Integration**: Integrated Spotify's Web API to allow users to view artist information such as genre, similar artists, artist images etc.

- **Version Control**: Managed code changes using Git and hosted on GitHub for collaboration.
- **Build Tools**: Set up using Vite for a fast development environment.

## How to install and run Application

To get ConcertTrack up and running on your local machine:

1. **Clone the Repository:**

```bash
git clone git@github.com:kevinnguyen2321/concertTrack.git
```

2. **Navigate to Project directory**

```bash
   cd concertTrack
```

3. **Install dependencies:**

```bash
  npm install
```

4.  **Clone JSON server repository (API)**

```bash
 git clone git@github.com:kevinnguyen2321/concertTrack-api.git
```

5. **Navigate to JSON server directory**

   ```bash
   cd front-end-capstone-api
   ```

6. **Install JSON Server Dependencies**

   ```bash
   npm install
   ```

7. **Start JSON server:\***

   ```bash
   json-server database.json -p 8088 --watch
   ```

8. **Start the main app development server:**

- Open a new terminal window and go back to main ConcertTrack project directory:
  ```bash
    cd concertTrack
  ```
- Then start the development server:
  ```bash
   npm run dev
  ```
