import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { DetalheService } from '../detalhe.service';

@Component({
  selector: 'app-detalhe-form',
  templateUrl: './detalhe-form.component.html',
  styleUrls: ['./detalhe-form.component.scss']
})
export class DetalheFormComponent implements OnInit {

  constructor(
    private detalheSrv: DetalheService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  title: string = 'Novos detalhes';
  detalhe: any = {};

  async ngOnInit() {
    let params = this.actRoute.snapshot.params;
    if (params['id']) { // Se houver um parâmetro chamado id na rota
      try {
        // Busca os dados do detalhe e preenche a variável ligada ao form
        this.detalhe = await this.detalheSrv.obterUm(params['id']);
        this.title = 'Editar detalhes';
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  async salvar(form: NgForm) {
    if (form.valid) {
      try {
        let msg = 'Detalhes criados com sucesso.';

        if (this.detalhe._id) { // Se tem _id, está editando
          msg = 'Detalhes atualizados com sucesso';
          await this.detalheSrv.atualizar(this.detalhe);
        }
        else { // Criação de um novo detalhe
          await this.detalheSrv.novo(this.detalhe);
        }

        this.snackBar.open(msg, 'Entendi', { duration: 3000 });
        this.router.navigate(['/detalhe']); // Volta à listagem
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
      this.router.navigate(['/detalhe']); // Retorna à listagem
    }
  }

}
