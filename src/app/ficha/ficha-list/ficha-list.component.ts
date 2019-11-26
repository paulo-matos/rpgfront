import { Component, OnInit } from '@angular/core';
import { FichaService } from '../ficha.service';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-ficha-list',
  templateUrl: './ficha-list.component.html',
  styleUrls: ['./ficha-list.component.scss']
})
export class FichaListComponent implements OnInit {

  /* FichaService injetado como dependência */
  constructor(
    private fichaSrv: FichaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  fichas: any = []; // Vetor vazio
  displayedColumns: string[] = ['nome', 'especie', 'jogador', 'cla', 'cronica', 'editar', 'excluir'];

  async ngOnInit() {
    try {
      this.fichas = await this.fichaSrv.listar();
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
        data: { question: 'Deseja realmente excluir esta ficha?' }
      });

      // Captura do resultado da confirmação (true ou false)
      // após o fechamento do diálogo de confirmação
      let result = await dialogRef.afterClosed().toPromise();

      if (result) {
        await this.fichaSrv.excluir(id);
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

}
