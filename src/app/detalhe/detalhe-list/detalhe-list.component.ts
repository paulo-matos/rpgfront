import { Component, OnInit } from '@angular/core';
import { DetalheService } from '../detalhe.service';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-detalhe-list',
  templateUrl: './detalhe-list.component.html',
  styleUrls: ['./detalhe-list.component.scss']
})
export class DetalheListComponent implements OnInit {

  /* DetalheService injetado como dependência */
  constructor(
    private detalheSrv: DetalheService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  detalhes: any = []; // Vetor vazio
  detalhe: any = {}; // objeto vazio para atualização
  displayedColumns: string[] = ['email', 'status', 'ativar', 'excluir'];

  async ngOnInit() {
    try {
      this.detalhes = await this.detalheSrv.listar();
    }
    catch (error) {
      console.error(error);
    }

  }

  async excluir(id: string) {
    try {

      // Exibição da caixa de diálogo de confirmação
      let dialogRef = this.dialog.open(ConfirmDlgComponent, {
        width: '50%',
        data: { question: 'Deseja realmente excluir este usuário?' }
      });

      // Captura do resultado da confirmação (true ou false)
      // após o fechamento do diálogo de confirmação
      let result = await dialogRef.afterClosed().toPromise();

      if (result) {
        await this.detalheSrv.excluir(id);
        this.snackBar.open('Exclusão efetuada com sucesso', 'Entendi',
          { duration: 3000 });
        this.ngOnInit(); // Atualizar os dados
      }

    }
    catch (erro) {
      console.log(erro);
      this.snackBar.open('ERRO: não foi possível excluir. Contate o suporte técnico',
        'Entendi', { duration: 3000 });
    }
  }

  async atualizar(status: boolean, id: string) {
    this.detalhe = await this.detalheSrv.obterUm(id);
    console.log(status);
    console.log(id);
    console.log(this.detalhe);

    try {
      let msg = 'Usuário atualizado com sucesso.';

      if (status == true) {
        msg = 'Usuário desativado.';
        this.detalhe.ativo = false;
        await this.detalheSrv.atualizar(this.detalhe);
      }
      else {
        msg = 'Usuário ativado.';
        this.detalhe.ativo = true;
        await this.detalheSrv.atualizar(this.detalhe);
      }

      this.snackBar.open(msg, 'Entendi', { duration: 3000 });
      this.ngOnInit(); // Atualizar os dados
    }
    catch (error) {
      console.log(error);
      this.snackBar.open('ERRO: não foi possível salvar os dados.', 'Entendi',
        { duration: 3000 });
    }
  }

}
