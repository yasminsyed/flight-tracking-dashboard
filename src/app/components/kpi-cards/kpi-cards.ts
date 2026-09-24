import { Component, Input } from '@angular/core';

type KpiKey = 'total' | 'active' | 'delayed' | 'arrived';

interface KpiCard {
  key: KpiKey;
  label: string;
  value: number;
  caption: string;
}

@Component({
  selector: 'app-kpi-cards',
  standalone: true,
  templateUrl: './kpi-cards.html',
  styleUrl: './kpi-cards.scss'
})
export class KpiCardsComponent {
  @Input() total = 0;
  @Input() active = 0;
  @Input() delayed = 0;
  @Input() arrived = 0;

  get cards(): KpiCard[] {
    return [
      { key: 'total',   label: 'Total Flights', value: this.total,   caption: 'All tracked flights' },
      { key: 'active',  label: 'Active',        value: this.active,  caption: `${this.pct(this.active)}% of total` },
      { key: 'delayed', label: 'Delayed',       value: this.delayed, caption: `${this.pct(this.delayed)}% of total` },
      { key: 'arrived', label: 'Arrived',       value: this.arrived, caption: `${this.pct(this.arrived)}% of total` },
    ];
  }

  private pct(value: number): number {
    return this.total ? Math.round((value / this.total) * 100) : 0;
  }
}