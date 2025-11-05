import { Routes } from '@angular/router';
import {Home} from './home/home';
import {Nosotros} from './nosotros/nosotros';
import {Expertos} from './expertos/expertos';
import {SoporteTecnico} from './soporte-tecnico/soporte-tecnico';
import {Asesorias} from './asesorias/asesorias';
import {Unete} from './unete/unete';
import {Registro} from './registro/registro';
import {Recuperar} from './recuperar/recuperar';
import { Homeusuario } from './usuario/homeusuario/homeusuario';
import {Homeasesor} from './asesor/homeasesor/homeasesor';
import {Homeadministrador} from './administrador/homeadministrador/homeadministrador';


export const routes: Routes = [
  {path: '', component: Home},
  {path: 'nosotros', component: Nosotros},
  {path: 'expertos', component: Expertos},
  {path: 'soporte', component: SoporteTecnico},
  {path: 'asesorias', component: Asesorias},
  {path: 'unete', component: Unete},
  {path: 'registro', component: Registro},
  {path: 'recuperar', component: Recuperar},
  { path: 'usuario/homeusuario', component: Homeusuario },
  { path: 'asesor/homeasesor', component: Homeasesor },
  { path: 'administrador/homeadministrador', component: Homeadministrador },

];
