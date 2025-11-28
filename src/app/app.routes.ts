import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Nosotros } from './nosotros/nosotros';
import { Expertos } from './expertos/expertos';
import { SoporteTecnico } from './soporte-tecnico/soporte-tecnico';
import { Asesorias } from './asesorias/asesorias';
import { UneteComponent } from './unete/unete';
import { Registro } from './registro/registro';
import { Recuperar } from './recuperar/recuperar';
import { Homeusuario } from './usuario/homeusuario/homeusuario';
import { Homeasesor } from './asesor/homeasesor/homeasesor';
import { Usuarioexpertos } from './usuario/usuarioexpertos/usuarioexpertos';
import { Usuariosoporte } from './usuario/usuariosoporte/usuariosoporte';
import { Usuarionosotros } from './usuario/usuarionosotros/usuarionosotros';
import {Usuarioasesorias} from './usuario/usuarioasesorias/usuarioasesorias';
import {Asesorasesorias} from './asesor/asesorasesorias/asesorasesorias';
import {Asesorsoporte} from './asesor/asesorsoporte/asesorsoporte';
import {TablaAsesoresComponent} from './administrador/tabla-asesores/tabla-asesores';
import {TablaClientesComponent} from './administrador/tabla-clientes/tabla-clientes';
import {TablaAsesoriasComponent} from './administrador/tabla-asesorias/tabla-asesorias';
import { AuthGuard } from './guards/auth-guard';

import {VerAsesoria} from './ver-asesoria/ver-asesoria';

import { CrearAsesoria } from './asesor/crear-asesoria/crearasesoria';
import {CrearAsesor} from './asesor/crear-asesor/crear-asesor';
import {VerAsesor} from './ver-asesor/ver-asesor';





export const routes: Routes = [
  { path: '', component: Home },
  { path: 'nosotros', component: Nosotros },
  { path: 'expertos', component: Expertos },
  { path: 'soporte', component: SoporteTecnico },
  { path: 'asesorias', component: Asesorias },
  { path: 'unete', component: UneteComponent },
  { path: 'registro', component: Registro },
  { path: 'recuperar', component: Recuperar },
  { path: 'homeusuario', component: Homeusuario},
  { path: 'verasesoria/:idasesoria', component: VerAsesoria },
  { path: 'verasesor/:idcartillaasesor', component: VerAsesor },

  { path: 'usuario/homeusuario', component: Homeusuario, canActivate: [AuthGuard] },
  { path: 'usuario/usuarioexpertos', component: Usuarioexpertos, canActivate: [AuthGuard] },
  { path: 'usuario/usuariosoporte', component: Usuariosoporte, canActivate: [AuthGuard] },
  { path: 'usuario/usuarionosotros', component: Usuarionosotros, canActivate: [AuthGuard] },
  { path: 'usuario/usuarioasesorias', component: Usuarioasesorias, canActivate: [AuthGuard] },

  { path: 'asesor/homeasesor', component: Homeasesor, canActivate: [AuthGuard] },
  { path: 'asesor/asesorasesorias', component: Asesorasesorias, canActivate: [AuthGuard] },
  { path: 'asesor/asesorsoporte', component: Asesorsoporte, canActivate: [AuthGuard] },
  { path: 'asesor/crear-asesoria', component: CrearAsesoria, canActivate: [AuthGuard] },
  { path: 'asesor/crear-asesor', component: CrearAsesor, canActivate: [AuthGuard] },



  { path: 'administrador/tabla-asesores', component: TablaAsesoresComponent, canActivate: [AuthGuard] },
  { path: 'administrador/tabla-clientes', component: TablaClientesComponent, canActivate: [AuthGuard] },
  { path: 'administrador/tabla-asesorias', component: TablaAsesoriasComponent, canActivate: [AuthGuard] },



  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home},
  { path: 'homeasesor', component: Homeasesor },

  { path: '**', redirectTo: '' }


];
