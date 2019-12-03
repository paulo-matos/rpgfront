import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { AtributoService } from '../atributo.service';

@Component({
  selector: 'app-atributo-form',
  templateUrl: './atributo-form.component.html',
  styleUrls: ['./atributo-form.component.scss']
})
export class AtributoFormComponent implements OnInit {

  constructor(
    private atributoSrv: AtributoService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  title: string = 'Novos atributos';
  atributo: any = {};


  async ngOnInit() {
    let params = this.actRoute.snapshot.params;
    if (params['id']) { // Se houver um parâmetro chamado id na rota
      try {
        // Busca os dados do atributo e preenche a variável ligada ao form
        this.atributo = await this.atributoSrv.obterUm(params['id']);
        this.title = 'Editar atributos';
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  async salvar(form: NgForm) {
    if (form.valid) {
      try {
        let msg = 'Atributos criados com sucesso.';

        if (this.atributo._id) { // Se tem _id, está editando
          msg = 'Atributos atualizados com sucesso';
          await this.atributoSrv.atualizar(this.atributo);
        }
        else { // Criação de um novo atributo
          await this.atributoSrv.novo(this.atributo);
        }

        this.snackBar.open(msg, 'Entendi', { duration: 3000 });
        this.router.navigate(['/atributo']); // Volta à listagem
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
      this.router.navigate(['/atributo']); // Retorna à listagem
    }
  }

}
