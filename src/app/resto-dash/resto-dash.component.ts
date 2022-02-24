import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './restaurant.modal';

@Component({
  selector: 'app-resto-dash',
  templateUrl: './resto-dash.component.html',
  styleUrls: ['./resto-dash.component.css']
})
export class RestoDashComponent implements OnInit {
  formValue!:FormGroup
  restaurantModelObj : RestaurantData = new RestaurantData
  allRestaurantData: any;
  showAdd!:boolean
  shoWBtn!:boolean;
  constructor(private fromBuilder:FormBuilder, private api:ApiService) { }
  
  ngOnInit(): void {
    this.formValue = this.fromBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    })
    this.getAllData();
  }
  clickAddresto(){
    this.formValue.reset();
    this.showAdd=true;
    this.shoWBtn=false;
  }
// now subcribe data which is maped via servisses
addResto(){
  this.restaurantModelObj.name = this.formValue.value.name;
  this.restaurantModelObj.email = this.formValue.value.email;
  this.restaurantModelObj.mobile = this.formValue.value.mobile;
  this.restaurantModelObj.address = this.formValue.value.address;
  this.restaurantModelObj.services = this.formValue.value.services;

  this.api.postRestaurant(this.restaurantModelObj).subscribe(res=>{
    console.log(res);
    alert('Restaurant Record added Sucsessfuly.');
    // clear fill form data
    let ref = document.getElementById('clear');
    ref?.click();

    this.formValue.reset();
    this.getAllData(); // when you post any data
  },
  err=>{
    alert('Kuch to galat Hai Komal');
  })
}   
// Get all data
  getAllData(){
    this.api.getRestaurant().subscribe(res=>{
      this.allRestaurantData = res;
    })
  }
// Delete Data
deleteResto(data:any){
  this.api.deleteRestaurant(data.id).subscribe(res=>{
    alert('Restaurant Deleted ');
    this.getAllData(); // quick response data
  })
  }
onEditResto(data:any){
  this.showAdd=false;
    this.shoWBtn=true;
  this.restaurantModelObj.id = data.id
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  
  }
  updateResto(){
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;

    this.api.updateRestaurant(this.restaurantModelObj, this.restaurantModelObj.id).subscribe(res=>{
      alert('Restaurant Updates Sucessfuly');
      let ref = document.getElementById('clear');
    ref?.click();

    this.formValue.reset();
    this.getAllData(); // when you post any data
    })
  }
} 