import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { fetchNotifications } from "../services/api";

export default function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const data = await fetchNotifications();
    setNotifications(data);
  };

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter((n) => n.Type === filter);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        All Notifications
      </Typography>

      <FormControl sx={{ minWidth: 200, mb: 3 }}>
        <InputLabel>Filter</InputLabel>

        <Select
          value={filter}
          label="Filter"
          onChange={(e) => setFilter(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
        </Select>
      </FormControl>

      {filteredNotifications.map((notification) => (
        <Card key={notification.ID} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">
              {notification.Type}
            </Typography>

            <Typography>
              {notification.Message}
            </Typography>

            <Typography color="text.secondary">
              {notification.Timestamp}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}