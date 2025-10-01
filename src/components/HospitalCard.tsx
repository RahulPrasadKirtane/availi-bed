import { Hospital, calculateTotalVacantBeds, getHospitalStatus } from "@/data/hospitalData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed } from "lucide-react";

interface HospitalCardProps {
  hospital: Hospital;
  onClick: () => void;
}

export const HospitalCard = ({ hospital, onClick }: HospitalCardProps) => {
  const totalVacantBeds = calculateTotalVacantBeds(hospital);
  const status = getHospitalStatus(hospital);
  
  const statusColors = {
    available: "bg-[hsl(var(--status-available))] text-white",
    limited: "bg-[hsl(var(--status-limited))] text-white",
    full: "bg-[hsl(var(--status-full))] text-white"
  };
  
  const statusLabels = {
    available: "Available",
    limited: "Limited",
    full: "Full"
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow duration-300 border-2 hover:border-primary"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg font-semibold line-clamp-2">
            {hospital.hospital_details}
          </CardTitle>
          <Badge className={statusColors[status]}>
            {statusLabels[status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span className="line-clamp-2">{hospital.address}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Bed className="w-4 h-4 text-primary" />
          <span className="font-semibold text-foreground">
            {totalVacantBeds} Vacant Beds
          </span>
        </div>
        <div className="flex gap-2 flex-wrap pt-2">
          <Badge variant="outline" className="text-xs">
            {hospital.hospital_category}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {hospital.charges}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
