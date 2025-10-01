import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Hospital, getHospitalStatus } from "@/data/hospitalData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";

interface HospitalMapProps {
  hospitals: Hospital[];
  onHospitalClick: (hospital: Hospital) => void;
  userLocation?: [number, number];
}

export const HospitalMap = ({ hospitals, onHospitalClick, userLocation }: HospitalMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapboxToken, setMapboxToken] = useState("");
  const [isTokenSet, setIsTokenSet] = useState(false);

  const statusColors = {
    available: "#22c55e",
    limited: "#f59e0b", 
    full: "#ef4444"
  };

  useEffect(() => {
    if (!mapContainer.current || !isTokenSet || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: userLocation || [78.9629, 20.5937], // India center
        zoom: userLocation ? 12 : 4.5,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      // Clear existing markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      // Add markers for hospitals
      hospitals.forEach((hospital) => {
        const status = getHospitalStatus(hospital);
        const markerEl = document.createElement("div");
        markerEl.className = "hospital-marker";
        markerEl.style.width = "30px";
        markerEl.style.height = "30px";
        markerEl.style.borderRadius = "50%";
        markerEl.style.backgroundColor = statusColors[status];
        markerEl.style.border = "3px solid white";
        markerEl.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
        markerEl.style.cursor = "pointer";

        const marker = new mapboxgl.Marker(markerEl)
          .setLngLat([hospital.longitude, hospital.latitude])
          .addTo(map.current!);

        markerEl.addEventListener("click", () => {
          onHospitalClick(hospital);
        });

        markersRef.current.push(marker);
      });

      // Add user location marker if available
      if (userLocation) {
        const userMarkerEl = document.createElement("div");
        userMarkerEl.style.width = "20px";
        userMarkerEl.style.height = "20px";
        userMarkerEl.style.borderRadius = "50%";
        userMarkerEl.style.backgroundColor = "#3b82f6";
        userMarkerEl.style.border = "3px solid white";
        userMarkerEl.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";

        new mapboxgl.Marker(userMarkerEl)
          .setLngLat(userLocation)
          .addTo(map.current!);
      }
    } catch (error) {
      console.error("Error initializing map:", error);
    }

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      map.current?.remove();
    };
  }, [hospitals, onHospitalClick, userLocation, isTokenSet, mapboxToken]);

  if (!isTokenSet) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted/30 rounded-lg">
        <div className="max-w-md w-full p-6 space-y-4">
          <div className="text-center space-y-2">
            <Key className="w-12 h-12 mx-auto text-muted-foreground" />
            <h3 className="text-lg font-semibold">Mapbox Token Required</h3>
            <p className="text-sm text-muted-foreground">
              Please enter your Mapbox public token to view the interactive map.
            </p>
            <p className="text-xs text-muted-foreground">
              Get your token at{" "}
              <a 
                href="https://mapbox.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                mapbox.com
              </a>
            </p>
          </div>
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="pk.eyJ1..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="font-mono text-sm"
            />
            <Button 
              onClick={() => setIsTokenSet(true)}
              disabled={!mapboxToken.trim()}
              className="w-full"
            >
              Load Map
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      <div className="absolute top-4 left-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 p-3 rounded-lg shadow-lg">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[hsl(var(--status-available))]"></div>
            <span>Available (≥10%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[hsl(var(--status-limited))]"></div>
            <span>Limited (&lt;10%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[hsl(var(--status-full))]"></div>
            <span>Full (0%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
