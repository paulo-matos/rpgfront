import { Component, OnInit } from '@angular/core';
import { PericiaService } from '../pericia.service';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-pericia-list',
  templateUrl: './pericia-list.component.html',
  styleUrls: ['./pericia-list.component.scss']
})
export class PericiaListComponent implements OnInit {

  constructor(
    private periciaSrv: PericiaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  pericias: any = []; // Vetor vazio
  displayedColumns: string[] = ['titulo', 'url', 'editar', 'excluir'];

  async ngOnInit() {
    try {
      this.pericias = await this.periciaSrv.listar();

      //populando os livros
      var galeriaLivros = document.getElementById('galeriaLivros');
      galeriaLivros.innerHTML = "";
      var livroLink;
      var livroImagem;
      var textnode;
      var livrosBack = this.pericias;
      var livroContainer;
      var livroOverlay;
      var livroText;
      // livrosSpan.id = 'nomeLivro';


      for (let i = 0; i < livrosBack.length; i++) {
        livroContainer = document.createElement("div");
        livroContainer.className = "containerImg";
        livroOverlay = document.createElement("div");
        livroOverlay.className = "overlayLivro";
        livroText = document.createElement("div");
        livroText.className = "tituloText";
        livroLink = document.createElement("a");
        livroImagem = document.createElement("img");
        livroImagem.className = "imagemLivro";

        textnode = document.createTextNode(livrosBack[i].titulo);
        livroText.appendChild(textnode);
        livroOverlay.appendChild(livroText);

        livroImagem.alt = livrosBack[i].titulo;
        livroImagem.title = livrosBack[i].titulo;
        livroText.add
        livroLink.href = livrosBack[i].url;
        livroLink.target = "_blank";
        livroImagem.src = livrosBack[i].url + 'files/shot.jpg';
        //livroImagem.style = "height: 300px; padding: 10px;";

        // livrosSpan.appendChild(textnode);
        // livroLink.appendChild(livrosSpan);
        livroLink.appendChild(livroOverlay);
        livroContainer.appendChild(livroImagem);
        livroContainer.appendChild(livroLink);
        galeriaLivros.appendChild(livroContainer);
      }
      //final populando os livros

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
        data: { question: 'Deseja realmente excluir este livro?' }
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
