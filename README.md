# Dronesign: Proof of Concept for Drone Registration

**Dronesign** is a PoC project to explore the feasibility of registering drones in alignment with FAA’s vision for airspace integration. It simulates a basic registration system, linking drones to their operators for accountability, safety, and airspace management. The project also integrates **DocuSign** APIs and services to allow users to sign agreements for drone registration.

---

## Project Structure

The project consists of two main parts:

- **Frontend:** A React app for users to input drone registration details.
- **Backend:** A Flask-based API to process and store registration data.

---

## Setup Instructions

### Prerequisites

- Node.js (for React)
- Python 3.x (for Flask)

### Steps to Run

1. **Clone the repo:**

```bash
git clone https://github.com/aakzsh/dronesign
cd Dronesign
```

2. **Run the Frontend:**

```bash
cd frontend
npm install
npm start
```

3. **Run the Backend:**

```bash
cd backend
pip install -r requirements.txt
python3 main.py
```

Visit `http://localhost:3000` for the frontend, and the backend runs at `http://localhost:5000`.

---

This PoC aims to assess if a scalable and user-friendly drone registration system can be implemented for safer airspace management.