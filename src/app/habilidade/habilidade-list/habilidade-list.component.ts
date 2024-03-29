import { Component, OnInit } from '@angular/core';
import { HabilidadeService } from '../habilidade.service';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { MatDialog, MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-habilidade-list',
  templateUrl: './habilidade-list.component.html',
  styleUrls: ['./habilidade-list.component.scss']
})
export class HabilidadeListComponent implements OnInit {

  constructor(
    private habilidadeSrv: HabilidadeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  habilidades: any = []; // Vetor vazio
  displayedColumns: string[] = ['titulo', 'subtitulo', 'idIcone.url', 'editar', 'excluir'];

  async ngOnInit() {
    try {
      this.habilidades = await this.habilidadeSrv.listar();
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
        data: { question: 'Deseja realmente excluir este marcador?' }
      });

      // Captura do resultado da confirmação (true ou false)
      // após o fechamento do diálogo de confirmação
      let result = await dialogRef.afterClosed().toPromise();

      if (result) {
        await this.habilidadeSrv.excluir(id);
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
