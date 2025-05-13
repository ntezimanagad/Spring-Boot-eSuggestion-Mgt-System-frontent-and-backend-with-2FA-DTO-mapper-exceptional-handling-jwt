# 📝 Spring Boot eSuggestion Management System (Frontend & Backend)

A full-stack suggestion management system built using Spring Boot (backend) and React (frontend), featuring:

- JWT-based authentication and authorization
- Two-Factor Authentication (2FA) using OTP
- DTO mapping with MapStruct/ModelMapper
- Global exception handling
- Secure REST APIs
- Clean and modular folder structure
- Modern UI with Material-UI (MUI)

---

## 🚀 Features

### 🔒 Authentication & Security
- JWT-based login and registration
- Two-Factor Authentication (OTP via email)
- Secure endpoints with role-based access

### 🧠 Business Logic
- Suggestion CRUD operations (Add, Edit, Delete, View)
- DTO usage for separating internal models and API contracts
- Pagination and sorting for suggestion lists
- Custom exception handling with meaningful responses

### 🖥️ Frontend (React)
- React + MUI (Material-UI) components
- Pages for login, registration, OTP verification
- Dashboard to manage suggestions
- Toast notifications via WebSocket for real-time updates

---

## 🛠️ Technologies Used

### Backend (Spring Boot):
- Java 17+
- Spring Boot
- Spring Security + JWT
- Spring Data JPA
- MapStruct / ModelMapper
- JavaMailSender (for OTP email)
- MySQL / H2 (configurable)

### Frontend (React):
- React 18+
- Axios (API calls)
- React Router
- MUI (Material UI)
- WebSocket / SockJS / STOMP



