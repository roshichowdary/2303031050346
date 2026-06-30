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

# Stage 2 
Which database would you use?
Database: PostgreSQL

Reason:
- Fast
- Reliable
- Easy to use
- Supports SQL

Database Schema
## Database Schema

### Students Table

| Column | Type |
|---------|------|
| id | INT |
| name | VARCHAR |
| email | VARCHAR |

### Notifications Table

| Column | Type |
|---------|------|
| id | INT |
| studentId | INT |
| title | VARCHAR |
| message | TEXT |
| notificationType | ENUM |
| isRead | BOOLEAN |
| createdAt | TIMESTAMP |
 
  -- Get all notifications
SELECT * FROM notifications WHERE studentId = 101;

-- Mark notification as read
UPDATE notifications
SET isRead = TRUE
WHERE notificationId = 1;

-- Delete notification
DELETE FROM notifications
WHERE notificationId = 1;

-- Create notification
INSERT INTO notifications(studentId,title,message,notificationType,isRead,createdAt)
VALUES(101,'Placement Drive','Google Hiring','Placement',FALSE,NOW());

 What problems occur when data grows?
 ## Challenges with Large Data

- Slow database queries
- Increased storage usage
- Higher server load
- Longer response times

How would you solve them?

## Solutions

- Create indexes on frequently searched columns.
- Use pagination instead of loading all notifications.
- Cache frequently accessed data.
- Partition large tables.

Create Notification

INSERT INTO notifications(title, message, studentId, notificationType)
VALUES ('Placement Drive', 'TCS drive tomorrow', 101, 'Placement');

Get Notifications

SELECT * FROM notifications
WHERE studentId = 101;

Mark as Read
UPDATE notifications
SET isRead = true
WHERE id = 1;

Delete Notification

DELETE FROM notifications
WHERE id = 1;


Part 4

Question asks

As data grows

What problems?

Slow queries

Large tables

High storage

Slow indexing

Concurrency

 #solutions 
 Indexes

Partitioning

Caching

Pagination

Archiving

Replication


# Stage 3
SELECT *
FROM notifications
WHERE studentID=1042
AND isRead=false
ORDER BY createdAt ASC;


Is query correct?

Yes.

It returns unread notifications of one student.
Question 2

Why slow?

Because table has

50,000 students

5,000,000 notifications

Database scans millions of rows.

No proper indexes.

Sorting also costs time.

Question 3

What change?

Create Composite Index

(studentID,isRead,createdAt)

Query becomes much faster.

Question 4

Cost

Without index

O(n)

Full Table Scan

With Index

O(log n)

Question 5

Should we index every column?

Answer

No.

Because

Consumes storage

Slows INSERT

Slows UPDATE

Slows DELETE

Only index frequently searched columns.

Question 6

Write SQL

Students who got placement notifications in last 7 days.

SELECT DISTINCT studentID
FROM notifications
WHERE notificationType='Placement'
AND createdAt>=NOW()-INTERVAL '7 DAYS';

Stage 3 finished.

STEP 5

Continue same file.

Write

# Stage 4

Now question says

Database is overloaded.

How improve performance?

Write solutions.

1. Pagination

Instead of

10000 notifications

Return

20
2. Redis Cache

Frequently accessed notifications stored in memory.

Very fast.

3. WebSocket

Instead of fetching every refresh,

Push notifications instantly.

4. Lazy Loading

Load next notifications while scrolling.

5. Database Indexing

Improve search speed.

6. Archiving

Move old notifications to archive table.

7. Read Replica

Use another database for reads.

Main database handles writes.

Finally write tradeoffs.

Example

Solution	Advantage	Disadvantage
Cache	Very Fast	Memory Cost
Pagination	Less Load	Multiple Requests
WebSocket	Real-time	More Server Connections
Read Replica	Better Reads	Replication Delay
Archiving	Smaller Active Table	Archived Data Access Slower