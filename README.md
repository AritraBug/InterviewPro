# InterviewPro

A full-stack Recruitment Management Platform built using Spring Boot, React, MySQL, JWT Authentication, and Role-Based Access Control.

## Overview

InterviewPro helps recruiters and interviewers manage the complete hiring workflow, including:

* Candidate Management
* Interview Scheduling
* Feedback Collection
* Recruitment Analytics Dashboard
* Role-Based Access Control

The platform provides a centralized system for tracking candidates, conducting interviews, collecting interviewer feedback, and visualizing hiring outcomes through interactive analytics.

---

## Features

### Authentication & Authorization

* JWT Authentication
* Spring Security Integration
* Role-Based Access Control
* Protected React Routes

Supported Roles:

* ADMIN
* RECRUITER
* INTERVIEWER

---

### Dashboard Analytics

* Total Candidates
* Total Interviews
* Total Feedbacks
* Selected Candidates
* Rejected Candidates
* Scheduled Interviews
* Completed Interviews
* Cancelled Interviews

Interactive Charts:

* Interview Status Distribution (Pie Chart)
* Recommendation Distribution (Pie Chart)
* Hiring Outcomes (Bar Chart)

---

### Candidate Management

* Add Candidate
* Edit Candidate
* Delete Candidate
* Search Candidate by Name
* Pagination Support

Candidate Information:

* Name
* Email
* Phone
* College
* Skills

---

### Interview Management

* Schedule Interviews
* Edit Interviews
* Delete Interviews
* Candidate Assignment
* Interview Status Tracking

Interview Details:

* Title
* Interviewer
* Date & Time
* Status
* Mode (Online/Offline)
* Meeting Link
* Location
* Notes

---

### Feedback Management

* Submit Feedback
* Edit Feedback
* Delete Feedback

Evaluation Areas:

* Technical Score
* Communication Score
* Problem Solving Score

Recommendations:

* STRONG_HIRE
* HIRE
* HOLD
* REJECT

---

## Tech Stack

### Backend

* Java 21
* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate
* MySQL
* Maven

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router
* Recharts

### Database

* MySQL

---

## Project Structure

Backend Modules:

* Authentication
* Dashboard
* Candidates
* Interviews
* Feedbacks

Frontend Modules:

* Login
* Dashboard
* Candidates
* Interviews
* Feedbacks

---

## API Features

### Candidate APIs

* Create Candidate
* Get All Candidates
* Get Candidate By ID
* Update Candidate
* Delete Candidate
* Search Candidate
* Paginated Candidates

### Interview APIs

* Schedule Interview
* Update Interview
* Delete Interview
* Get Interviews
* Status Management

### Feedback APIs

* Submit Feedback
* Get All Feedbacks
* Get Feedbacks By Interview

### Dashboard APIs

* Recruitment Analytics
* Status Metrics
* Recommendation Metrics

---

## Future Enhancements

* Email Notifications
* Calendar Integration
* Resume Upload Support
* Candidate Documents
* Export Reports
* Cloud Deployment

---

## Author

Aritra Sarkhel

B.Tech Computer Science Engineering

Full Stack Developer | Java | Spring Boot | React
