import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { PericiaService } from '../pericia.service';

@Component({
  selector: 'app-pericia-form',
  templateUrl: './pericia-form.component.html',
  styleUrls: ['./pericia-form.component.scss']
})
export class PericiaFormComponent implements OnInit {

  constructor(
    private periciaSrv: PericiaService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  title: string = 'Adicionar Livro';
  pericia: any = {};
  pericias: any = []; // Vetor vazio
  displayedColumns: string[] = ['url', 'salvar', 'excluir'];


  async ngOnInit() {
    let params = this.actRoute.snapshot.params;
    if (params['id']) { // Se houver um parâmetro chamado id na rota
      try {
        // Busca os dados do pericia e preenche a variável ligada ao form
        this.pericia = await this.periciaSrv.obterUm(params['id']);
        this.title = 'Editar Livro';
      }
      catch (error) {
        console.log(error);
      }
    }
    try {
      this.pericias = await this.periciaSrv.listar();
    }
    catch (error) {
      console.error(error);
    }
  }

  async salvar(form: NgForm) {
    try {
      let msg = 'Livro adicionado com sucesso.';

      if (this.pericia._id) { // Se tem _id, está editando
        msg = 'Livro atualizado com sucesso';
        await this.periciaSrv.atualizar(this.pericia);
      }
      else { // Criação de um novo pericia
        await this.periciaSrv.novo(this.pericia);
      }

      this.snackBar.open(msg, 'Entendi', { duration: 3000 });
      this.router.navigate(['/livros']); // Volta à listagem
    }
    catch (error) {
      console.log(error);
      this.snackBar.open('ERRO: não foi possível salvar os dados.', 'Entendi',
        { duration: 3000 });
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
      this.router.navigate(['/livros']); // Retorna à listagem
    }
  }

}
