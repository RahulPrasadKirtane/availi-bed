import { Hospital, calculateTotalVacantBeds, getHospitalStatus } from "@/data/hospitalData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Building2, DollarSign, Bed, Wind, Droplets, Activity } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface HospitalDetailModalProps {
  hospital: Hospital | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const HospitalDetailModal = ({ hospital, open, onOpenChange }: HospitalDetailModalProps) => {
  const [queuePosition] = useState(Math.floor(Math.random() * 20) + 1);
  const { toast } = useToast();

  if (!hospital) return null;

  const totalVacantBeds = calculateTotalVacantBeds(hospital);
  const status = getHospitalStatus(hospital);

  const handleQueueRequest = () => {
    toast({
      title: "Request Sent Successfully",
      description: `Your request has been sent to ${hospital.hospital_details}. Your queue position is #${queuePosition}. We will notify you when space is confirmed.`,
      duration: 6000,
    });
    onOpenChange(false);
  };

  const statusColors = {
    available: "bg-[hsl(var(--status-available))] text-white",
    limited: "bg-[hsl(var(--status-limited))] text-white",
    full: "bg-[hsl(var(--status-full))] text-white"
  };

  const statusLabels = {
    available: "Available",
    limited: "Limited Availability",
    full: "Full"
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start gap-4">
            <DialogTitle className="text-2xl">{hospital.hospital_details}</DialogTitle>
            <Badge className={statusColors[status]}>
              {statusLabels[status]}
            </Badge>
          </div>
          <DialogDescription className="text-base">
            Complete availability and resource information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm">{hospital.address}</span>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                <Badge variant="outline">{hospital.hospital_category}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <Badge variant="outline">{hospital.charges}</Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Total Summary */}
          <div className="bg-primary/5 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bed className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Vacant Beds</p>
                  <p className="text-3xl font-bold text-primary">{totalVacantBeds}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Capacity</p>
                <p className="text-2xl font-semibold">{hospital.free_regulated_beds}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Detailed Availability */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Bed Availability by Type</h3>
            
            <div className="grid gap-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Bed className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">Isolation (Without Oxygen)</span>
                </div>
                <span className="text-xl font-semibold text-primary">
                  {hospital.vacant_bed_isolation_without_oxygen}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Droplets className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">Isolation (With Oxygen)</span>
                </div>
                <span className="text-xl font-semibold text-primary">
                  {hospital.vacant_isolation_with_oxygen}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">ICU (Without Ventilator)</span>
                </div>
                <span className="text-xl font-semibold text-primary">
                  {hospital.vacant_bed_icu_without_ventilator}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Wind className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">ICU (With Ventilator)</span>
                </div>
                <span className="text-xl font-semibold text-primary">
                  {hospital.vacant_icu_beds_with_ventilator}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Queue Action */}
          <div className="space-y-3">
            <Button 
              onClick={handleQueueRequest}
              disabled={status === 'full'}
              className="w-full"
              size="lg"
            >
              {status === 'full' ? 'No Beds Available' : 'Request Bed / Start Queuing'}
            </Button>
            {status === 'full' && (
              <p className="text-sm text-center text-muted-foreground">
                This hospital currently has no vacant beds. Please check other hospitals.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
