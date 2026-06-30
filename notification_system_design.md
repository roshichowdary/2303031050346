# Stage 1

# Notification System Design

## Overview

This notification platform allows students to receive notifications related to:
- Placements
- Events
- Results

---

## 1. Get All Notifications

**Endpoint:**
GET /api/notifications

**Headers:**
Authorization: Bearer <token>

**Response:**

```json
{
  "success": true,
  "notifications": [
    {
      "id": 1,
      "title": "TCS Placement Drive",
      "message": "Drive starts tomorrow at 10 AM",
      "category": "placement",
      "isRead": false
    }
  ]
}
```

---

## 2. Get Notification By ID

GET /api/notifications/{id}

---

## 3. Create Notification

POST /api/notifications

**Request**

```json
{
  "title": "Hackathon",
  "message": "Starts at 9 AM",
  "category": "event"
}
```

---

## 4. Update Notification

PUT /api/notifications/{id}

---

## 5. Delete Notification

DELETE /api/notifications/{id}

---

## 6. Mark Notification as Read

PATCH /api/notifications/{id}/read

---

## Real-Time Notification

The application uses **WebSocket** for real-time notifications.

Whenever a new notification is created, the backend immediately sends it to all connected users without requiring the page to refresh.