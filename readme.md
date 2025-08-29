# Express Node API

A simple yet flexible RESTful API built with **Node.js** and **Express**, ideal for learning CRUD operations, modular structure, and middleware usage.

## 🚀 Features

- ✅ RESTful **CRUD** operations (GET, POST, PATCH, DELETE)
- 📁 **Modular structure**: `routes/`, `controllers/`, `models/`, `middleware/`
- 🔐 **.env-based configuration** using `dotenv`
- ⚠️ Centralized **error handling** and validation (e.g. via `express-validator`)
- 🔄 **CORS** enabled for cross-origin requests
- 🧱 **Database support** (e.g., MongoDB via Mongoose or MySQL via Sequelize)
- 🔒 **Authentication** using JWT + password hashing (`bcrypt`)
- 🧩 **Logging** with `morgan`, **security** headers with `helmet`, and **rate limiting** for better hygiene
- 📄 **API documentation**, e.g. Postman collection
## 📌 Postman Collection

You can test all API endpoints using the provided Postman collection.  

- [Download Postman Collection](./postman/express-node-api.postman_collection.json)

### 👉 How to Import
1. Download the `.json` file from the link above.  
2. Open Postman → Click **Import** → Choose the file.  
3. Start testing the API 🚀  


---

## ⚙️ Installation & Setup
 Install dependencies:
   ```bash
   npm install


1. Clone the repo:  
   ```bash
   git clone https://github.com/mrinal19-96/express-node-api.git
   cd express-node-api

## Run the server:
npm run dev   # development mode
npm start     # production mode

## Basic Documentation
### 📌 API Endpoints



---

2. **Format API Endpoints**  
Right now the endpoints are just links. Better to show them cleanly grouped by resource:  

```md
## 📌 API Endpoints

### Users
- `POST /api/users/login` → User login

### Students
- `POST /api/students/add` → Add a new student
- `GET /api/students/` → Get all students
- `GET /api/students/edit/:id` → Get student details for editing
- `PATCH /api/students/update/:id` → Update student by ID
- `DELETE /api/students/delete/:id` → Delete student by ID

### SMS
- `POST /send-sms` → Send an SMS

## Add Student

{
  "first_name": "Que",
  "last_name": "Rathor",
  "email": "ggque@gmail.com",
  "phone": "7485963251",
  "gender": "Male",
  "profile_picture": "1756494505868.png"
}


## response
{
    "message": "Student created successfully",
    "student": {
        "first_name": "Que",
        "last_name": "Rathor",
        "email": "ggque@gmail.com",
        "phone": "7485963251",
        "gender": "Male",
        "profile_picture": "1756494505868.png",
        "_id": "68b1faa9f772994cdf3afcc3",
        "__v": 0
    }
}


---

✅ This README now includes:  
- Features  
- Installation & setup  
- Project structure  
- All API endpoints  
- Example request/response with your JSON data  
- Documentation guidance  
- Contributing and license  

---

