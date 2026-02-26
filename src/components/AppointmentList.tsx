import { Appointment } from "@/types/agenda";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Clock, Scissors, CalendarPlus, Phone } from "lucide-react";

interface AppointmentListProps {
  appointments: Appointment[];
  selectedDate: string;
  onEdit: (appointment: Appointment) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export function AppointmentList({ appointments, selectedDate, onEdit, onDelete, onAdd }: AppointmentListProps) {
  const dayAppointments = appointments
    .filter((a) => a.date === selectedDate)
    .sort((a, b) => a.time.localeCompare(b.time));

  const formatDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-");
    return `${d}/${m}/${y}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">
          Agenda — {formatDate(selectedDate)}
        </h3>
        <Button onClick={onAdd} size="sm" className="gap-1.5">
          <CalendarPlus className="h-4 w-4" />
          <span className="hidden sm:inline">Agendar</span>
        </Button>
      </div>

      {dayAppointments.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Nenhum agendamento para este dia.
        </div>
      ) : (
        <div className="grid gap-2">
          {dayAppointments.map((apt) => (
            <div
              key={apt.id}
              className="flex items-center justify-between p-3 rounded-lg bg-card border border-border/50 hover:border-primary/20 transition-colors"
            >
              <div className="min-w-0 space-y-1">
                <p className="font-medium">{apt.clientName}</p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
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