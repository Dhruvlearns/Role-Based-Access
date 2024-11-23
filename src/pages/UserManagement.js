import React, { useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Avatar } from "@mui/material";
import AddUserModal from "../components/AddUserModal"; // Ensure the correct path to your modal component
import { users as initialUsers } from "../data"; // Importing users data from data.js
import Notification from "../components/Notification"; // Import the Notification component

// Function to sort users by a specific field and order
const sortUsers = (users, order, orderBy) => {
  return users.sort((a, b) => {
    if (orderBy === 'name') {
      return order === 'desc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    if (orderBy === 'role') {
      return order === 'desc' ? a.role.localeCompare(b.role) : b.role.localeCompare(a.role);
    }
    if (orderBy === 'status') {
      return order === 'desc' ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status);
    }
    return 0;
  });
};

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers); // Use the imported users array
  const [isModalOpen, setModalOpen] = useState(false);
  const [order, setOrder] = useState('asc'); // Order: 'asc' or 'desc'
  const [orderBy, setOrderBy] = useState('name'); // Default sorting by 'name'
  const [auditLogs, setAuditLogs] = useState([]); // State for storing audit logs
  const [notifications, setNotifications] = useState([]); // State for storing notifications
  const [openNotification, setOpenNotification] = useState(false); // State for controlling notification visibility
  const adminUser = "Admin"; // Static admin user for the sake of this example

  const handleAddUser = () => setModalOpen(true); // Opens the modal
  const handleCloseModal = () => setModalOpen(false); // Closes the modal

  const handleSaveUser = (userData) => {
    const newUser = { id: users.length + 1, ...userData }; // Generate a new user ID
    setUsers((prevUsers) => [...prevUsers, newUser]); // Add the new user to the list
    setAuditLogs((prevLogs) => [
      ...prevLogs,
      { action: "User Created", user: newUser.name, timestamp: new Date(), admin: adminUser },
    ]); // Log the action

    // Trigger a notification
    setNotifications((prev) => [
      ...prev,
      { message: `New User Created: ${newUser.name}`, id: newUser.id },
    ]);
    setOpenNotification(true); // Show the notification
    console.log("New User Added:", newUser);
  };

  const handleDeleteUser = (userId) => {
    const deletedUser = users.find(user => user.id === userId);
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId)); // Remove the user with the given ID
    setAuditLogs((prevLogs) => [
      ...prevLogs,
      { action: "User Deleted", user: deletedUser.name, timestamp: new Date(), admin: adminUser },
    ]); // Log the action

    // Trigger a notification
    setNotifications((prev) => [
      ...prev,
      { message: `User Deleted: ${deletedUser.name}`, id: deletedUser.id },
    ]);
    setOpenNotification(true); // Show the notification
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Sorted users based on the current sorting state
  const sortedUsers = sortUsers([...users], order, orderBy);

  return (
    <div style={{ padding: "20px" }}>
      {/* The "Add User" button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddUser}
        sx={{ marginBottom: 2, padding: "10px", backgroundColor: "blue" }}
      >
        Add User
      </Button>

      {/* The modal for adding user */}
      <AddUserModal open={isModalOpen} onClose={handleCloseModal} onSave={handleSaveUser} />

      {/* Table displaying users */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell> {/* Added Avatar column */}
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'role'}
                  direction={orderBy === 'role' ? order : 'asc'}
                  onClick={() => handleRequestSort('role')}
                >
                  Role
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'status'}
                  direction={orderBy === 'status' ? order : 'asc'}
                  onClick={() => handleRequestSort('status')}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell> {/* Added Actions column for delete */}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {/* Avatar Display */}
                  <Avatar alt={user.name} src={user.avatar} sx={{ width: 40, height: 40 }} />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  {/* Delete button */}
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Audit Logs Section */}
      <div style={{ marginTop: "30px" }}>
        <h2>Audit Logs</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Action</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Timestamp</TableCell>
                <TableCell>Admin</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {auditLogs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{log.timestamp.toLocaleString()}</TableCell>
                  <TableCell>{log.admin}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Display Notifications */}
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          message={notification.message}
          open={openNotification}
          onClose={() => setOpenNotification(false)}
        />
      ))}
    </div>
  );
};

export default UserManagement;
