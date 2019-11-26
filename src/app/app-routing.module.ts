import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfessorListComponent } from './professor/professor-list/professor-list.component';
import { ProfessorFormComponent } from './professor/professor-form/professor-form.component';
import { TurmaListComponent } from './turma/turma-list/turma-list.component';
import { TurmaFormComponent } from './turma/turma-form/turma-form.component';
import { FichaListComponent } from './ficha/ficha-list/ficha-list.component';
import { FichaFormComponent } from './ficha/ficha-form/ficha-form.component';

const routes: Routes = [
  { path: 'professor', component: ProfessorListComponent },
  { path: 'professor/novo', component: ProfessorFormComponent },
  { path: 'professor/:id', component: ProfessorFormComponent },

  { path: 'turma', component: TurmaListComponent },
  { path: 'turma/novo', component: TurmaFormComponent },
  { path: 'turma/:id', component: TurmaFormComponent },

  { path: 'ficha', component: FichaListComponent },
  { path: 'ficha/novo', component: FichaFormComponent },
  { path: 'ficha/:id', component: FichaFormComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
