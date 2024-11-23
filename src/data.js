// src/data.js

export const users = [
    { id: 1, name: "Dhruv Agrawal", email: "Dhruv@example.com", role: "Admin", status: "Active" ,avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Aarav singhnaiya", email: "Aarav@example.com", role: "Editor", status: "Inactive",avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 3, name: "sunil singhnaiya", email: "sunil@example.com", role: "frontend dev", status: "Inactive",avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 4, name: "vikrant singhnaiya", email: "Aaravikrant@example.com", role: "backend dev", status: "Inactive" ,avatar: "https://i.pravatar.cc/150?img=1"},
  ];
  
  export const roles = [
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "Editor", permissions: ["Read", "Write"] },
  ];
  