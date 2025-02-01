import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface ServiceHoursProps {
  hours: {
    day: string;
    open: string;
    close: string;
  }[];
}

export function ServiceHours({ hours }: ServiceHoursProps) {
  return (
    <Card className="p-4">
      <div className="mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Horário de Funcionamento</h3>
      </div>
      <div className="space-y-2">
        {hours.map((schedule) => (
          <div
            key={schedule.day}
            className="flex items-center justify-between text-sm"
          >
            <span className="font-medium">{schedule.day}</span>
            <span className="text-muted-foreground">
              {schedule.open} - {schedule.close}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}