import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DocAliasDataItemComponent } from './doc-alias-data-item/doc-alias-data-item.component';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../material.module';
import { Alias } from '../../open-api/generated';

@Component({
  selector: 'app-doc-alias-data-table',
  imports: [MaterialModule, DocAliasDataItemComponent],
  templateUrl: './doc-alias-data-table.component.html',
  styleUrl: './doc-alias-data-table.component.scss',
})
export class DocAliasDataTableComponent implements OnChanges {
  @Input() data: Alias[] = [];
  displayedColumns: string[] = ['#', 'primaryWord', 'alias'];
  dataSource = new MatTableDataSource<Alias>([]);

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = this.data;
  }
}
