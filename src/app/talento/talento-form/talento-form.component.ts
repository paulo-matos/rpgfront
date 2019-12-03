import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { TalentoService } from '../talento.service';

@Component({
  selector: 'app-talento-form',
  templateUrl: './talento-form.component.html',
  styleUrls: ['./talento-form.component.scss']
})
export class TalentoFormComponent implements OnInit {

  constructor(
    private talentoSrv: TalentoService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  title: string = 'Novos talentos';
  talento: any = {};


  async ngOnInit() {
    let params = this.actRoute.snapshot.params;
    if (params['id']) { // Se houver um parâmetro chamado id na rota
      try {
        // Busca os dados do talento e preenche a variável ligada ao form
        this.talento = await this.talentoSrv.obterUm(params['id']);
        this.title = 'Editar talentos';
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  async salvar(form: NgForm) {
    if (form.valid) {
      try {
        let msg = 'Talentos criados com sucesso.';

        if (this.talento._id) { // Se tem _id, está editando
          msg = 'Talentos atualizados com sucesso';
          await this.talentoSrv.atualizar(this.talento);
        }
        else { // Criação de um novo talento
          await this.talentoSrv.novo(this.talento);
        }

        this.snackBar.open(msg, 'Entendi', { duration: 3000 });
        this.router.navigate(['/talento']); // Volta à listagem
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
      this.router.navigate(['/talento']); // Retorna à listagem
    }
  }

}
