# The Profolio

Open-source website for new developers.

This repository contains the source code for The Profolio, a personal portfolio website built using React, Appwrite, Vite, AOS, and Tailwind CSS.

## 💻 Tech Stack

The code base of this repo uses

- [React](https://react.dev/)
- [Appwrite](https://appwrite.io/)
- [TailwindCSS](https://tailwindcss.com/)

## 🛠️ Installation
Fork and Clone<br>
To get started, you need to fork and clone this repository. Follow the steps below:

1. **Fork the repository** : Click on the "Fork" button at the top-right corner of this page. This will create a copy of the repository under your GitHub account.
2. **Clone the repository** : On your local machine, open a terminal and execute the following command:

    ```

    git clone https://github.com/your-username/the-profolio.git

    ```
    <sub>Replace your-username with your GitHub username.</sub>
3. **Navigate to the project directory** : Change your working directory to the cloned repository:
    ```

    cd the-profolio

    ```
4. **Install dependencies** : Install the project dependencies using npm:
    ```

    npm install

    ```
    <sub>This command will install all the required packages and libraries needed to run the application.</sub>
5. Create a .env file in the root folder and add the following
   ```bash
    VITE_APPWRITE_ENDPOINT: "The endpoint URL of your Appwrite server. if cloud: https://cloud.appwrite.io/v1 if local :http://localhost/v1"
    VITE_PROJECT_ID: "The ID of your Appwrite project."
    VITE_DATABASE_ID: "The ID of the Appwrite database."
    VITE_USER_DETAILS_COLLECTION_ID: "The ID of the collection storing user details."
    VITE_USER_PROJECTS_COLLECTION_ID: "The ID of the collection storing user projects."
    VITE_USER_PROFILE_BUCKET_ID: "The ID of the bucket storing user profile images."
    VITE_USER_PROJECTS_BUCKET_ID: "The ID of the bucket storing user project images."
    VITE_URL: "The URL where the application is hosted."
   ```
6. Installing Appwrite

   You can install the Appwrite instance on your local computer or cloud.
   for [local installation](https://appwrite.io/docs/self-hosting)

7. Appwrite project setup
    - Go to [cloud.appwrite.io](https://cloud.appwrite.io) and create your account if new.
    - After that, Create a new project and name the project `The Profolio`
    - In the `Add a Platform` section, add a new Web App.
    - Set an app name and set the hostname to *.
    - You can click on 'Next' or Skip the optional steps.
    - Once you are on the dashboard, copy the Project ID and set it in env `VITE_PROJECT_ID ` 

   
8. Authentication SetUp

   For Authentication follow the below guides
    - [GitHub OAuth](https://dev.to/hackmamba/how-to-add-github-authentication-to-a-nextjs-application-1nfi)
    - [Google OAuth](https://www.youtube.com/watch?v=KYrOoyvycAM)
9. Database SetUp
    - Go to Databases and Create a database, name it `Profolio`.
    - Copy the Database ID and set it in the env file in `VITE_DATABASE_ID`.
    - And then you have to create 2 Collections one for `user-details` and one for `project-details`.
    - Create `user-details` collection.
    - Copy the Collection ID and set it in env `VITE_USER_DETAILS_COLLECTION_ID`.
    - Go to the Attributes tab and add:
      
      | key   | Type | required | size | 
      | -------- | ------- | ------- | ------- |
      | name  | string  | yes | 40 |
      | title  | string  | yes | 40 |
      | bio  | string  | yes | 1024 |
      | twitter  | string  | yes | 15 |
      | github | string  | yes | 39 |
      | skills  | string[]  | no | 20 |
    - Go to the collection settings tab and set the permission.
    - Add role -> All Users(Users) -> enable CREATE	READ UPDATE	DELETE.
    - Add role -> Any (Users) -> enable READ only.
    - And Again, Create `project-details` collection.
    - Copy the Collection ID and set it in env `VITE_USER_PROJECTS_COLLECTION_ID`.
    - Go to the Attributes tab and add:
      
      | key   | Type | required | size |
      | -------- | ------- | ------- | ------- |
      | projectName | string  | yes | 80 |
      | description  | string  | yes | 2024 |
      | livePreview | string  | yes | 100 |
      | repositoryLink  | string  | yes | 100|
      | userId| string  | yes | 128 |
      | usedTechnology  | string[]  | no | 40 |
    - Go to the collection settings tab and set the permission.
    - Add role -> All Users(Users) -> enable CREATE	READ UPDATE	DELETE.
    - Add role -> Any (Users) -> enable READ only.
10. Buckets SetUp
    - Create two new buckets in the Storage section and one for `profile-pics` and one for `project-pics`.
    - Copy the `profile-pics` Bucket ID and set it in env `VITE_USER_PROFILE_BUCKET_ID`.
    - Copy the `project-pics` Bucket ID and set it in env `VITE_USER_PROJECTS_BUCKET_ID`.
    - Go to the bucket settings and set the permissions exactly as the `user-details` collection for both buckets.
    - Set the Maximum File Size `SIZE: 10` and `Bytes: MegaBytes` for both buckets.
    - Set the File Extensions `Allowed extensions: jpg png svg jpeg` for both buckets.


11. Start the project on `localhost/5173`

   ```
   
    npm run dev
    
   ```
## Get Started 
- [Learn React](https://react.dev/learn) 
- [Learn Appwrite](https://appwrite.io/docs/getting-started-for-web) 
- [Learn Tailwind CSS](https://tailwindcss.com/docs/installation) 



## 🔖 Contributing
Contributions to The Profolio are welcome! If you find any issues or want to add new features, feel free to submit a pull request. [Contributing](./CONTRIBUTING.md)


## 🔑 License

The Profolio is open-source software released under the MIT License. Feel free to modify and use the code as per the license terms. [MIT](./LICENSE) license.

Please leave a star ⭐️ All support is highly appreciated.


