import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { FichaService } from '../ficha.service';
import { AtributoService } from '../../atributo/atributo.service';
import { HabilidadeService } from '../../habilidade/habilidade.service';
import { DetalheService } from '../../detalhe/detalhe.service';

//teste 1/2
interface Disciplina {
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
    private atributoSrv: AtributoService,
    private habilidadeSrv: HabilidadeService,
    private detalheSrv: DetalheService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  title: string = 'Nova ficha';
  ficha: any = {};
  atributos: any = [];
  habilidades: any = [];
  detalhes: any = [];
  //teste 2/2
  selectedValue: string;

  disciplinas: Disciplina[] = [
    {value: 'animalismo', viewValue: 'Animalismo'},
    {value: 'auspicios', viewValue: 'Auspícios'},
    {value: 'dominacao', viewValue: 'Dominação'},
    {value: 'fortitude', viewValue: 'Fortitude'},
    {value: 'metamorfose', viewValue: 'Metamorfose'},
    {value: 'ofuscacao', viewValue: 'Ofuscação'},
    {value: 'potencia', viewValue: 'Potência'},
    {value: 'rapidez', viewValue: 'Rapidez'},
    {value: 'presenca', viewValue: 'Presença'},
    {value: 'taumaturgia', viewValue: 'Taumaturgia'}
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

    // Entidades relacionadas
    try{
      this.atributos = await this.atributoSrv.listar();
      this.habilidades = await this.habilidadeSrv.listar();
      this.detalhes = await this.detalheSrv.listar();
    }
    catch(error) {
      console.log(error);
    }
  }

  async salvar(form: NgForm) {
    if (form.valid) {
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
    console.log(form);
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
