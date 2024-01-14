import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css'],
})
export class UserListingComponent implements OnInit {
  constructor(
    public localStorage: LocalStorageService,
    private router: Router
  ) {}

  empData: any = [];
  empData2: any = [];
  userData: any = [];
  flag1: boolean = true;
  searchUser: any = '';
  selectedPageNumber: number = 1;
  pageCount: number = 1;
  displayCount: number = 5;
  offset: number = 0;
  resultSize = 10;
  searchedData: any = [];

  ngOnInit(): void {
    this.localStorage.get('data').then((res) => {
      if (res) {
        for (let i = 0; i < res[0].length; i++) {
          console.log(res[i]);
          this.userData.push(res[0][i]);
        }

        let len: any = this.userData.length;
        this.offset = (this.selectedPageNumber - 1) * 10;
        this.empData = [];
        if (len % this.resultSize == 0) {
          this.pageCount = len / this.resultSize;
        } else if (len % this.resultSize != 0) {
          this.pageCount = Math.floor(len / this.resultSize) + 1;
        }
        for (let i = this.offset; i < this.userData.length; i++) {
          this.empData.push(this.userData[i]);

          if (i == this.offset + this.resultSize - 1) {
            break;
          }
        }
      }
    });
  }

  delete(deleteData) {
    let index = this.userData.indexOf(deleteData);
    if (this.searchedData != '') {
      let index1 = this.searchedData.indexOf(deleteData);
      this.searchedData.splice(index, 1);
    }
    this.userData.splice(index, 1);

    this.localStorage.add('data', this.userData).then((res) => {
      if (res) {
        alert('Deleted Successfully');
      }
    });
    this.refreshData();
  }

  update(updateData) {
    this.localStorage.empData = updateData;
    this.router.navigate(['']);
  }

  searchFuncCall(iEvent) {
    if (
      iEvent &&
      (iEvent.eventType == 'click' ||
        (iEvent.iEvent && iEvent.iEvent.keyCode == 13) ||
        (iEvent.value && iEvent.value == 'Enter'))
    ) {
      this.searchUser = iEvent.value.trim();
      if (this.searchUser != '') {
        let data: any = [];
        this.selectedPageNumber = 1;
        let title = '';
        for (let i = 0; i < this.userData.length; i++) {
          title = this.userData[i].userName;
          console.log(title.search(this.searchUser));
          if (title.search(this.searchUser) >= 0) {
            data.push(this.userData[i]);
            this.searchedData.push(this.userData[i]);
          }
        }

        this.empData = [];
        let len: any = data.length;
        this.offset = (this.selectedPageNumber - 1) * 10;

        if (len % this.resultSize == 0) {
          this.pageCount = len / this.resultSize;
        } else if (len % this.resultSize != 0) {
          this.pageCount = Math.floor(len / this.resultSize) + 1;
        }
        for (let i = this.offset; i < data.length; i++) {
          this.empData.push(data[i]);

          if (i == this.offset + this.resultSize - 1) {
            break;
          }
        }
      }
    } else {
      this.searchUser = iEvent.value;
      if (this.searchUser == '' && iEvent.eventType == 'input') {
        this.userData = [];
        this.searchedData = [];
        this.localStorage.get('data').then((res) => {
          if (res) {
            for (let i = 0; i < res[0].length; i++) {
              console.log(res[i]);
              this.userData.push(res[0][i]);
            }

            let len: any = this.userData.length;
            this.offset = (this.selectedPageNumber - 1) * 10;
            this.empData = [];
            if (len % this.resultSize == 0) {
              this.pageCount = len / this.resultSize;
            } else if (len % this.resultSize != 0) {
              this.pageCount = Math.floor(len / this.resultSize) + 1;
            }
            for (let i = this.offset; i < this.userData.length; i++) {
              this.empData.push(this.userData[i]);

              if (i == this.offset + this.resultSize - 1) {
                break;
              }
            }
          }
        });
      }
    }
  }

  refreshData() {
    this.localStorage.get('data').then((res) => {
      if (res) {
        this.userData = [];
        for (let i = 0; i < res[0].length; i++) {
          console.log(res[i]);
          this.userData.push(res[0][i]);
        }

        let len: any = this.userData.length;
        this.offset = (this.selectedPageNumber - 1) * 10;
        this.empData = [];
        if (len % this.resultSize == 0) {
          this.pageCount = len / this.resultSize;
        } else if (len % this.resultSize != 0) {
          this.pageCount = Math.floor(len / this.resultSize) + 1;
        }
        for (let i = this.offset; i < this.userData.length; i++) {
          this.empData.push(this.userData[i]);

          if (i == this.offset + this.resultSize - 1) {
            break;
          }
        }
      }
    });
  }

  addUser() {
    this.router.navigate(['']);
  }

  callBackFunc(iObj) {
    switch (iObj.iType) {
      case 'selectPage':
        if (this.selectedPageNumber != iObj.iIndex && iObj.iIndex > 0) {
          this.selectedPageNumber = iObj.iIndex;
          this.offset = (this.selectedPageNumber - 1) * 10;
          this.empData = [];

          if (this.searchUser == '') {
            for (let i = this.offset; i < this.userData.length; i++) {
              this.empData.push(this.userData[i]);

              if (i == this.offset + this.resultSize - 1) {
                break;
              }
            }
          } else {
            let data: any = [];
            let title = '';

            this.empData = [];
            let len: any = this.searchedData.length;
            this.offset = (this.selectedPageNumber - 1) * 10;

            if (len % this.resultSize == 0) {
              this.pageCount = len / this.resultSize;
            } else if (len % this.resultSize != 0) {
              this.pageCount = Math.floor(len / this.resultSize) + 1;
            }
            for (let i = this.offset; i < this.searchedData.length; i++) {
              this.empData.push(this.searchedData[i]);

              if (i == this.offset + this.resultSize - 1) {
                break;
              }
            }
          }
        }
        break;
    }
  }
}
