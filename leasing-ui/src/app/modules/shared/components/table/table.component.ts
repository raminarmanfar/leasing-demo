import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CommonService} from '../../common.service';
import {FieldsMetadata} from '../../models/fields-metadata';
import {LinkClickData} from '../../models/link-click-data';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnInit, OnChanges {

  @Input() dataSource: T[] = [];
  @Input() fieldsMetadata: FieldsMetadata[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() showDetailBtn = true;

  @Output() showDetail = new EventEmitter<T>();
  @Output() deleteItem = new EventEmitter<T>();
  @Output() editItem = new EventEmitter<T>();
  @Output() linkClick = new EventEmitter<LinkClickData<T>>();

  columnKeys: string[] = [];

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.dataSource && this.dataSource.length > 0) {
      this.columnKeys = CommonService.getKeys(this.dataSource[0]);
      this.columnKeys.push('options');

      if (!this.displayedColumns || this.displayedColumns.length === 0) {
        this.displayedColumns = this.columnKeys;
      }

      if (!this.fieldsMetadata || this.fieldsMetadata.length === 0) {
        this.displayedColumns.forEach(() => this.fieldsMetadata.push({isLink: false, isCurrency: false}));
      }
    }
  }

  onLinkClick(element: T, column: string): void {
    this.linkClick.emit({data: element, column});
  }
}
