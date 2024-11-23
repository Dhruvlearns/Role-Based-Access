import React from "react";
import { Button, Grid, Typography, Card, CardContent } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Importing framer-motion

// Import images
import adminImage from "../pages/assets/admin.jpg";
import roleImage from "../pages/assets/role.jpg";
import userImage from "../pages/assets/user.jpg";

// Custom styles
const useStyles = makeStyles(() => ({
  heroSection: {
    background: "linear-gradient(to right, #1E3C72, #2A5298)",
    padding: "80px 0",
    color: "white",
    textAlign: "center",
  },
  title: {
    fontSize: "4rem",
    fontWeight: "bold",
    letterSpacing: "2px",
  },
  subTitle: {
    fontSize: "1.5rem",
    margin: "20px 0",
    fontWeight: "500",
  },
  heroButton: {
    backgroundColor: "#ff6f61",
    padding: "15px 30px",
    fontSize: "1rem",
    borderRadius: "30px",
    color: "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    "&:hover": {
      backgroundColor: "#ff4b3d",
    },
  },
  gridContainer: {
    marginTop: "50px",
  },
  card: {
    maxWidth: 345,
    backgroundColor: "#f5f5f5",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  cardImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    marginBottom: "10px",
  },
  cardDescription: {
    fontSize: "0.9rem",
    color: "#555",
  },
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <div>
      {/* Hero Section */}
      <div className={classes.heroSection}>
        <Typography className={classes.title} variant="h2">
          Welcome to Your RBAC Dashboard
        </Typography>
        <Typography className={classes.subTitle} variant="h5">
          Manage Users, Roles, and Permissions with Ease
        </Typography>
        <Link to="/users" style={{ textDecoration: "none" }}>
          <Button className={classes.heroButton}>Get Started</Button>
        </Link>
      </div>

      {/* Card Section */}
      <Grid container spacing={4} className={classes.gridContainer} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Card className={classes.card}>
              <img
                src={userImage}
                alt="User Management"
                className={classes.cardImage}
              />
              <CardContent>
                <Typography className={classes.cardTitle} variant="h6">
                  User Management
                </Typography>
                <Typography className={classes.cardDescription}>
                  Add, edit, and manage users with ease, ensuring smooth access control.
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Card className={classes.card}>
              <img
                src={roleImage}
                alt="Role Management"
                className={classes.cardImage}
              />
              <CardContent>
                <Typography className={classes.cardTitle} variant="h6">
                  Role Management
                </Typography>
                <Typography className={classes.cardDescription}>
                  Create and manage roles to ensure the right people have the right permissions.
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Card className={classes.card}>
              <img
                src={adminImage}
                alt="Audit Logs"
                className={classes.cardImage}
              />
              <CardContent>
                <Typography className={classes.cardTitle} variant="h6">
                  Audit Logs
                </Typography>
                <Typography className={classes.cardDescription}>
                  Keep track of all changes and user actions for security and compliance.
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
