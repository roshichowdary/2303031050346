import { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { fetchNotifications } from "../services/api";

const weights = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export default function PriorityNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const data = await fetchNotifications();

    const sorted = data.sort((a, b) => {
      if (weights[b.Type] !== weights[a.Type]) {
        return weights[b.Type] - weights[a.Type];
      }
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    setNotifications(sorted.slice(0, 10));
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Top 10 Priority Notifications
      </Typography>

      {notifications.map((n) => (
        <Card key={n.ID} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{n.Type}</Typography>
            <Typography>{n.Message}</Typography>
            <Typography color="text.secondary">
              {n.Timestamp}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}