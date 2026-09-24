import { Injectable } from '@angular/core';

export interface Flight {
  id: number;
  flightNumber: string;
  callsign: string;
  origin: string;
  destination: string;
  status: 'Active' | 'Delayed' | 'Arrived';
  aircraftType: string;
  departureTime: string;
  arrivalTime: string;
  originLat: number;
  originLng: number;
  destLat: number;
  destLng: number;
}

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private flights: Flight[] = [
    { id: 1, flightNumber: 'AI101', callsign: 'AIC101', origin: 'Delhi', destination: 'Mumbai', status: 'Active', aircraftType: 'A320', departureTime: '09:00', arrivalTime: '11:15', originLat: 28.5562, originLng: 77.1000, destLat: 19.0896, destLng: 72.8656 },
    { id: 2, flightNumber: 'AI202', callsign: 'AIC202', origin: 'Mumbai', destination: 'Bangalore', status: 'Delayed', aircraftType: 'B737', departureTime: '10:30', arrivalTime: '12:00', originLat: 19.0896, originLng: 72.8656, destLat: 13.1986, destLng: 77.7066 },
    { id: 3, flightNumber: 'SG303', callsign: 'SEJ303', origin: 'Chennai', destination: 'Kolkata', status: 'Arrived', aircraftType: 'A321', departureTime: '07:15', arrivalTime: '09:45', originLat: 12.9941, originLng: 80.1709, destLat: 22.6540, destLng: 88.4467 },
    { id: 4, flightNumber: 'UK404', callsign: 'VTI404', origin: 'Hyderabad', destination: 'Delhi', status: 'Active', aircraftType: 'A320', departureTime: '13:00', arrivalTime: '15:20', originLat: 17.2403, originLng: 78.4294, destLat: 28.5562, destLng: 77.1000 },
    { id: 5, flightNumber: 'AI606', callsign: 'AIC606', origin: 'Kolkata', destination: 'Chennai', status: 'Active', aircraftType: 'B787', departureTime: '08:00', arrivalTime: '10:30', originLat: 22.6540, originLng: 88.4467, destLat: 12.9941, destLng: 80.1709 },
    { id: 6, flightNumber: 'SG707', callsign: 'SEJ707', origin: 'Bangalore', destination: 'Hyderabad', status: 'Delayed', aircraftType: 'A320', departureTime: '11:00', arrivalTime: '12:15', originLat: 13.1986, originLng: 77.7066, destLat: 17.2403, destLng: 78.4294 },
    { id: 7, flightNumber: 'UK808', callsign: 'VTI808', origin: 'Delhi', destination: 'Goa', status: 'Active', aircraftType: 'A321', departureTime: '14:30', arrivalTime: '17:00', originLat: 28.5562, originLng: 77.1000, destLat: 15.3808, destLng: 73.8314 },
    { id: 8, flightNumber: '6E909', callsign: 'IGO909', origin: 'Mumbai', destination: 'Delhi', status: 'Arrived', aircraftType: 'A320neo', departureTime: '06:00', arrivalTime: '08:15', originLat: 19.0896, originLng: 72.8656, destLat: 28.5562, destLng: 77.1000 },
    { id: 9, flightNumber: 'AI110', callsign: 'AIC110', origin: 'Chennai', destination: 'Bangalore', status: 'Active', aircraftType: 'A320', departureTime: '09:45', arrivalTime: '10:45', originLat: 12.9941, originLng: 80.1709, destLat: 13.1986, destLng: 77.7066 },
    { id: 10, flightNumber: 'UK312', callsign: 'VTI312', origin: 'Hyderabad', destination: 'Kolkata', status: 'Delayed', aircraftType: 'A321', departureTime: '12:30', arrivalTime: '14:45', originLat: 17.2403, originLng: 78.4294, destLat: 22.6540, destLng: 88.4467 },
    { id: 11, flightNumber: '6E413', callsign: 'IGO413', origin: 'Delhi', destination: 'Chennai', status: 'Active', aircraftType: 'A320neo', departureTime: '10:00', arrivalTime: '12:40', originLat: 28.5562, originLng: 77.1000, destLat: 12.9941, destLng: 80.1709 },
    { id: 12, flightNumber: 'AI514', callsign: 'AIC514', origin: 'Bangalore', destination: 'Pune', status: 'Arrived', aircraftType: 'A320', departureTime: '07:30', arrivalTime: '09:00', originLat: 13.1986, originLng: 77.7066, destLat: 18.5793, destLng: 73.9089 },
    { id: 13, flightNumber: 'SG615', callsign: 'SEJ615', origin: 'Kolkata', destination: 'Delhi', status: 'Active', aircraftType: 'A321', departureTime: '15:00', arrivalTime: '17:30', originLat: 22.6540, originLng: 88.4467, destLat: 28.5562, destLng: 77.1000 },
    { id: 14, flightNumber: '6E817', callsign: 'IGO817', origin: 'Mumbai', destination: 'Hyderabad', status: 'Delayed', aircraftType: 'A320neo', departureTime: '11:30', arrivalTime: '13:00', originLat: 19.0896, originLng: 72.8656, destLat: 17.2403, destLng: 78.4294 },
    { id: 15, flightNumber: 'AI918', callsign: 'AIC918', origin: 'Pune', destination: 'Delhi', status: 'Active', aircraftType: 'B737', departureTime: '08:45', arrivalTime: '10:50', originLat: 18.5793, originLng: 73.9089, destLat: 28.5562, destLng: 77.1000 },
  ];

  private selectedFlight: Flight | null = null;

  
  getAllFlights(): Flight[] {
    return this.flights;
  }

  setSelectedFlight(flight: Flight): void {
    this.selectedFlight = flight;
  }

  getSelectedFlight(): Flight | null {
    return this.selectedFlight;
  }
  filterFlights(searchText: string, status: string, origin: string, destination: string): Flight[] {
    return this.flights.filter(flight => {
      const matchesSearch = searchText
        ? flight.callsign.toLowerCase().includes(searchText.toLowerCase())
        : true;
      const matchesStatus = status ? flight.status === status : true;
      const matchesOrigin = origin ? flight.origin === origin : true;
      const matchesDestination = destination ? flight.destination === destination : true;

      return matchesSearch && matchesStatus && matchesOrigin && matchesDestination;
    });
  }
  getFlightCounts() {
    return {
      total: this.flights.length,
      active: this.flights.filter(f => f.status === 'Active').length,
      delayed: this.flights.filter(f => f.status === 'Delayed').length,
      arrived: this.flights.filter(f => f.status === 'Arrived').length,
    };
  }

  getUniqueOrigins(): string[] {
    return [...new Set(this.flights.map(f => f.origin))];
  }

  getUniqueDestinations(): string[] {
    return [...new Set(this.flights.map(f => f.destination))];
  }
getCurrentPosition(flight: Flight): { lat: number; lng: number; bearing: number } {
  const t = 0.4;
  const lat = flight.originLat + (flight.destLat - flight.originLat) * t;
  const lng = flight.originLng + (flight.destLng - flight.originLng) * t;
  const bearing = this.calculateBearing(flight.originLat, flight.originLng, flight.destLat, flight.destLng);
  return { lat, lng, bearing };
}

private calculateBearing(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;
  const dLng = toRad(lng2 - lng1);
  const y = Math.sin(dLng) * Math.cos(toRad(lat2));
  const x = Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
            Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLng);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}
}