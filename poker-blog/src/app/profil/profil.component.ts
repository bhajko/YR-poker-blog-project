import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-Profil',
  templateUrl: './Profil.component.html',
  styleUrls: ['./Profil.component.css']
})
export class ProfilComponent implements OnInit {

  username;
  email;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getProfil().subscribe(profil => {
      this.username = profil.user.username;
      this.email = profil.user.email;
    })
  }

}
