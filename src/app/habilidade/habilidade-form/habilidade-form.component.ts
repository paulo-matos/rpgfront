import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { HabilidadeService } from '../habilidade.service';
import { TalentoService } from '../../talento/talento.service';
import { PericiaService } from '../../pericia/pericia.service';
import { ConhecimentoService } from '../../conhecimento/conhecimento.service';

@Component({
  selector: 'app-habilidade-form',
  templateUrl: './habilidade-form.component.html',
  styleUrls: ['./habilidade-form.component.scss']
})
export class HabilidadeFormComponent implements OnInit {

  constructor(
    private habilidadeSrv: HabilidadeService,
    private talentoSrv: TalentoService,
    private periciaSrv: PericiaService,
    private conhecimentoSrv: ConhecimentoService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  title: string = 'Novas habilidades';
  habilidade: any = {};
  talentos: any = [];
  pericias: any = [];
  conhecimentos: any = [];

  async ngOnInit() {
    let params = this.actRoute.snapshot.params;
    if (params['id']) { // Se houver um parâmetro chamado id na rota
      try {
        // Busca os dados do habilidade e preenche a variável ligada ao form
        this.habilidade = await this.habilidadeSrv.obterUm(params['id']);
        this.title = 'Editar habilidades';
      }
      catch (error) {
        console.log(error);
      }
    }

    // Entidades relacionadas
    try{
      this.talentos = await this.talentoSrv.listar();
      this.pericias = await this.periciaSrv.listar();
      this.conhecimentos = await this.conhecimentoSrv.listar();
    }
    catch(error) {
      console.log(error);
    }
  }

  async salvar(form: NgForm) {
    if (form.valid) {
      try {
        let msg = 'Habilidades criadas com sucesso.';

        if (this.habilidade._id) { // Se tem _id, está editando
          msg = 'Habilidades atualizadas com sucesso';
          await this.habilidadeSrv.atualizar(this.habilidade);
        }
        else { // Criação de um novo habilidade
          await this.habilidadeSrv.novo(this.habilidade);
        }

        this.snackBar.open(msg, 'Entendi', { duration: 3000 });
        this.router.navigate(['/habilidade']); // Volta à listagem
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
      this.router.navigate(['/habilidade']); // Retorna à listagem
    }
  }

}
