import { Component } from '@angular/core';
import { UsersService } from 'src/services/users.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {

  signupForm: FormGroup;

  
  // username: string;
  // email: string;
  // password: string;
  // confirmpassword: string;
  // passwordError: boolean;

  constructor(
    public userService: UsersService, 
    public router: Router,
    private _builder: FormBuilder
    ) { 
      this.signupForm = this._builder.group({
        username: ['', Validators.required],
        email: ['',Validators.compose([Validators.required, Validators.email])], 
        password: ['', Validators.required]
      })

  }

  enviar(values) {
  // const user = { username: this.username, email: this.email, password: this.password };
    this.userService.register(values).subscribe(data => {
      this.userService.setToken(data.token);
    });
  }

  goHome(){
    this.router.navigateByUrl('/');
  }

}
