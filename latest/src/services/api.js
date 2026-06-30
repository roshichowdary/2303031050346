import axios from "axios";

const API =
  "http://4.224.186.213/evaluation-service/notifications";

export const fetchNotifications = async () => {
  try {
    const response = await axios.get(API);

    return response.data.notifications;
  } catch (error) {
    console.error(error);
    return [];
  }
};