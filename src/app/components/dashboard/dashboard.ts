import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightService, Flight } from '../../services/flight';
import { FlightMapComponent } from '../flight-map/flight-map';
import { FlightDetailsComponent } from '../flight-details/flight-details';
import { KpiCardsComponent } from '../kpi-cards/kpi-cards';
import { FilterBarComponent } from '../filter-bar/filter-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FlightMapComponent,
    FlightDetailsComponent,
    KpiCardsComponent,
    FilterBarComponent
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {

  allFlights: Flight[] = [];
  filteredFlights: Flight[] = [];
  selectedFlight: Flight | null = null;
  counts = { total: 0, active: 0, delayed: 0, arrived: 0 };
  originOptions: string[] = [];
  destinationOptions: string[] = [];

  isDarkMode = false;

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.allFlights = this.flightService.getAllFlights();
    this.filteredFlights = this.allFlights;
    this.counts = this.flightService.getFlightCounts();
    this.originOptions = this.flightService.getUniqueOrigins();
    this.destinationOptions = this.flightService.getUniqueDestinations();
  }

  onFiltersChanged(filters: { search: string; status: string; origin: string; destination: string }): void {
    this.filteredFlights = this.flightService.filterFlights(
      filters.search,
      filters.status,
      filters.origin,
      filters.destination
    );

    this.counts = {
      total: this.filteredFlights.length,
      active: this.filteredFlights.filter(f => f.status === 'Active').length,
      delayed: this.filteredFlights.filter(f => f.status === 'Delayed').length,
      arrived: this.filteredFlights.filter(f => f.status === 'Arrived').length,
    };

    if (this.selectedFlight && !this.filteredFlights.some(f => f.id === this.selectedFlight!.id)) {
      this.selectedFlight = null;
    }
  }

  onFlightSelected(flight: Flight): void {
    this.selectedFlight = flight;
    this.flightService.setSelectedFlight(flight);
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }
}