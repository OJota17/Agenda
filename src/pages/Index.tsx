import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { AllAppointmentsList } from "@/components/AllAppointmentsList";
import { AppointmentList } from "@/components/AppointmentList";
import { AppointmentDialog } from "@/components/AppointmentDialog";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Appointment } from "@/types/agenda";
import { CalendarDays, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const [appointments, setAppointments] = useLocalStorage<Appointment[]>("agenda-appointments", []);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

  const dateStr = useMemo(() => {
    const d = selectedDate;
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }, [selectedDate]);

  const appointmentDates = useMemo(() => {
    const dates = new Set(appointments.map((a) => a.date));
    return Array.from(dates).map((d) => {
      const [y, m, day] = d.split("-").map(Number);
      return new Date(y, m - 1, day);
    });
  }, [appointments]);

  const handleSaveAppointment = (data: Omit<Appointment, "id"> & { id?: string }) => {
    if (data.id) {
      setAppointments((prev) => prev.map((a) => (a.id === data.id ? { ...a, ...data, id: a.id } : a)));
    } else {
      setAppointments((prev) => [...prev, { ...data, id: crypto.randomUUID() }]);
    }
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-5xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-primary">Minha</span> Agenda
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Gerencie seus agendamentos
          </p>
        </div>
      </header>

      <main className="container max-w-5xl mx-auto px-4 py-6">
        <Tabs defaultValue="agenda" className="space-y-6">
          <TabsList className="grid w-full max-w-xs grid-cols-2">
            <TabsTrigger value="agenda" className="gap-1.5">
              <CalendarDays className="h-4 w-4" />
              Agenda
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="gap-1.5">
              <Users className="h-4 w-4" />
              Agendados
            </TabsTrigger>
          </TabsList>

          <TabsContent value="agenda">
            <div className="grid md:grid-cols-[auto_1fr] gap-6">
              <div className="rounded-xl border border-border/50 bg-card p-3 self-start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(d) => d && setSelectedDate(d)}
                  modifiers={{ hasAppointment: appointmentDates }}
                  modifiersClassNames={{
                    hasAppointment: "bg-primary/15 text-primary font-semibold",
                  }}
                  className={cn("pointer-events-auto")}
                />
              </div>
              <AppointmentList
                appointments={appointments}
                selectedDate={dateStr}
                onEdit={(a) => { setEditingAppointment(a); setAppointmentDialogOpen(true); }}
                onDelete={handleDeleteAppointment}
                onAdd={() => { setEditingAppointment(null); setAppointmentDialogOpen(true); }}
              />
            </div>
          </TabsContent>

          <TabsContent value="scheduled">
            <AllAppointmentsList
              appointments={appointments}
              onEdit={(a) => { setEditingAppointment(a); setAppointmentDialogOpen(true); }}
              onDelete={handleDeleteAppointment}
            />
          </TabsContent>
        </Tabs>
      </main>

      <AppointmentDialog
        open={appointmentDialogOpen}
        onOpenChange={setAppointmentDialogOpen}
        appointment={editingAppointment}
        onSave={handleSaveAppointment}
        defaultDate={dateStr}
      />
    </div>
  );
};

export default Index;