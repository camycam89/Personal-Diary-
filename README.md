# Personal Diary App

## Description
This is a personal diary application where users can create, view, update, and delete diary entries.

## Technologies Used
- Backend: Express, Node.js
- Frontend: HTML, CSS, JavaScript
- Database: Supabase (PostgreSQL)
- Environment Variables: dotenv

## Setup Instructions

### Prerequisites
- Node.js
- npm

### Installation
1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd personal-diary
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory with the following content:
    ```env
    DATABASE_URL=your_supabase_database_url
    ```

4. Start the server:
    ```bash
    node app.js
    ```

5. Open your browser and navigate to `http://localhost:3000`.

## Features
- Create a diary entry with a specific date and time, text, and category
- View a list of diary entries sorted by recency
- View the details of a specific diary entry
- Update the text of a diary entry
- Delete a diary entry
- Search for diary entries by date/month/year or category

## Extensions
- Add images to diary entries
- Search diary entries by a string
- Additional features such as motivational quote generator or weather generator
- Authentication
- Improved UI/UX
