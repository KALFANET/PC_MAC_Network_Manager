import endpoints  from "./api";

export const userService = {
  fetchUsers: async () => {
    return await endpoints.fetchUsers();
  },
  addUser: async (name: string, email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:4000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!response.ok) {
        throw new Error("Failed to add user");
      }
      return await response.json();
    } catch (error) {
      console.error("User API Error:", error);
      throw error;
    }
  },
  deleteUser: async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      return await response.json();
    } catch (error) {
      console.error("User API Error:", error);
      throw error;
    }
  },
};