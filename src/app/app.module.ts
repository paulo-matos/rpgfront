import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Habilitar formatação de moeda e data em português
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

/**** Datas em português no MatDatepicker  ****/

// É preciso instalar os seguintes pacotes:
// yarn add @angular/material-moment-adapter moment

import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';

/**********************************************/

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './ui/header/header.component';
import { MainMenuComponent } from './ui/main-menu/main-menu.component';
import { FooterComponent } from './ui/footer/footer.component';
import { ConfirmDlgComponent } from './ui/confirm-dlg/confirm-dlg.component';
import { MatDialogModule } from '@angular/material';
import { NgxMaskModule } from 'ngx-mask';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainMenuComponent,
    FooterComponent,
    ConfirmDlgComponent,
    FichaListComponent,
    FichaFormComponent,
    AtributoListComponent,
    AtributoFormComponent,
    ConhecimentoListComponent,
    ConhecimentoFormComponent,
    DetalheListComponent,
    DetalheFormComponent,
    HabilidadeListComponent,
    HabilidadeFormComponent,
    PericiaListComponent,
    PericiaFormComponent,
    TalentoListComponent,
    TalentoFormComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDialogModule,
    NgxMaskModule.forRoot(),
    /**** Datas em português no MatDatepicker  ****/
    MatMomentDateModule
    /**********************************************/    
  ],
  entryComponents: [
    ConfirmDlgComponent
  ],
  providers: [
    /**** Datas em português no MatDatepicker  ****/
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
    /**********************************************/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
