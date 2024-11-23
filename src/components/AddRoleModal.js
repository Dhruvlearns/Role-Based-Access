import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Checkbox, FormControlLabel } from "@mui/material";

const AddRoleModal = ({ open, onClose, onSave, role }) => {
  const [roleData, setRoleData] = useState({
    name: "",
    permissions: [],
  });

  useEffect(() => {
    if (role) {
      setRoleData({
        name: role.name,
        permissions: role.permissions,
      });
    }
  }, [role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoleData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (permission) => {
    setRoleData((prev) => {
      const newPermissions = prev.permissions.includes(permission)
        ? prev.permissions.filter((perm) => perm !== permission)
        : [...prev.permissions, permission];
      return { ...prev, permissions: newPermissions };
    });
  };

  const handleSave = () => {
    onSave(roleData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{role ? "Edit Role" : "Add Role"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Role Name"
          name="name"
          fullWidth
          margin="normal"
          value={roleData.name}
          onChange={handleChange}
        />
        <div>
          <FormControlLabel
            control={<Checkbox checked={roleData.permissions.includes("Read")} onChange={() => handlePermissionChange("Read")} />}
            label="Read"
          />
          <FormControlLabel
            control={<Checkbox checked={roleData.permissions.includes("Write")} onChange={() => handlePermissionChange("Write")} />}
            label="Write"
          />
          <FormControlLabel
            control={<Checkbox checked={roleData.permissions.includes("Delete")} onChange={() => handlePermissionChange("Delete")} />}
            label="Delete"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRoleModal;
