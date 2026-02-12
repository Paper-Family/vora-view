export interface User {
  id: string;
  email: string;
  name: string;
}

export const authService = {
  signup: (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem("vora_users") || "[]");

    if (users.some((u: User & { password: string }) => u.email === email)) {
      return false;
    }

    const newUser = {
      id: crypto.randomUUID(),
      email,
      password,
    };

    users.push(newUser);
    localStorage.setItem("vora_users", JSON.stringify(users));
    return true;
  },

  login: (email: string, password: string): User | null => {
    const users = JSON.parse(localStorage.getItem("vora_users") || "[]");
    const user = users.find(
      (u: User & { password: string }) =>
        u.email === email && u.password === password
    );

    if (user) {
      const { password, ...userWithoutPassword } = user;
      localStorage.setItem(
        "vora_current_user",
        JSON.stringify(userWithoutPassword)
      );
      return userWithoutPassword;
    }

    return null;
  },

  logout: () => {
    localStorage.removeItem("vora_current_user");
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem("vora_current_user");
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("vora_current_user");
  },
};
