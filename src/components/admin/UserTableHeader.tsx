import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface UserTableHeaderProps {
  sortField: "name" | "email" | "createdAt";
  sortOrder: "asc" | "desc";
  onSort: (field: "name" | "email" | "createdAt") => void;
}

export function UserTableHeader({
  sortField,
  sortOrder,
  onSort,
}: UserTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("name")}
        >
          Nome de Usuário{" "}
          {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
        </TableHead>
        <TableHead
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("email")}
        >
          Email {sortField === "email" && (sortOrder === "asc" ? "↑" : "↓")}
        </TableHead>
        <TableHead
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("createdAt")}
        >
          Criado Em{" "}
          {sortField === "createdAt" && (sortOrder === "asc" ? "↑" : "↓")}
        </TableHead>
        <TableHead>Ações</TableHead>
      </TableRow>
    </TableHeader>
  );
}
