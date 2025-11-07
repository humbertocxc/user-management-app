import { useState, useCallback } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch("/api/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
        setError(null);
      } else {
        setError("Falha ao carregar usuários.");
        console.error("Failed to fetch users");
      }
    } catch (err) {
      setError("Erro no servidor. Por favor, tente novamente.");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUser = async (id: string) => {
    setIsDeleting(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        setUsers((prev) => prev.filter((user) => user.id !== id));
        setError(null);
        return { success: true };
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || "Falha ao excluir usuário.";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage = "Erro no servidor. Por favor, tente novamente.";
      setError(errorMessage);
      console.error("Error deleting user:", err);
      return { success: false, error: errorMessage };
    } finally {
      setIsDeleting(false);
    }
  };

  const updateUser = async (id: string, name: string) => {
    setIsUpdating(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      
      if (response.ok) {
        const updatedUser = await response.json();
        setUsers((prev) =>
          prev.map((user) => (user.id === id ? updatedUser : user))
        );
        setError(null);
        return { success: true };
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || "Falha ao atualizar usuário.";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage = "Erro no servidor. Por favor, tente novamente.";
      setError(errorMessage);
      console.error("Error updating user:", err);
      return { success: false, error: errorMessage };
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    users,
    loading,
    fetchUsers,
    deleteUser,
    updateUser,
    isUpdating,
    isDeleting,
    error,
    clearError: () => setError(null),
  };
}
