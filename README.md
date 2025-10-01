# Task Manager Web Application

A full-stack task management application built with Django REST Framework (backend) and React (frontend). This application allows users to create, read, update, and delete tasks with a clean, minimalistic user interface.

## Features

- ✅ **Create Tasks** - Add new tasks with title and optional description
- ✅ **View Tasks** - Display all tasks with filtering options
- ✅ **Edit Tasks** - Update task title and description
- ✅ **Toggle Completion** - Mark tasks as completed or pending
- ✅ **Delete Tasks** - Remove tasks from the list
- ✅ **Filter Tasks** - View all, pending, or completed tasks
- ✅ **Statistics Dashboard** - Track completion rates and task counts
- ✅ **Responsive Design** - Works on desktop and mobile devices

## Project Structure

```
OperationTest/
├── backend/                 # Django REST Framework backend
│   ├── manage.py
│   ├── backend/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── ...
│   └── tasks/              # Django app for task management
│       ├── models.py       # Task model definition
│       ├── views.py        # API ViewSets
│       ├── serializers.py  # DRF serializers
│       ├── urls.py         # API URL routing
│       └── ...
└── frontend/               # React frontend
    ├── package.json
    ├── src/
    │   ├── components/     # Reusable React components
    │   │   ├── TaskForm.tsx
    │   │   └── TaskItem.tsx
    |   |   └── ...
    │   ├── pages/          # Page components
    │   │   └── LandingPage.tsx
    │   ├── services/       # API service layer
    │   │   └── taskService.ts
    │   └── ...
    └── ...
```

## Technology Stack

### Backend
- **Django 5.2.6** - Web framework
- **Django REST Framework 3.16.1** - API framework
- **django-cors-headers 4.9.0** - CORS handling
- **SQLite** - Database (default Django database)

### Frontend
- **React 18.3.1** - Frontend framework
- **TypeScript** - Type safety
- **Tailwind CSS 3.4.14** - Styling
- **Axios** - HTTP client
- **Vite** - Build tool

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Python 3.10+** 
- **Node.js 16+** and **npm**
- **Git** (for cloning the repository)

## Setup Instructions

### Backend Setup (Django)

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment:**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r "requirements.txt"
   ```

4. **Run database migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Start the Django development server:**
   ```bash
   python manage.py runserver
   ```

   The backend API will be available at: `http://localhost:8000`

### Frontend Setup (React)

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Install Axios for API calls:**
   ```bash
   npm install axios
   ```

4. **Start the React development server:**
   ```bash
   npm run dev
   ```

   The frontend application will be available at: `http://localhost:5173`

## API Endpoints

The backend provides the following REST API endpoints:

### Base URL: `http://localhost:8000/tasks/`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/tasks/` | List all tasks | None |
| `POST` | `/tasks/` | Create a new task | `{"title": "string", "description": "string", "completed": false}` |
| `GET` | `/tasks/{id}/` | Retrieve a specific task | None |
| `PUT` | `/tasks/{id}/` | Update a task (full update) | `{"title": "string", "description": "string", "completed": boolean}` |
| `PATCH` | `/tasks/{id}/` | Partially update a task (e.g., toggle completion) | `{"completed": boolean}` |
| `DELETE` | `/tasks/{id}/` | Delete a task | None |

### Task Model Schema

```json
{
  "id": "integer (auto-generated)",
  "title": "string (required, max 200 chars)",
  "description": "string (optional)",
  "completed": "boolean (default: false)",
  "created_at": "datetime (auto-generated)"
}
```

### Example API Responses

**GET /tasks/ - List all tasks:**
```json
[
  {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs",
    "completed": false,
    "created_at": "2025-10-01T10:30:00Z"
  },
  {
    "id": 2,
    "title": "Review code",
    "description": "",
    "completed": true,
    "created_at": "2025-10-01T09:15:00Z"
  }
]
```

**POST /tasks/ - Create a task:**
```json
// Request
{
  "title": "New task",
  "description": "Task description",
  "completed": false
}

// Response (201 Created)
{
  "id": 3,
  "title": "New task",
  "description": "Task description",
  "completed": false,
  "created_at": "2025-10-01T11:00:00Z"
}
```

## 🎨 Frontend Features

### Components

1. **TaskForm** - Create and edit tasks
   - Expandable form interface
   - Validation for required fields
   - Clean, minimalistic design

2. **TaskItem** - Display individual tasks
   - Checkbox for completion toggle
   - Hover effects for action buttons
   - Edit and delete functionality

3. **LandingPage** - Main application interface
   - Statistics dashboard
   - Task filtering (All, Pending, Completed)
   - Responsive grid layout

### UI Design Principles

- **Minimalistic Design** - Clean white background with subtle gray accents
- **No Gradients** - Flat design with simple color palette
- **Responsive Layout** - Works on desktop, tablet, and mobile
- **Accessible** - Proper contrast ratios and keyboard navigation
- **Modern Typography** - Clear hierarchy and readable fonts

## 🔧 Configuration

### Backend Configuration

**CORS Settings** (for development):
```python
# settings.py
CORS_ALLOW_ALL_ORIGINS = True  # Only for development
```

**Database Configuration:**
- Using SQLite by default
- Database file: `backend/db.sqlite3`
- Automatically created on first migration

### Frontend Configuration

**API Base URL:**
```typescript
// src/services/taskService.ts
const API_BASE_URL = 'http://localhost:8000/tasks';
```

## 📱 Usage Guide

1. **Start both servers** (backend on :8000, frontend on :5173)
2. **Create tasks** using the form at the top of the page
3. **View statistics** in the dashboard cards
4. **Filter tasks** using the All/Pending/Completed tabs
5. **Edit tasks** by clicking the edit button (appears on hover)
6. **Toggle completion** by clicking the checkbox
7. **Delete tasks** by clicking the delete button (appears on hover)


## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Ensure `django-cors-headers` is installed and configured
   - Check that `CORS_ALLOW_ALL_ORIGINS = True` is set (development only)

2. **API Connection Issues:**
   - Verify backend server is running on `http://localhost:8000`
   - Check that the frontend API URL matches the backend URL

3. **Database Issues:**
   - Run `python manage.py makemigrations tasks`
   - Run `python manage.py migrate`

4. **Frontend Build Issues:**
   - Delete `node_modules` and run `npm install` again
   - Check that all dependencies are properly installed


## 📄 License

This project is for educational and demonstration purposes.


---
