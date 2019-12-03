import { Component, OnInit } from '@angular/core';
import { ConhecimentoService } from '../conhecimento.service';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-conhecimento-list',
  templateUrl: './conhecimento-list.component.html',
  styleUrls: ['./conhecimento-list.component.scss']
})
export class ConhecimentoListComponent implements OnInit {

  /* ConhecimentoService injetado como dependência */
  constructor(
    private conhecimentoSrv: ConhecimentoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  conhecimentos: any = []; // Vetor vazio
  displayedColumns: string[] = ['identificador', 'academicos', 'computador', 'investigacao', 'ocultismo', 'editar', 'excluir'];

  async ngOnInit() {
    try {
      this.conhecimentos = await this.conhecimentoSrv.listar();
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
        data: { question: 'Deseja realmente excluir estes conhecimentos?' }
      });

      // Captura do resultado da confirmação (true ou false)
      // após o fechamento do diálogo de confirmação
      let result = await dialogRef.afterClosed().toPromise();

      if (result) {
        await this.conhecimentoSrv.excluir(id);
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
