import { useState } from "react";

export function useUserEdit() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const startEdit = (id: string, currentName: string) => {
    setEditingId(id);
    setEditName(currentName);
  };

  const saveEdit = () => {
    return { id: editingId, name: editName };
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  return {
    editingId,
    editName,
    setEditName,
    startEdit,
    saveEdit,
    cancelEdit,
  };
}
