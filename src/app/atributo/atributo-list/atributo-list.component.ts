import { Component, OnInit } from '@angular/core';
import { AtributoService } from '../atributo.service';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-atributo-list',
  templateUrl: './atributo-list.component.html',
  styleUrls: ['./atributo-list.component.scss']
})
export class AtributoListComponent implements OnInit {

  /* AtributoService injetado como dependência */
  constructor(
    private atributoSrv: AtributoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  atributos: any = []; // Vetor vazio
  displayedColumns: string[] = ['_id', 'fis_forca', 'fis_destreza', 'soc_aparencia', 'men_percepcao', 'men_raciocinio' ,'editar', 'excluir'];

  async ngOnInit() {
    try {
      this.atributos = await this.atributoSrv.listar();
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
        data: { question: 'Deseja realmente excluir este atributo?' }
      });

      // Captura do resultado da confirmação (true ou false)
      // após o fechamento do diálogo de confirmação
      let result = await dialogRef.afterClosed().toPromise();

      if (result) {
        await this.atributoSrv.excluir(id);
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
