import { Component,AfterViewInit, OnInit, ViewChild,Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from "@ngx-translate/core";
import { Center } from '../../model/center.entity';
import { Participant } from '../../model/participant.entity';
import { ParticipantService } from '../../services/participant.service';
import { WinnerTableComponent } from '../../componentes/winner-table/winner-table.component';
import { CenterService } from '../../services/center.service';

@Component({
  selector: 'app-records-view',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatCardModule, TranslateModule,WinnerTableComponent ],
  templateUrl: './records-view.component.html',
  styleUrl: './records-view.component.css'
})

export class RecordsViewComponent {
  constructor(private participantService: ParticipantService) { }
  topParticipants: Participant[] = [];
  centers: Center[] = [];
  isLoading = true;

  ngOnInit() {
    this.isLoading = true;
    this.participantService.getAllTopParticipantsByCenter().subscribe({
      next: (participants) => {
        this.topParticipants = participants;
        this.isLoading = false;
        console.log('Top participants loaded:', this.topParticipants);
      },
      error: (err) => {
        console.error('Error loading top participants', err);
        this.isLoading = false;
      }
    });
  }

  loadData(): void {
    

  }
}
