import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfessorListComponent } from './professor/professor-list/professor-list.component';
import { ProfessorFormComponent } from './professor/professor-form/professor-form.component';
import { TurmaListComponent } from './turma/turma-list/turma-list.component';
import { TurmaFormComponent } from './turma/turma-form/turma-form.component';
import { FichaListComponent } from './ficha/ficha-list/ficha-list.component';
import { FichaFormComponent } from './ficha/ficha-form/ficha-form.component';
import { AtributoListComponent } from './atributo/atributo-list/atributo-list.component';
import { AtributoFormComponent } from './atributo/atributo-form/atributo-form.component';
import { ConhecimentoListComponent } from './conhecimento/conhecimento-list/conhecimento-list.component';
import { ConhecimentoFormComponent } from './conhecimento/conhecimento-form/conhecimento-form.component';
import { DetalheListComponent } from './detalhe/detalhe-list/detalhe-list.component';
import { DetalheFormComponent } from './detalhe/detalhe-form/detalhe-form.component';
import { HabilidadeListComponent } from './habilidade/habilidade-list/habilidade-list.component';
import { HabilidadeFormComponent } from './habilidade/habilidade-form/habilidade-form.component';
import { PericiaListComponent } from './pericia/pericia-list/pericia-list.component';
import { PericiaFormComponent } from './pericia/pericia-form/pericia-form.component';
import { TalentoListComponent } from './talento/talento-list/talento-list.component';
import { TalentoFormComponent } from './talento/talento-form/talento-form.component';

const routes: Routes = [
  { path: 'professor', component: ProfessorListComponent },
  { path: 'professor/novo', component: ProfessorFormComponent },
  { path: 'professor/:id', component: ProfessorFormComponent },

  { path: 'turma', component: TurmaListComponent },
  { path: 'turma/novo', component: TurmaFormComponent },
  { path: 'turma/:id', component: TurmaFormComponent },

  { path: 'ficha', component: FichaListComponent },
  { path: 'ficha/novo', component: FichaFormComponent },
  { path: 'ficha/:id', component: FichaFormComponent },

  { path: 'atributo', component: AtributoListComponent },
  { path: 'atributo/novo', component: AtributoFormComponent },
  { path: 'atributo/:id', component: AtributoFormComponent },

  { path: 'conhecimento', component: ConhecimentoListComponent },
  { path: 'conhecimento/novo', component: ConhecimentoFormComponent },
  { path: 'conhecimento/:id', component: ConhecimentoFormComponent },

  { path: 'detalhe', component: DetalheListComponent },
  { path: 'detalhe/novo', component: DetalheFormComponent },
  { path: 'detalhe/:id', component: DetalheFormComponent },

  { path: 'habilidade', component: HabilidadeListComponent },
  { path: 'habilidade/novo', component: HabilidadeFormComponent },
  { path: 'habilidade/:id', component: HabilidadeFormComponent },

  { path: 'pericia', component: PericiaListComponent },
  { path: 'pericia/novo', component: PericiaFormComponent },
  { path: 'pericia/:id', component: PericiaFormComponent },

  { path: 'talento', component: TalentoListComponent },
  { path: 'talento/novo', component: TalentoFormComponent },
  { path: 'talento/:id', component: TalentoFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
