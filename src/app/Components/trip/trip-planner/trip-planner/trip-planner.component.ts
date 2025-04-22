import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TripService } from '../../../../core/services/trip.service';
import { ITrip } from '../../../../core/Interface/itrip';
import { HeaderComponent } from '../../../header/header.component';
import { FooterComponent } from '../../../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-planner',
  templateUrl: './trip-planner.component.html',
  styleUrls: ['./trip-planner.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TripPlannerComponent implements OnInit {
  showForm = false;
  isEditMode = false;
  tripBeingEdited: ITrip | null = null;
  newTrip: ITrip = this.initializeNewTrip();
  tripList: ITrip[] = [];

  constructor(private tripService: TripService) {}

  ngOnInit() {
    this.loadTrips();
  }

  loadTrips() {
    this.tripService.getUserTrips().subscribe({
      next: (data) => {
        const doneStatusMap = this.getDoneStatusMap();

        this.tripList = data.map(trip => ({
          ...trip,
          startDate: new Date(trip.startDate),
          endDate: new Date(trip.endDate),
          done: doneStatusMap[trip.itineraryId] ?? false,
        }));
      },
      error: (err) => {
        console.error('Error loading trips:', err);
      }
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (this.showForm && !this.isEditMode) {
      this.newTrip = this.initializeNewTrip();
    }
  }

  addTrip() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User ID is missing. Please login again.');
      return;
    }

    if (!this.isFormValid()) {
      alert('Please fill all the fields correctly.');
      return;
    }

    if (this.isEditMode && this.tripBeingEdited) {
      const updatedTrip: ITrip = {
        ...this.tripBeingEdited,
        ...this.newTrip,
        userId: this.tripBeingEdited.userId,
      };

      this.tripService.editTrip(updatedTrip).subscribe({
        next: () => {
          this.loadTrips();
          this.cancelEdit();
        },
        error: (err) => console.error('Error updating trip:', err)
      });
    } else {
      const tripToAdd: ITrip = {
        ...this.newTrip,
        userId,
        done: false,
      };

      this.tripService.addTrip(tripToAdd).subscribe({
        next: () => {
          this.loadTrips();
          this.newTrip = this.initializeNewTrip();
          this.showForm = false;
        },
        error: (err) => console.error('Error adding trip:', err)
      });
    }
  }

  editTrip(trip: ITrip) {
    this.isEditMode = true;
    this.tripBeingEdited = trip;
    this.newTrip = { ...trip };
    this.showForm = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.tripBeingEdited = null;
    this.newTrip = this.initializeNewTrip();
    this.showForm = false;
  }

  deleteTrip(trip: ITrip) {
    this.tripService.deleteTrip(trip.userId, trip.itineraryId).subscribe({
      next: () => {
        this.tripList = this.tripList.filter(t => t.itineraryId !== trip.itineraryId);
        this.removeDoneStatus(trip.itineraryId);
      },
      error: (err) => console.error('Error deleting trip:', err)
    });
  }

  markAsDone(trip: ITrip) {
    trip.done = !trip.done;
    this.saveDoneStatus(trip.itineraryId, trip.done);
  }

  isFormValid(): boolean {
    return (
      this.newTrip.title.trim() !== '' &&
      !!this.newTrip.startDate &&
      !!this.newTrip.endDate &&
      this.newTrip.notes.trim() !== ''
    );
  }

  private initializeNewTrip(): ITrip {
    return {
      title: '',
      startDate: new Date(),
      endDate: new Date(),
      notes: '',
      itineraryId: 0,
      userId: '',
      done: false,
    };
  }

  private getDoneStatusMap(): { [id: number]: boolean } {
    const saved = localStorage.getItem('doneStatusMap');
    return saved ? JSON.parse(saved) : {};
  }

  private saveDoneStatus(id: number, status: boolean) {
    const map = this.getDoneStatusMap();
    map[id] = status;
    localStorage.setItem('doneStatusMap', JSON.stringify(map));
  }

  private removeDoneStatus(id: number) {
    const map = this.getDoneStatusMap();
    delete map[id];
    localStorage.setItem('doneStatusMap', JSON.stringify(map));
  }
}
