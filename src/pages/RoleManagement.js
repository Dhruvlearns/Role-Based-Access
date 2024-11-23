import React, { useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import AddRoleModal from "../components/AddRoleModal"; // Path to your AddRoleModal component

const RoleManagement = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "Editor", permissions: ["Read", "Write"] },
    { id: 3, name: "Viewer", permissions: ["Read"] },
  ]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  const handleAddRole = () => {
    setEditingRole(null);
    setModalOpen(true); // Open the modal to add a new role
  };

  const handleEditRole = (role) => {
    setEditingRole(role); // Set the role to edit
    setModalOpen(true); // Open the modal to edit the role
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal
  };

  const handleSaveRole = (roleData) => {
    if (editingRole) {
      // Update existing role
      setRoles((prevRoles) =>
        prevRoles.map((role) => (role.id === editingRole.id ? { ...role, ...roleData } : role))
      );
    } else {
      // Add new role
      const newRole = { id: roles.length + 1, ...roleData };
      setRoles((prevRoles) => [...prevRoles, newRole]);
    }
    setModalOpen(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* "Add Role" Button */}
      <Button variant="contained" color="primary" onClick={handleAddRole} style={{ marginBottom: "20px" }}>
        Add Role
      </Button>

      {/* Add/Edit Role Modal */}
      <AddRoleModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveRole}
        role={editingRole} // Pass the role being edited to the modal
      />

      {/* Table to Display Roles */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role Name</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.permissions.join(", ")}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleEditRole(role)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RoleManagement;
