import React from 'react';
import '../styles/Notification.css';

export default function Notification({ message }) {
  if (!message) {
    return null;
  }

  return <div className="notification-popup">{message}</div>;
}
 