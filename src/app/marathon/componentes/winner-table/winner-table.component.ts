import { Component,Input, SimpleChanges } from '@angular/core';
import { AfterViewInit, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { NgClass } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { Participant } from '../../model/participant.entity';

@Component({
  selector: 'app-winner-table',
  standalone: true,
  imports: [MatPaginator, MatSort, MatIconModule,MatTableModule, NgClass, TranslateModule],
  templateUrl: './winner-table.component.html',
  styleUrl: './winner-table.component.css'
})
export class WinnerTableComponent {
  @Input() participants: Participant[]=[];
  dataSource = new MatTableDataSource<Participant>([]);
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'centerId', 'ranking','recordTime'];

  ngOnInit() {
    this.updateTableData();
  }
  /**
   * * This method is called when the input properties of the component change.
   * * It updates the data source of the table with the new participants data.
   */

  ngOnChanges(changes: SimpleChanges) {
    if (changes['participants']) {
      this.updateTableData();
    }
  }

  private updateTableData() {
    if (this.participants) {
      this.dataSource.data = this.participants;
    }
  }
}
