import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { ConhecimentoService } from '../conhecimento.service';

@Component({
  selector: 'app-conhecimento-form',
  templateUrl: './conhecimento-form.component.html',
  styleUrls: ['./conhecimento-form.component.scss']
})
export class ConhecimentoFormComponent implements OnInit {

  constructor(
    private conhecimentoSrv: ConhecimentoService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  title: string = 'Novos conhecimentos';
  conhecimento: any = {};


  async ngOnInit() {
    let params = this.actRoute.snapshot.params;
    if (params['id']) { // Se houver um parâmetro chamado id na rota
      try {
        // Busca os dados do conhecimento e preenche a variável ligada ao form
        this.conhecimento = await this.conhecimentoSrv.obterUm(params['id']);
        this.title = 'Editar conhecimentos';
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  async salvar(form: NgForm) {
    if (form.valid) {
      try {
        let msg = 'Conhecimentos criados com sucesso.';

        if (this.conhecimento._id) { // Se tem _id, está editando
          msg = 'Conhecimentos atualizados com sucesso';
          await this.conhecimentoSrv.atualizar(this.conhecimento);
        }
        else { // Criação de um novo conhecimento
          await this.conhecimentoSrv.novo(this.conhecimento);
        }

        this.snackBar.open(msg, 'Entendi', { duration: 3000 });
        this.router.navigate(['/conhecimento']); // Volta à listagem
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
      this.router.navigate(['/conhecimento']); // Retorna à listagem
    }
  }

}
