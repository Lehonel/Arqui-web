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

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'nosotros', component: Nosotros },
  { path: 'expertos', component: Expertos },
  { path: 'soporte', component: SoporteTecnico },
  { path: 'asesorias', component: Asesorias },
  { path: 'unete', component: UneteComponent },
  { path: 'registro', component: Registro },
  { path: 'recuperar', component: Recuperar },


  { path: 'usuario/homeusuario', component: Homeusuario },
  { path: 'usuario/usuarioexpertos', component: Usuarioexpertos },
  { path: 'usuario/usuariosoporte', component: Usuariosoporte },
  { path: 'usuario/usuarionosotros', component: Usuarionosotros },
  { path: 'usuario/usuarioasesorias', component: Usuarioasesorias },

  { path: 'asesor/homeasesor', component: Homeasesor },
  { path: 'asesor/asesorasesorias', component: Asesorasesorias },
  { path: 'asesor/asesorsoporte', component: Asesorsoporte },


  { path: 'administrador/tabla-asesores', component: TablaAsesoresComponent },
  { path: 'administrador/tabla-clientes', component: TablaClientesComponent },
  { path: 'administrador/tabla-asesorias', component: TablaAsesoriasComponent },


  { path: '**', redirectTo: '' }
];
