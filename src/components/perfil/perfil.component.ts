import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/services/token-storage.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  currentUser: any;

  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
  //  this.currentUser = this.token.getUser();
  }
}