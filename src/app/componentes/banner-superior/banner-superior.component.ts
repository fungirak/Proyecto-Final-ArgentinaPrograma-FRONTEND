import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-banner-superior',
  templateUrl: './banner-superior.component.html',
  styleUrls: ['./banner-superior.component.css']
})
export class BannerSuperiorComponent implements OnInit {

  loginActive: Boolean = true;
  registerActive: Boolean = false;
  portafolioActive : Boolean = false;
  pageNotFoundActive: Boolean = false;

  constructor(private router: Router, private autenticacionService: AutenticacionService) { }

  ngOnInit(): void {
    console.log("Ruta activa: ",this.router.url);

    switch(this.router.url) {
      case '/login': {
         this.loginActive = true;
         this.registerActive = false;
         this.portafolioActive = false;
         this.pageNotFoundActive = false;
         break;
      }
      case '/register': {
        this.registerActive = true;
        this.loginActive = false;
        break;
     }
     case '/portafolio': {
      this.portafolioActive = true;
      this.registerActive = false;
      this.loginActive = false;
      break;
   }
      default: {
        this.pageNotFoundActive = true;
        this.portafolioActive = false;
        this.registerActive = false;
        this.loginActive = false;
         break;
      }
   }
  }


  logout( event : Event){
    event.preventDefault;
    Swal.fire({
      title: '¿CERRAR SESIÓN?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#747174',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#00b5ff',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem('token');
         this.autenticacionService.removeToken();
          console.log("Token removido, notifico desde archivo banner", sessionStorage.getItem('token'));
          this.router.navigate(['/login']);
          }
        }
      )

  }

}
