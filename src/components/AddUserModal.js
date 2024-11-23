import React, { useState } from 'react';
import {
  Modal,
  Button,
  TextField,
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme,
} from '@mui/material';

const AddUserModal = ({ open, onClose, onSave }) => {
  const theme = useTheme(); // Access theme for dynamic styling
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [avatar, setAvatar] = useState('');

  // Error state for input validation
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    role: '',
    status: '',
  });

  // Validation logic
  const validateInputs = () => {
    const newErrors = {};

    // Validate name
    if (!name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters.';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format.';
    }

    // Validate role
    if (!role) {
      newErrors.role = 'Role is required.';
    }

    // Validate status
    if (!status.trim()) {
      newErrors.status = 'Status is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSave = () => {
    if (!validateInputs()) {
      return; // Stop if validation fails
    }

    const userData = {
      name,
      email,
      role,
      status,
      avatar,
    };

    onSave(userData); // Pass the user data to parent component
    setName('');
    setEmail('');
    setRole('');
    setStatus('');
    setAvatar('');
    setErrors({}); // Reset errors
    onClose(); // Close the modal after saving
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          padding: 3,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          width: '400px',
          margin: 'auto',
          marginTop: '100px',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{ marginBottom: 2, color: theme.palette.text.primary }}
        >
          Add New User
        </Typography>
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ marginBottom: 2 }}
          error={!!errors.name}
          helperText={errors.name}
          InputLabelProps={{
            style: { color: theme.palette.text.secondary },
          }}
        />
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: 2 }}
          error={!!errors.email}
          helperText={errors.email}
          InputLabelProps={{
            style: { color: theme.palette.text.secondary },
          }}
        />
        <FormControl
          fullWidth
          sx={{ marginBottom: 2 }}
          error={!!errors.role}
        >
          <InputLabel style={{ color: theme.palette.text.secondary }}>
            Role
          </InputLabel>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ backgroundColor: theme.palette.background.default }}
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Editor">Editor</MenuItem>
            <MenuItem value="Viewer">Viewer</MenuItem>
          </Select>
          {errors.role && (
            <Typography
              variant="caption"
              color="error"
              sx={{ marginLeft: 1 }}
            >
              {errors.role}
            </Typography>
          )}
        </FormControl>
        <TextField
          label="Status"
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ marginBottom: 2 }}
          error={!!errors.status}
          helperText={errors.status}
          InputLabelProps={{
            style: { color: theme.palette.text.secondary },
          }}
        />
        <TextField
          label="Avatar URL"
          fullWidth
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          sx={{ marginBottom: 2 }}
          InputLabelProps={{
            style: { color: theme.palette.text.secondary },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ marginTop: 2 }}
        >
          Save User
        </Button>
      </Box>
    </Modal>
  );
};

export default AddUserModal;
