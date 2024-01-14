import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  title = 'IndexedDb';
  public getValue: any;

  empForm: any;
  constructor(
    public localStorage: LocalStorageService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.empForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.localStorage.get('data').then((res) => {
      if (res) {
        for (let i = 0; i < res[0].length; i++) {
          console.log(res[i]);
          this.empData.push(res[0][i]);
        }
      }
    });

    this.empData2 = this.localStorage.empData;
  }
  empData: any = [];
  empData2: any = [];
  flag1: boolean = true;

  userListing() {
    alert(this.empForm.email);

    this.router.navigate(['userListing']);
    this.localStorage.empData = [];
  }

  // userData1(data) {
  //   let count = 0;

  //   for (let i = 0; i < this.empData.length; i++) {
  //     if (this.empData[i].id == data.id) {
  //       this.empData[i] = data;
  //       count++;
  //     }
  //   }
  //   if (count == 0) {
  //     this.empData.push(data);
  //   }
  //   console.log(this.empData);

  //   this.localStorage.add('data', this.empData).then((res) => {
  //     if (res) {
  //       alert('inserted Successfully');
  //     }
  //   });

  //   this.router.navigate(['userListing']);
  //   this.empData2 = [];
  //   this.localStorage.empData = [];
  // }

  userData1(data) {
    let count = 0;

    for (let i = 0; i < this.empData.length; i++) {
      if (
        this.empData2.hasOwnProperty('id') &&
        this.empData[i].id == this.empData2.id
      ) {
        this.empData[i] = data;
        count++;
      }
    }
    if (count == 0) {
      data.id = this.empData.length + 1;
      this.empData.push(data);
    }
    console.log(this.empData);

    this.localStorage.add('data', this.empData).then((res) => {
      if (res) {
        alert('inserted Successfully');
      }
    });

    this.router.navigate(['userListing']);
    this.empData2 = [];
    this.localStorage.empData = [];
  }
}
