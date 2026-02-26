import { Client } from "@/types/agenda";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Phone, Mail, UserPlus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ClientListProps {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export function ClientList({ clients, onEdit, onDelete, onAdd }: ClientListProps) {
  const [search, setSearch] = useState("");
  
  const filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={onAdd} size="sm" className="gap-1.5">
          <UserPlus className="h-4 w-4" />
          <span className="hidden sm:inline">Novo Cliente</span>
        </Button>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          {clients.length === 0 ? "Nenhum cliente cadastrado ainda." : "Nenhum cliente encontrado."}
        </div>
      ) : (
        <div className="grid gap-2">
          {filtered.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-between p-3 rounded-lg bg-card border border-border/50 hover:border-primary/20 transition-colors"
            >
              <div className="min-w-0">
                <p className="font-medium truncate">{client.name}</p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-0.5">
                  {client.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {client.phone}
                    </span>
                  )}
                  {client.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      <span className="truncate max-w-[180px]">{client.email}</span>
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 ml-2 shrink-0">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(client)}>
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => onDelete(client.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
