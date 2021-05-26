import { Component } from '@angular/core';
import { UsersService } from 'src/services/users.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  // username: string;
  // password: string;
  
  signinForm: FormGroup;

  constructor(
    public userService: UsersService, 
    public router: Router,
    private _builder: FormBuilder
    ) { 
      this.signinForm = this._builder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      })

  }

  login(values) {
    this.userService.login(values).subscribe(
      data => {
        this.userService.setToken(data.token);
        this.router.navigateByUrl('/');
      },
      error => {
        this.router.navigateByUrl('/error');
      });
  }



}