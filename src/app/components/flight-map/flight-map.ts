import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { Flight, FlightService } from '../../services/flight';

@Component({
  selector: 'app-flight-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flight-map.html',
  styleUrl: './flight-map.scss'
})
export class FlightMapComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() flights: Flight[] = [];
  @Input() selectedFlight: Flight | null = null;
  @Output() flightSelected = new EventEmitter<Flight>();
  private map!: L.Map;
  private markersLayer: L.LayerGroup = L.layerGroup();    
  private routeLine: L.Polyline | null = null;
constructor(private flightService: FlightService) {}
  ngOnInit(): void {
    const iconDefault = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
    L.Marker.prototype.options.icon = iconDefault;
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.renderMarkers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.map) {
      this.renderMarkers();
      this.drawRoute();
    }
  }

  private initMap(): void {
    this.map = L.map('map').setView([20.5937, 78.9629], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(this.map);
    this.markersLayer.addTo(this.map);
  }

 private renderMarkers(): void {
  this.markersLayer.clearLayers();
  this.flights.forEach(flight => {
    const color = this.getStatusColor(flight.status);
    const position = this.flightService.getCurrentPosition(flight);
    const planeIcon = L.divIcon({
      className: 'plane-marker',
      html: `<div class="plane-icon" style="color:${color}; transform: rotate(${position.bearing}deg);">✈</div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
    const marker = L.marker([position.lat, position.lng], { icon: planeIcon });
    marker.bindPopup(`
      <strong>${flight.flightNumber}</strong><br>
      Callsign: ${flight.callsign}<br>
      ${flight.origin} → ${flight.destination}<br>
      Status: <span style="color:${color}; font-weight:600;">${flight.status}</span>
    `);
    marker.on('click', () => {
      this.flightSelected.emit(flight);
    });
    marker.addTo(this.markersLayer);
  });
}


private getStatusColor(status: string): string {
  switch (status) {
    case 'Active':    return '#2563eb'; 
    case 'Delayed':   return '#d97706'; 
    case 'Arrived':   return '#16a34a'; 
    case 'Scheduled': return '#6b7280'; 
    default:          return '#6b7280';
  }
}
  private drawRoute(): void {
    if (this.routeLine) {
      this.map.removeLayer(this.routeLine);
      this.routeLine = null;
    }
    const stillVisible = this.selectedFlight && this.flights.some(f => f.id === this.selectedFlight!.id);
      if (!this.selectedFlight || !stillVisible) {
        return;
      }
    const origin: L.LatLngTuple = [this.selectedFlight.originLat, this.selectedFlight.originLng];
    const destination: L.LatLngTuple = [this.selectedFlight.destLat, this.selectedFlight.destLng];
    this.routeLine = L.polyline([origin, destination], {
      color: this.getStatusColor(this.selectedFlight.status),
      weight: 3,
      dashArray: '6, 6',
    }).addTo(this.map);

    this.map.fitBounds(this.routeLine.getBounds(), { padding: [50, 50] });
  }
 
}