import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Input() tags: any
  @Output() filterChange:EventEmitter<string[]>=new EventEmitter<string[]>()
  constructor() { }

  onChange()
  {
    const tagsSelected=this.tags.filter((x: any)=>x.selected).map((x: any)=>x.label)
    this.filterChange.emit(tagsSelected)

  }
}
