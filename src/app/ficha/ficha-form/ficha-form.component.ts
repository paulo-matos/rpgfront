import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { FichaService } from '../ficha.service';
// import { AtributoService } from '../../atributo/atributo.service';
// import { HabilidadeService } from '../../habilidade/habilidade.service';
// import { DetalheService } from '../../detalhe/detalhe.service';

//teste upload image
// import { HttpClient } from '@angular/common/http';
// import { environment as env } from '../../../environments/environment';

//teste 1/2
interface Disciplina {
  value: string;
  viewValue: string;
}
interface Vitalidade {
  value: string;
  viewValue: string;
}
//fim teste 1/2

@Component({
  selector: 'app-ficha-form',
  templateUrl: './ficha-form.component.html',
  styleUrls: ['./ficha-form.component.scss']
})
export class FichaFormComponent implements OnInit {

  constructor(
    private fichaSrv: FichaService,
    // private atributoSrv: AtributoService,
    // private habilidadeSrv: HabilidadeService,
    // private detalheSrv: DetalheService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
    //,    private http: HttpClient
  ) { }

  title: string = 'Nova ficha';
  ficha: any = {};
  // atributos: any = [];
  // habilidades: any = [];
  // detalhes: any = [];
  //teste 2/2
  selectedValue: string;

  disciplinas: Disciplina[] = [
    { value: 'animalismo', viewValue: 'Animalismo' },
    { value: 'auspicios', viewValue: 'Auspícios' },
    { value: 'demencia', viewValue: 'Demência' },
    { value: 'dominacao', viewValue: 'Dominação' },
    { value: 'fortitude', viewValue: 'Fortitude' },
    { value: 'metamorfose', viewValue: 'Metamorfose' },
    { value: 'ofuscacao', viewValue: 'Ofuscação' },
    { value: 'potencia', viewValue: 'Potência' },
    { value: 'presenca', viewValue: 'Presença' },
    { value: 'rapidez', viewValue: 'Rapidez' },
    { value: 'taumaturgia', viewValue: 'Taumaturgia' }
  ];
  vitalidades: Vitalidade[] = [
    { value: '-', viewValue: '-' },
    { value: '/', viewValue: '/' },
    { value: 'X', viewValue: 'X' }
  ];
  //fim teste 2/2

  async ngOnInit() {
    let params = this.actRoute.snapshot.params;
    if (params['id']) { // Se houver um parâmetro chamado id na rota
      try {
        // Busca os dados do ficha e preenche a variável ligada ao form
        this.ficha = await this.fichaSrv.obterUm(params['id']);
        this.title = 'Editar ficha';
      }
      catch (error) {
        console.log(error);
      }
    }

    this.trilha('trilhaValue',this.ficha.trilha_pts);
    this.trilha('forcaVontadeValue',this.ficha.forca_vontade_nivel);
    this.trilha('forcaVontadeAtualValue',this.ficha.forca_vontade_atual);
    this.trilha('pontosSangueAtualValue',this.ficha.pontos_sangue_atual);


    // Entidades relacionadas
    // try{
    //   this.atributos = await this.atributoSrv.listar();
    //   this.habilidades = await this.habilidadeSrv.listar();
    //   this.detalhes = await this.detalheSrv.listar();
    // }
    // catch(error) {
    //   console.log(error);
    // }
  }

  async trilha(name, field) {
    // var trilhaRadio1 = document.getElementById('trilhaValue1');
    //trilhaValue
    //forcaVontadeValue
    //forcaVontadeAtualValue
    //pontosSangueAtualValue

    if (this.ficha._id) {
      for (let i = 0; i < field; i++) {
        let field;
        field = name + [i + 1];
        let checkbox = document.getElementById(field) as HTMLInputElement;
        checkbox.checked = true;
      }
    }
  }

  //funcao pra capturar upload
  // onSelectedFile(event){
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     const file2 = URL.createObjectURL(event.target.files[0]);
  //     //this.http.get('uploadImg').setValue(file);
  //     console.log(file + '\n' +file2);
  //     return this.http.post(env.apiUri + 'images/image-upload', file).toPromise();
  //   }
  // }
  // private endPoint : string = 'ficha';
  // novaImg(ficha: any) {
  //   var arquivo = {ficha: ficha.image};
  //   console.log (arquivo)
  //   return this.http.post(env.apiUri + 'images/image-upload', arquivo).toPromise();
  // }

  async atualizaPontos(name,qtd){
    let resultado = 0;
    for (let i = 0; i < qtd; i++) {
      let field = name + [i + 1];
      let checkbox = document.getElementById(field) as HTMLInputElement;
      if (checkbox.checked == true){
        resultado += 1;
      }
    }
    return resultado;
  }

  async salvar(form: NgForm) {
    //await this.novaImg(this.ficha)
    this.ficha.trilha_pts = await this.atualizaPontos('trilhaValue',10);
    this.ficha.forca_vontade_nivel = await this.atualizaPontos('forcaVontadeValue',10);
    this.ficha.forca_vontade_atual = await this.atualizaPontos('forcaVontadeAtualValue',10);
    this.ficha.pontos_sangue_atual = await this.atualizaPontos('pontosSangueAtualValue',20);

    
    


    // var pontosTrilha = 0;
    // let name;

    // for (let i = 0; i < 10; i++) {
    //   name = 'trilhaValue' + [i + 1];
    //   let checkbox = document.getElementById(name) as HTMLInputElement;
    //   if (checkbox.checked == true){
    //     pontosTrilha += 1;
    //   }
    // }
    // this.ficha.trilha_pts = pontosTrilha;
    if (form.valid) {
      //console.log(pontosTrilha + ' ' + this.ficha.trilha_pts)
      try {
        let msg = 'Ficha criada com sucesso.';

        if (this.ficha._id) { // Se tem _id, está editando
          msg = 'Ficha atualizada com sucesso';
          await this.fichaSrv.atualizar(this.ficha);
        }
        else { // Criação de um novo ficha
          await this.fichaSrv.novo(this.ficha);
        }

        this.snackBar.open(msg, 'Entendi', { duration: 3000 });
        this.router.navigate(['/ficha']); // Volta à listagem
      }
      catch (error) {
        console.log(error);
        this.snackBar.open('ERRO: não foi possível salvar os dados.', 'Entendi',
          { duration: 3000 });
      }
    }
  }

  async voltar(form: NgForm) {

    let result = true;
    
    // form.dirty = formulário "sujo", não salvo (via código)
    // form.touched = o conteúdo de algum campo foi alterado (via usuário)
    if (form.dirty && form.touched) {
      let dialogRef = this.dialog.open(ConfirmDlgComponent, {
        width: '50%',
        data: { question: 'Há dados não salvos. Deseja realmente voltar?' }
      });

      result = await dialogRef.afterClosed().toPromise();

    }

    if (result) {
      this.router.navigate(['/ficha']); // Retorna à listagem
    }
  }

}
