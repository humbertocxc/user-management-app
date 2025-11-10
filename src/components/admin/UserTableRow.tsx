import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2 } from "lucide-react";
import { Alert } from "@/components/Alert";
import { useApi } from "@/context/ApiProvider";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface UserTableRowProps {
  user: User;
  isEditing: boolean;
  editName: string;
  onEditNameChange: (value: string) => void;
  onStartEdit: (id: string, name: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDelete: (id: string) => void;
  isUpdating: boolean;
  isDeleting: boolean;
  currentUserId?: string | null;
}

export function UserTableRow({
  user,
  isEditing,
  editName,
  onEditNameChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  isUpdating,
  isDeleting,
}: UserTableRowProps) {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const { currentUserId } = useApi();

  const handleDelete = async (id: string) => {
    setErrorMessage(null);
    try {
      await onDelete(id);
    } catch {
      setErrorMessage("Falha ao excluir usuário. Por favor, tente novamente.");
    }
  };

  return (
    <TableRow>
      {errorMessage && (
        <TableCell colSpan={4}>
          <div className="mb-2">
            <Alert message={errorMessage} type="error" />
          </div>
        </TableCell>
      )}
      <TableCell>
        {isEditing ? (
          <div className="flex items-center space-x-2">
            <Input
              value={editName}
              onChange={(e) => onEditNameChange(e.target.value)}
              className="w-32"
              disabled={isUpdating}
            />
            <Button size="sm" onClick={onSaveEdit} disabled={isUpdating}>
              {isUpdating ? "Salvando..." : "Salvar"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onCancelEdit}
              disabled={isUpdating}
            >
              Cancelar
            </Button>
          </div>
        ) : (
          user.name
        )}
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onStartEdit(user.id, user.name)}
            disabled={isEditing || isUpdating || isDeleting}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                variant="destructive"
                disabled={
                  isDeleting ||
                  isEditing ||
                  !!(currentUserId && currentUserId === user.id)
                }
              >
                {isDeleting ? (
                  "Excluindo..."
                ) : currentUserId && currentUserId === user.id ? (
                  "Excluir (você)"
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir Usuário</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza de que deseja excluir {user.name}? Esta ação não
                  pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(user.id)}
                  disabled={
                    isDeleting || !!(currentUserId && currentUserId === user.id)
                  }
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? "Excluindo..." : "Excluir"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  );
}
