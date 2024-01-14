import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css'],
})
export class PagingComponent {
  constructor() {}

  @Input() totalPages = 100;
  @Input() displayPerPageCount = 10;
  @Output() callBackFromPaging = new EventEmitter<any>();
  @Input() selectedPageNumber = 1;

  totalPageArr: any = [];
  initialPage = 1;
  displayArray = [];
  pageNumber;

  ngOnInit(): void {
    this.createPageTempArray(this.initialPage);
  }

  ngOnChanges(changes) {
    const totalPages = changes.totalPages;
    if (
      totalPages &&
      JSON.stringify(totalPages.previousValue) !=
        JSON.stringify(totalPages.currentValue)
    ) {
      this.totalPages = totalPages.currentValue;
      this.ngOnInit();
    }
  }

  createPageTempArray(initialPage) {
    this.totalPageArr = [];
    let count = 1;
    for (let j = initialPage; j <= this.totalPages; j++) {
      if (count <= this.displayPerPageCount) {
        count++;
        this.totalPageArr.push({ CML_VALUE: j });
      }
    }
  }

  prev(iEvent) {
    iEvent && iEvent.stopPropagation && iEvent.stopPropagation();
    this.selectedPageNumber -= 1;
    if (this.selectedPageNumber % 5 == 0) {
      this.createPageTempArray(
        this.totalPageArr[0].CML_VALUE - this.displayPerPageCount
      );
    }
    this.callBackFromPaging.emit({
      iType: 'selectPage',
      iIndex: this.selectedPageNumber,
    });
  }

  next(iEvent) {
    iEvent && iEvent.stopPropagation && iEvent.stopPropagation();
    if (this.selectedPageNumber % 5 == 0) {
      this.createPageTempArray(
        this.totalPageArr[this.totalPageArr.length - 1].CML_VALUE + 1
      );
    }
    this.selectedPageNumber += 1;

    this.callBackFromPaging.emit({
      iType: 'selectPage',
      iIndex: this.selectedPageNumber,
      iDirection: 'next',
    });
  }

  selectPage(iEvent, iValue) {
    if (iValue.CML_VALUE == '...') return;
    iEvent && iEvent.stopPropagation && iEvent.stopPropagation();
    this.selectedPageNumber = iValue.CML_VALUE;
    this.callBackFromPaging.emit({
      iType: 'selectPage',
      iIndex: iValue.CML_VALUE,
      iDirection: 'prev',
    });
  }
}
