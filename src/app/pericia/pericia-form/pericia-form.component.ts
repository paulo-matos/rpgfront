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

  title: string = 'Novas pericias';
  pericia: any = {};


  async ngOnInit() {
    let params = this.actRoute.snapshot.params;
    if (params['id']) { // Se houver um parâmetro chamado id na rota
      try {
        // Busca os dados do pericia e preenche a variável ligada ao form
        this.pericia = await this.periciaSrv.obterUm(params['id']);
        this.title = 'Editar perícias';
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  async salvar(form: NgForm) {
    if (form.valid) {
      try {
        let msg = 'Perícias criadas com sucesso.';

        if (this.pericia._id) { // Se tem _id, está editando
          msg = 'Perícias atualizadas com sucesso';
          await this.periciaSrv.atualizar(this.pericia);
        }
        else { // Criação de um novo pericia
          await this.periciaSrv.novo(this.pericia);
        }

        this.snackBar.open(msg, 'Entendi', { duration: 3000 });
        this.router.navigate(['/pericia']); // Volta à listagem
      }
      catch (error) {
        console.log(error);
        this.snackBar.open('ERRO: não foi possível salvar os dados.', 'Entendi',
          { duration: 3000 });
      }
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
      this.router.navigate(['/pericia']); // Retorna à listagem
    }
  }

}
