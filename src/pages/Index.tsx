import { useState, useEffect, useMemo } from "react";
import { hospitalData, Hospital } from "@/data/hospitalData";
import { HospitalCard } from "@/components/HospitalCard";
import { HospitalMap } from "@/components/HospitalMap";
import { HospitalDetailModal } from "@/components/HospitalDetailModal";
import { FilterSidebar, FilterOptions } from "@/components/FilterSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapIcon, List, Navigation } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | undefined>();
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    charges: [],
    hasIsolation: false,
    hasOxygen: false,
    hasICU: false,
    hasVentilator: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.longitude, position.coords.latitude]);
          toast({
            title: "Location Detected",
            description: "Showing hospitals near your location",
          });
        },
        (error) => {
          console.log("Geolocation error:", error);
        }
      );
    }
  }, [toast]);

  const filteredHospitals = useMemo(() => {
    return hospitalData.filter((hospital) => {
      const matchesSearch =
        searchQuery === "" ||
        hospital.hospital_details.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(hospital.hospital_category);

      const matchesCharges =
        filters.charges.length === 0 ||
        filters.charges.includes(hospital.charges);

      const matchesResources =
        (!filters.hasIsolation || hospital.vacant_bed_isolation_without_oxygen > 0) &&
        (!filters.hasOxygen || hospital.vacant_isolation_with_oxygen > 0) &&
        (!filters.hasICU || hospital.vacant_bed_icu_without_ventilator > 0) &&
        (!filters.hasVentilator || hospital.vacant_icu_beds_with_ventilator > 0);

      return matchesSearch && matchesCategory && matchesCharges && matchesResources;
    });
  }, [searchQuery, filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-8 px-4 shadow-lg">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold mb-2">Hospital Bed Availability</h1>
          <p className="text-lg opacity-90">Real-time bed tracking across hospitals</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <div className="bg-background rounded-lg shadow-lg p-6 space-y-4">
          <div className="flex gap-3 flex-col sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search by city, district, or hospital name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            <FilterSidebar filters={filters} onFilterChange={setFilters} />
            {!userLocation && (
              <Button
                variant="outline"
                onClick={() => {
                  if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        setUserLocation([position.coords.longitude, position.coords.latitude]);
                        toast({
                          title: "Location Detected",
                          description: "Showing hospitals near your location",
                        });
                      }
                    );
                  }
                }}
              >
                <Navigation className="w-4 h-4 mr-2" />
                My Location
              </Button>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            Showing {filteredHospitals.length} hospital{filteredHospitals.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 pb-8">
        <Tabs defaultValue="list" className="space-y-4">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="list">
              <List className="w-4 h-4 mr-2" />
              List View
            </TabsTrigger>
            <TabsTrigger value="map">
              <MapIcon className="w-4 h-4 mr-2" />
              Map View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredHospitals.map((hospital) => (
                <HospitalCard
                  key={hospital.id}
                  hospital={hospital}
                  onClick={() => setSelectedHospital(hospital)}
                />
              ))}
            </div>
            {filteredHospitals.length === 0 && (
              <div className="text-center py-12 bg-background rounded-lg">
                <p className="text-muted-foreground">
                  No hospitals found matching your criteria
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="map">
            <div className="bg-background rounded-lg shadow-lg overflow-hidden h-[600px]">
              <HospitalMap
                hospitals={filteredHospitals}
                onHospitalClick={setSelectedHospital}
                userLocation={userLocation}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <HospitalDetailModal
        hospital={selectedHospital}
        open={!!selectedHospital}
        onOpenChange={(open) => !open && setSelectedHospital(null)}
      />
    </div>
  );
};

export default Index;
