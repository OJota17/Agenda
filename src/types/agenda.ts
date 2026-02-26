export interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  service: string;
  notes?: string;
}

export const SERVICES = [
  "Manicure",
  "Pedicure",
  "Cilios",
  "Sobrancelhas",
  "Henna",
  "Spá dos Pés",
  "Outro",
] as const;