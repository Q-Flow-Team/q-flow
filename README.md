# Q-Flow — Smart Queue Manager

Q-Flow is a digital queue management system designed for walk-in service environments.

It allows customers to join a virtual queue using a QR code, monitor their queue position and estimated waiting time, and receive notifications when their turn approaches.

Staff can manage the live queue through a dashboard, while operations managers can use generated data to understand waiting times, peak periods and service performance.

## Team

**AmaliTech Cohort 3 — Internship Capstone, Team 1**

* Denzel Aihoon — DevOps / Infrastructure
* Esther Asamoah
* Frederick Kankam
* Prince Opoku
* Saeed Rauf
* Terence Yebuah

> Note: The project currently has five active members. Update this list if the team composition changes.

## Project Structure

```text
q-flow/
├── frontend/       
├── backend/        
├── database/       # Database migrations and seed data
├── docs/           # Technical documentation
└── .github/        # CI/CD workflows
```

## Core Features

### Customers

* Scan QR code
* Join a queue
* View queue position
* View estimated waiting time
* Receive notifications
* Leave the queue

### Staff

* View live queue
* Call the next customer
* Skip customers
* Mark customers as served
* Monitor queue status

### Operations

* View queue statistics
* Monitor waiting times
* Identify peak periods
* Analyze service performance

## Technology Stack

### Frontend

* React
* Vite

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

### DevOps

* GitHub
* GitHub Actions
* Vercel
* Render

## Development

Clone the repository:


## Branch Strategy

* `main` — production-ready code
* `develop` — integration branch
* `feature/*` — individual features

Developers should create feature branches from `develop` and submit Pull Requests before merging.

## Deployment

The planned production architecture is:

```text
Customer / Staff
       |
       v
   Vercel
  Frontend
       |
       v
    Render
    Backend
       |
       v
 PostgreSQL
   Database
```



## Project Goal

Q-Flow aims to replace physical waiting lines with a virtual queue that allows customers to wait freely while giving service staff better tools for managing customer flow.
