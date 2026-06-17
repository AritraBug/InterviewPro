# InterviewPro – Development Progress

## Project Overview

InterviewPro is a full-stack interview management platform designed to streamline candidate hiring workflows.

The system allows recruiters and interviewers to manage candidates, schedule interviews, collect feedback, track hiring decisions, and monitor recruitment analytics through a secure dashboard.

---

# Backend Technology Stack

* Java 21
* Spring Boot 4
* Spring Data JPA
* Hibernate
* MySQL
* Maven
* Spring Security
* JWT Authentication
* BCrypt Password Encoding
* Lombok

---

# Architecture

The backend follows a layered architecture:

Controller Layer
↓
Service Layer
↓
Repository Layer
↓
MySQL Database

DTOs are used to separate API contracts from database entities.

---

# Implemented Modules

## Candidate Management

Features:

* Create Candidate
* Get Candidate By ID
* Get All Candidates
* Update Candidate
* Delete Candidate
* Search Candidates
* Pagination Support

Entity:

Candidate

Fields:

* Name
* Email
* Phone
* College
* Skills

---

## Interview Management

Features:

* Schedule Interview
* Get All Interviews
* Get Interviews By Candidate
* Get Interviews By Status
* Get Interviews By Interviewer

Entity:

Interview

Fields:

* Title
* Interviewer
* Scheduled Time
* Status
* Mode
* Meeting Link
* Location
* Notes

---

## Interview Workflow

Implemented interview state transitions:

SCHEDULED
→ COMPLETED
→ SELECTED

SCHEDULED
→ COMPLETED
→ REJECTED

SCHEDULED
→ CANCELLED

Invalid state transitions are blocked.

---

## Feedback Module

Features:

* Submit Feedback
* Get All Feedback
* Get Feedback By Interview

Business Rules:

Feedback can only be submitted after an interview is completed.

Entity:

Feedback

Fields:

* Interviewer Name
* Technical Score
* Communication Score
* Problem Solving Score
* Recommendation
* Comments

Recommendation Enum:

* STRONG_HIRE
* HIRE
* HOLD
* REJECT

---

## Dashboard Module

Analytics API implemented.

Metrics:

* Total Candidates
* Total Interviews
* Total Feedbacks
* Selected Interviews
* Rejected Interviews
* Scheduled Interviews
* Completed Interviews

Endpoint:

GET /api/dashboard/stats

---

# Authentication

Implemented:

* User Registration
* User Login
* BCrypt Password Hashing
* JWT Generation
* JWT Validation

Roles:

* ADMIN
* RECRUITER
* INTERVIEWER

---

# Authorization

Implemented Role-Based Access Control (RBAC)

ADMIN:

* Full Access

RECRUITER:

* Candidate Management
* Interview Management
* Dashboard Access

INTERVIEWER:

* Interview Access
* Feedback Submission

Protected using:

* Spring Security
* JWT Filter
* SecurityContext
* @PreAuthorize

---

# Database

Tables:

* users
* candidates
* interviews
* feedbacks

Relationships:

Candidate
1 → N Interviews

Interview
1 → N Feedbacks

---

# Sample Data

Current Dataset:

Candidates: 5

Interviews:

* Selected: 1
* Rejected: 1
* Scheduled: 2
* Completed: 1

Feedback Entries: 3

---

# Current Status

Backend MVP Complete

Next Phase:

* React Frontend
* Dashboard UI
* Candidate Management UI
* Authentication UI
* Deployment

Target Stack:

Frontend:

* React
* Vite
* Tailwind CSS
* React Router
* Axios

Deployment:

* Frontend: Vercel
* Backend: Render / Railway
* Database: MySQL
