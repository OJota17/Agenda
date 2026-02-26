import { Appointment } from "@/types/agenda";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Clock, Scissors, Calendar, Search, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface AllAppointmentsListProps {
  appointments: Appointment[];
  onEdit: (appointment: Appointment) => void;
  onDelete: (id: string) => void;
}

export function AllAppointmentsList({ appointments, onEdit, onDelete }: AllAppointmentsListProps) {
  const [search, setSearch] = useState("");

  const formatDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-");
    return `${d}/${m}/${y}`;
  };

  const sorted = [...appointments].sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    return dateCompare !== 0 ? dateCompare : a.time.localeCompare(b.time);
  });

  const filtered = sorted.filter((a) => {
    const s = search.toLowerCase();
    return a.clientName.toLowerCase().includes(s) || a.service.toLowerCase().includes(s) || a.date.includes(s) || a.clientPhone.includes(s);
  });

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar agendamento..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          {appointments.length === 0 ? "Nenhum agendamento cadastrado ainda." : "Nenhum agendamento encontrado."}
        </div>
      ) : (
        <div className="grid gap-2">
          {filtered.map((apt) => (
            <div
              key={apt.id}
              className="flex items-center justify-between p-3 rounded-lg bg-card border border-border/50 hover:border-primary/20 transition-colors"
            >
              <div className="min-w-0 space-y-1">
                <p className="font-medium">{apt.clientName}</p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(apt.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {apt.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Scissors className="h-3 w-3" />
                    {apt.service}
                  </span>
                  {apt.clientPhone && (
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {apt.clientPhone}
                    </span>
                  )}
                </div>
                {apt.notes && (
                  <p className="text-xs text-muted-foreground italic">{apt.notes}</p>
                )}
              </div>
              <div className="flex items-center gap-1 ml-2 shrink-0">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(apt)}>
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => onDelete(apt.id)}>
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