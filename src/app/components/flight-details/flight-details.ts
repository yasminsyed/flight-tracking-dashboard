import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flight } from '../../services/flight';

@Component({
  selector: 'app-flight-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flight-details.html',
  styleUrl: './flight-details.scss'
})
export class FlightDetailsComponent implements OnChanges {
  @Input() flight: Flight | null = null;
  progressPercent: number = 0;
  operationsLog: string[] = [];

  ngOnChanges(): void {
    if (this.flight) {
      if (this.flight.status === 'Arrived') {
        this.progressPercent = 100;
      } else {
        this.progressPercent = 60;
      }
      this.operationsLog = [
        `${this.flight.departureTime} - Takeoff confirmed, runway 11L`,
        `${this.flight.departureTime} - Departed ${this.flight.origin}`,
        `In transit, cruising altitude reached`,
        `Estimated arrival ${this.flight.arrivalTime} at ${this.flight.destination}`,
      ];
    }
  }
}