import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filter-bar.html',
  styleUrl: './filter-bar.scss'
})
export class FilterBarComponent implements OnInit {
  @Input() statusOptions: string[] = ['Active', 'Delayed', 'Arrived'];
  @Input() originOptions: string[] = [];
  @Input() destinationOptions: string[] = [];
  @Output() filtersChanged = new EventEmitter<{
    search: string;
    status: string;
    origin: string;
    destination: string;
  }>();

  filterForm = new FormGroup({
    search: new FormControl(''),
    status: new FormControl(''),
    origin: new FormControl(''),
    destination: new FormControl(''),
  });

  ngOnInit(): void {
    this.filterForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe(values => {
        this.filtersChanged.emit({
          search: values.search || '',
          status: values.status || '',
          origin: values.origin || '',
          destination: values.destination || '',
        });
      });
  }

  clearFilters(): void {
    this.filterForm.reset({
      search: '',
      status: '',
      origin: '',
      destination: '',
    });
  }
}