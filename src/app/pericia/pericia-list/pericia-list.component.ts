import { Component, OnInit } from '@angular/core';
import { PericiaService } from '../pericia.service';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-pericia-list',
  templateUrl: './pericia-list.component.html',
  styleUrls: ['./pericia-list.component.scss']
})
export class PericiaListComponent implements OnInit {

  /* PericiaService injetado como dependência */
  constructor(
    private periciaSrv: PericiaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  pericias: any = []; // Vetor vazio
  displayedColumns: string[] = ['_id', 'conducao', 'arma_fogo', 'arma_branca', 'furtividade', 'editar', 'excluir'];

  async ngOnInit() {
    try {
      this.pericias = await this.periciaSrv.listar();
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
        data: { question: 'Deseja realmente excluir estas perícias?' }
      });

      // Captura do resultado da confirmação (true ou false)
      // após o fechamento do diálogo de confirmação
      let result = await dialogRef.afterClosed().toPromise();

      if (result) {
        await this.periciaSrv.excluir(id);
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
