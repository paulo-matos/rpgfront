import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { HabilidadeService } from '../habilidade.service';
// import { TalentoService } from '../../talento/talento.service';
// import { PericiaService } from '../../pericia/pericia.service';
// import { ConhecimentoService } from '../../conhecimento/conhecimento.service';


//teste 01
interface Icone {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-habilidade-form',
  templateUrl: './habilidade-form.component.html',
  styleUrls: ['./habilidade-form.component.scss']
})
export class HabilidadeFormComponent implements OnInit {

  constructor(
    private habilidadeSrv: HabilidadeService,
    // private talentoSrv: TalentoService,
    // private periciaSrv: PericiaService,
    // private conhecimentoSrv: ConhecimentoService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  title: string = 'Adicionar Marcador';
  habilidade: any = {};
  // talentos: any = [];
  // pericias: any = [];
  // conhecimentos: any = [];

  icones: Icone[] = [

    {value: '5ee85e038519291b3c262635', viewValue: 'c_assamitaAnti.png'},
    {value: '5ee85e208519291b3c262636', viewValue: 'c_brujah.png'},
    {value: '5ee85e2a8519291b3c262637', viewValue: 'c_gangrel.png'},

    {value: '5ee85e338519291b3c262638', viewValue: 'c_giovanni.png'},
    {value: '5ee85e3d8519291b3c262639', viewValue: 'c_lasombra.png'},
    {value: '5ee85e4d8519291b3c26263a', viewValue: 'c_malkavian.png'},

    {value: '5ee85e548519291b3c26263b', viewValue: 'c_nosferatu.png'},
    {value: '5ee85e5b8519291b3c26263c', viewValue: 'c_ravnos.png'},
    {value: '5ee85e838519291b3c26263d', viewValue: 'c_seth.png'},

    {value: '5ee85eb08519291b3c26263e', viewValue: 'c_toreador.png'},
    {value: '5ee85ebe8519291b3c26263f', viewValue: 'c_tremere.png'},
    {value: '5ee85ecb8519291b3c262640', viewValue: 'c_tzimisce.png'},

    {value: '5ee85ed38519291b3c262641', viewValue: 'c_ventrue.png'},
    {value: '5ee85ede8519291b3c262642', viewValue: 'g_anarch.png'},
    {value: '5ee85ef28519291b3c262643', viewValue: 'g_camarilla.png'},

    {value: '5ee85efd8519291b3c262644', viewValue: 'g_sabbat.png'},
    {value: '5ee85f0c8519291b3c262645', viewValue: 'l_bar.png'},
    {value: '5ee85f148519291b3c262646', viewValue: 'l_casa.png'},

    
    {value: '5ee85f1b8519291b3c262647', viewValue: 'l_diversao.png'},
    {value: '5ee85f238519291b3c262648', viewValue: 'l_esgoto.png'},
    {value: '5ee85f2a8519291b3c262649', viewValue: 'l_galpao.png'},
    
    {value: '5ee85f338519291b3c26264a', viewValue: 'l_loja.png'},
    {value: '5ee85f3b8519291b3c26264b', viewValue: 'l_parque.png'},
    {value: '5ee85f468519291b3c26264c', viewValue: 'l_praca.png'},
    
    {value: '5ee85f4e8519291b3c26264d', viewValue: 'l_predio.png'},
    {value: '5ee85f568519291b3c26264e', viewValue: 'l_sangue.png'},
    {value: '5ee85f788519291b3c26264f', viewValue: 'o_cruz.png'},
    
    {value: '5ee85f818519291b3c262650', viewValue: 'o_dinheiro.png'},
    {value: '5ee85f8c8519291b3c262651', viewValue: 'v_anciao.png'},
    {value: '5ee85f958519291b3c262652', viewValue: 'v_ancillae.png'},
    
    {value: '5ee85fa08519291b3c262653', viewValue: 'v_antediluviano.png'},
    {value: '5ee85faa8519291b3c262654', viewValue: 'v_matusalem.png'},
    {value: '5ee85fb28519291b3c262655', viewValue: 'v_neofito.png'},
    
    {value: '5ee860488519291b3c262656', viewValue: 'o_alerta.png'},
    {value: '5ee860878519291b3c262657', viewValue: 'o_lobisomem.png'},
    {value: '5ee8610a8519291b3c262658', viewValue: 'o_batalha.png'},

    {value: '5ee861478519291b3c262659', viewValue: 'l_hospital.png'},
    {value: '5ee861718519291b3c26265a', viewValue: 'o_fogo.png'}
    

  ];



  async ngOnInit() {
    let params = this.actRoute.snapshot.params;
    if (params['id']) { // Se houver um parâmetro chamado id na rota
      try {
        // Busca os dados do habilidade e preenche a variável ligada ao form
        this.habilidade = await this.habilidadeSrv.obterUm(params['id']);
        this.title = 'Editar marcador';
      }
      catch (error) {
        console.log(error);
      }
    }

    // Entidades relacionadas
    // try{
    //   this.talentos = await this.talentoSrv.listar();
    //   this.pericias = await this.periciaSrv.listar();
    //   this.conhecimentos = await this.conhecimentoSrv.listar();
    // }
    // catch(error) {
    //   console.log(error);
    // }
  }

  async salvar(form: NgForm) {
    if (form.valid) {
      try {
        let msg = 'Marcador criado com sucesso.';

        if (this.habilidade._id) { // Se tem _id, está editando
          msg = 'Marcador atualizado com sucesso';
          await this.habilidadeSrv.atualizar(this.habilidade);
        }
        else { // Criação de um novo habilidade
          await this.habilidadeSrv.novo(this.habilidade);
        }

        this.snackBar.open(msg, 'Entendi', { duration: 3000 });
        this.router.navigate(['/mapa']); // Volta à listagem
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
      this.router.navigate(['/mapa']); // Retorna à listagem
    }
  }

}
