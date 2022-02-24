import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private formBulder: FormBuilder, private _http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBulder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  //Loging Method Define
  login() {
    this._http.get<any>("http://localhost:3000/signup").subscribe(res => {
      const user = res.find((a: any) => {
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      })
      if (user) {
        alert("Login Sucessful.");
        this.router.navigate(['restaurant'])
        this.loginForm.reset();
      } else {
        alert("User Not Found");
      }
    }, err => {
      alert("Kuch to galat Serverside");
    }
    )
  }
}
