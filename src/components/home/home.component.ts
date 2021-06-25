import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/services/token-storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoggedIn?;
  user?;


  constructor(tokenStorageService: TokenStorageService) {

    this.isLoggedIn = !!tokenStorageService.getToken();
    this.user = tokenStorageService.getUserName();
  }
  ngOnInit(): void {

    
    // this.checkRoleGuard.checkRoleUser(this.route).then((value) => this.showAdminBoard = value );

  }



}
