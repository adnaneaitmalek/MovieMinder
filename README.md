# 🎬 Movie Minder (Test Version)

Welcome to **Movie Mind**, a simple web application to help you save and manage your movie ideas!

## 🚀 Getting Started

The easiest way to run this project is by using **Docker**. Follow these steps to get it up and running:

### Prerequisites

-   Ensure **Docker** is installed on your machine.
    (Get Docker from [here](https://www.docker.com/products/docker-desktop) if you don’t have it.)

---

### 💻 Installation & Setup with Docker

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/adnaneaitmalek/movie-minder.git
    cd movie-minder
    ```

2. **Start the App with Docker Compose:**
    ```bash
    docker compose up -d
    ```
    - This will start both the app and the database containers.
    - **Note:** It might take a little time for the server to start after running the above command. Be patient; it will be available shortly at: [http://localhost:3000](http://localhost:3000)

---

### 🔍 Accessing Prisma Studio (Optional)

If you'd like to inspect the database via **Prisma Studio**:

1. **Enter the App Container’s Shell:**

    ```bash
    docker exec -it node_app sh
    ```

2. **Launch Prisma Studio:**
    ```bash
    npx prisma studio
    ```
    - You can now access Prisma Studio at: [http://localhost:5555](http://localhost:5555)

---

### 🚫 Installation & Setup without Docker

If you prefer not to use Docker, follow these steps:

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/adnaneaitmalek/movie-minder.git
    cd movie-minder
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Configure Your Database Manually:**

    - **Install PostgreSQL** if you haven't already.
    - Create a database named `movies_db` (or your choice).
    - Create a user with a password and grant all privileges on that database.
    - Create a `.env` file in the root of your project with the following variable:
        ```env
        DATABASE_URL=postgres://<username>:<password>@localhost:5432/movies_db
        ```

4. **Run Prisma to Set Up the Database:**

    ```bash
    npx prisma db push
    ```

5. **Start the Application:**
    ```bash
    npm run dev
    ```
    - Your app should now be running locally!

---

## 📝 Website Overview

Once the app is running, here’s what you’ll find:

### 🖥️ Landing Page

-   A simple, welcoming landing page introducing the website.
-   **Navbar:** Includes the logo, a search bar to search for specific movies, and a **Categories** link.

### 🎥 Movies Page

-   **Categories:** Currently, only the **Movies** category is functional (more categories will be available later).
-   On the **Movies page**, you can:
    -   **View** your saved movies with their titles and descriptions.
    -   Use icons to **mark a movie as watched**, **edit movie information**, or **delete it** if it’s no longer needed.
    -   **Add a new movie** by clicking the **Add button**, which will prompt you for:
        -   **Movie Title** (Required)
        -   **Movie Description** (Required)

### ✔️ After Adding a Movie

-   Once you add a movie, it will immediately appear in the list.

---

## 🛠️ Managing the Database

If you'd like to explore the database, you can always use **Prisma Studio** at:
[http://localhost:5555](http://localhost:5555)

---

## 🤝 Contact

If you have any ideas or feedback, feel free to reach out!
