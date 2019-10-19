import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  patients: Array<any>;
  messageForm: FormGroup;
  newPatient = false;
  constructor(private dataService: DataService, private formBuilder: FormBuilder) {
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      bloodPressure: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.dataService.getPatients().subscribe(data => {
      this.patients = data;
      console.log(this.patients);
    });
  }

  savePatientDetails() {
    const newPatientDetails = {
      id: -1,
      name: this.messageForm.get('name').value,
      surname: this.messageForm.get('surname').value,
      email: this.messageForm.get('email').value,
      height: this.messageForm.get('height').value,
      weight: this.messageForm.get('weight').value,
      bloodPressure: this.messageForm.get('bloodPressure').value
    };

    this.dataService.addPatient(newPatientDetails).subscribe(response => {
      console.log(response);
      this.patients = response;
    });
    console.log(newPatientDetails);
    console.log(this.messageForm.get('name').value);
  }

  addPatient() {
    console.log('Adding');
    this.patients.push({});
    this.newPatient = true;
  }
  editPatient(patient) {
    console.log(patient);
  }

  deletePatient(patient) {
    this.dataService.deletePatient(patient.id).subscribe(response => {
      console.log(response);
    });
    console.log(patient);
  }
}
