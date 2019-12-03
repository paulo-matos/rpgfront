import { Component, OnInit } from '@angular/core';
import { TalentoService } from '../talento.service';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-talento-list',
  templateUrl: './talento-list.component.html',
  styleUrls: ['./talento-list.component.scss']
})
export class TalentoListComponent implements OnInit {

  /* TalentoService injetado como dependência */
  constructor(
    private talentoSrv: TalentoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  talentos: any = []; // Vetor vazio
  displayedColumns: string[] = ['identificador', 'prontidao', 'briga', 'esquiva', 'intimidacao', 'editar', 'excluir'];

  async ngOnInit() {
    try {
      this.talentos = await this.talentoSrv.listar();
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
        data: { question: 'Deseja realmente excluir estes talentos?' }
      });

      // Captura do resultado da confirmação (true ou false)
      // após o fechamento do diálogo de confirmação
      let result = await dialogRef.afterClosed().toPromise();

      if (result) {
        await this.talentoSrv.excluir(id);
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
