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
  displayedColumns: string[] = ['identificador', 'trilha_pts', 'forca_vontade_atual', 'pontos_sangue_atual', 'pontos_vida_atual', 'editar', 'excluir'];

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
        data: { question: 'Deseja realmente excluir estes detalhes?' }
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

}
