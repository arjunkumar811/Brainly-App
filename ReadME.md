# Brainly

**Your Digital Brain for Everything Important**

Brainly is a full-stack web application built to help users store, organize, and access their important links, tweets, and documents all in one place. Never lose valuable information again! Share your "second brain" with others effortlessly through unique sharable links.

---

## **Tech Stack**

- **Frontend:** React, TypeScript, Tailwind CSS, React Router Dom
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Validation:** Zod,Hashing, salting 

---


## **Getting Started**

### **Prerequisites**
- Node.js
- MongoDB

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/arjunkumar811/Brainly-App.git
   cd brainly
   ```

2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd Backend-BackEnd
   npm install

   # Install frontend dependencies
   cd ../Brainly-Frontend
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `backend` folder with the following:
   ```env
   JWT_SECRET=''
   MONGO_URI=your_mongodb_connection_string
   ```

4. Run the project:
   ```bash
   # Start the backend server
   cd Backend-BackEnd
   npm run dev

   # Start the frontend development server
   cd ../Brainly-Frontend
   npm run dev
   ```

5. Open the application:
   Navigate to `http://localhost:PORT` in your browser.

---


### **Caption:**
"Your Digital Brain for Everything Important - Store, organize, and access all your important links, tweets, and documents in one place. Never lose valuable information again."
