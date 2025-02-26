# 🚀 Employee Management System  

This is a simple **Employee Management System** built with **Node.js**, **Express**, **MongoDB**, and **React.js**. It allows the management of employee details, including adding, viewing, and updating employee information such as **employee ID, name, email, salary, and more**.  

![Employee Management System](https://via.placeholder.com/800x400?text=Employee+Management+System)  

## ✨ Features  

✅ **Add Employee**: Add new employees with all necessary details, including their photo.  
✅ **Employee List**: View a list of all employees in the system.  
✅ **Employee Details**: View, update, and delete employee details.  
✅ **Validation**: Form validation to ensure data integrity (e.g., email format, required fields, etc.).  
✅ **Toast Notifications**: Informative messages for success or error events.  

## 🛠️ Technologies Used  

### 📌 Backend  
🔹 **Node.js** – JavaScript runtime for the server-side application.  
🔹 **Express.js** – Web framework for handling HTTP requests.  
🔹 **MongoDB Atlas** – Cloud database to store employee data.  
🔹 **Mongoose** – MongoDB object modeling tool for Node.js.  
🔹 **Multer** – Middleware for handling file uploads (for employee photos).  

### 📌 Frontend  
🔹 **React.js** – JavaScript library for building the UI.  
🔹 **React Toastify** – Library for showing toast notifications.  
🔹 **Axios** – HTTP client for API requests.  

## 🚀 Deployment & Containerization  

🔹 **Dockerized React frontend & Node.js backend**  
🔹 **Docker Compose** for managing containers  
🔹 **Frontend hosted on Cloudflare** (using the build file)  
🔹 **Backend hosted on Azure Web Services** (containers via Docker image)  

## 🌜 Setup Instructions  

### ✅ Prerequisites  

- 🟢 **Node.js** (version 14 or later)  
- 🟢 **MongoDB** (local or **MongoDB Atlas**)  

### 🖥️ Backend Setup  

1. **Clone the repository**:  
   ```bash
   git clone <your-repository-url>
   cd employee-management
   ```

2. **Navigate to the backend folder**:  
   ```bash
   cd backend
   ```

3. **Install dependencies**:  
   ```bash
   npm install
   ```

4. **Set up MongoDB**:  
   - Ensure MongoDB is running locally or use MongoDB Atlas.  
   - Update the connection string in `backend/config/db.js` if needed.  

5. **Run the server**:  
   ```bash
   npm start
   ```
   The backend will start on `http://localhost:5000`.  

### 🎨 Frontend Setup  

1. **Navigate to the frontend folder**:  
   ```bash
   cd frontend
   ```

2. **Install dependencies**:  
   ```bash
   npm install
   ```

3. **Run the React app**:  
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`.  

## 🔗 API Endpoints  

- **➕ POST** `/api/employees` – Add a new employee.  
- **👋 GET** `/api/employees` – Get the list of all employees.  
- **🔍 GET** `/api/employees/:empId` – Get employee details by ID.  
- **✏️ PUT** `/api/employees/:empId` – Update employee details.  
- **❌ DELETE** `/api/employees/:empId` – Delete an employee.  

## 📂 Project Structure  

```
employee-management/
│
├── backend/
│   ├── config/
│   │   └── db.js  # MongoDB connection setup
│   ├── models/
│   │   └── EmployeeDetails.js  # Employee schema
│   ├── routes/
│   │   └── employeeRoutes.js  # Routes for employee operations
│   ├── app.js  # Express application setup
│   └── server.js  # Server entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmployeeForm.js  # Form component for adding employees
│   │   │   └── EmployeeList.js  # Component to display employee list
│   │   ├── App.js  # Main app component
│   │   └── index.js  # React entry point
│
└── README.md  # Project documentation
```

## 📸 Screenshots  

![Screenshot 2025-02-26 091956](https://github.com/user-attachments/assets/9142ac7f-5d07-4129-ad45-06be9cb68af4)
![Screenshot 2025-02-26 092007](https://github.com/user-attachments/assets/c3bbf817-234d-4a72-81e5-1305a006f0ed)
![Screenshot 2025-02-26 092016](https://github.com/user-attachments/assets/8caf09e7-f37e-4cde-b22a-1d68f09763f9)
![Screenshot 2025-02-26 092027](https://github.com/user-attachments/assets/091e581d-0721-4fc2-8339-ffbcf71cb571)
![Screenshot 2025-02-26 092041](https://github.com/user-attachments/assets/ac52564b-8187-48bb-896e-3cd07f7d70a0)



## 🤝 Collaboration  

This project was a **team effort**, giving us valuable hands-on experience in **MERN stack development** and **containerization**.  

🚀 Excited for future projects! Let’s build more together! 🎯  

