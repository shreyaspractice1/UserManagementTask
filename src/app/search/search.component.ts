import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  constructor() {}
  @Input() parentReq: string;
  @Output() searchEvent = new EventEmitter<any>();
  @Input() searchKey: string = '';
  @Input() defaultOption: any = {};
  @Input() expanded: boolean = false;
  @Input() Image: any = '';
  @Input() view: any = {};
  @Input() behaviour: string = 'clouzer';
  @Input() searchIcon: String = 'right';
  @Input() searchIconId: String;
  nightMode: boolean;
  private subscribeTheme: Subscription;

  placeholder = '';
  searchFlag = false;
  searchKeyword = '';
  uniqueId = 'Search_';
  blur: boolean = false;
  optClick: boolean = false;
  selectedIcon: boolean = false;
  ngOnInit() {}

  ngOnChanges() {
    this.placeholder = this.parentReq;
    this.searchKeyword = this.searchKey;
    this.searchKey = '';
  }

  keyupFunc(iEvent) {
    if (this.searchKeyword)
      this.searchEvent.emit({
        eventType: 'keyup',
        iEvent: iEvent,
        value: this.searchKeyword,
      });
  }

  searchClickFunc(iEvent) {
    if (!this.searchFlag && !this.searchKeyword && !this.blur) {
    }
    if (this.searchKeyword) {
      this.searchEvent.emit({
        eventType: 'click',
        iEvent: iEvent,
        value: this.searchKeyword,
      });
    }
  }

  resetFieldFunc(iEvent) {
    if (!this.searchKeyword)
      this.searchEvent.emit({
        eventType: 'input',
        iEvent: iEvent,
        value: this.searchKeyword,
      });
  }

  searchFocusFun() {
    this.searchFlag = true;
    this.blur = false;
    this.searchEvent.emit({ eventType: 'focus' });
    if (Object.keys(this.defaultOption).length > 0 && this.searchKey == '') {
      this.searchKey =
        (this.defaultOption.CML_VALUE
          ? this.defaultOption.CML_VALUE
          : this.defaultOption.CML_TITLE) + ' :';
      this.searchEvent.emit({
        eventType: 'filter',
        iEvent: null,
        value: this.searchKeyword,
        iObj: this.defaultOption,
        filterKey: this.searchKey,
      });
    }
  }

  searchBlurFun(iEvent) {
    setTimeout(() => {
      if (!this.optClick) {
        this.searchFlag = false;
        if (this.searchKeyword == '') {
          this.searchKey = '';
        }
        this.searchEvent.emit({
          eventType: 'blur',
          iEvent: iEvent,
          value: this.searchKeyword,
        });
        this.blur = true;
        setTimeout(() => {
          this.blur = false;
        }, 300);
      }
      this.optClick = false;
    }, 300);
  }

  selectOpt(iEvent, iObj) {
    iEvent && iEvent.stopPropagation;
    let input = document.getElementById(this.uniqueId);
    if (input) {
      input.focus();
      this.searchFocusFun();
      this.searchKey =
        (iObj.CML_VALUE ? iObj.CML_VALUE : iObj.CML_TITLE) + ' :';
      this.optClick = true;
      this.searchEvent.emit({
        eventType: 'filter',
        iEvent: iEvent,
        value: this.searchKeyword,
        iObj: iObj,
        filterKey: this.searchKey,
      });
    }
  }

  ngOnDestroy() {}
}
