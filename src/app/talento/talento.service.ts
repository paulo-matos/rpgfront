import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TalentoService {


  constructor(private http: HttpClient) 
  { }

  private endPoint : string = 'icone';

  listar() {
    return this.http.get(env.apiUri + this.endPoint).toPromise();
  }

  excluir(id: string) {
    // HttpClient.delete() não permite passar um parâmetro body.
    // Por isso, aqui usamos HttpClient.request('delete', ...).
    return this.http.request('delete', env.apiUri + this.endPoint, 
      {body: {_id: id}}).toPromise();
  }

  novo(talento: any) {
    return this.http.post(env.apiUri + this.endPoint, talento).toPromise();
  }

  obterUm(id: string) {
    return this.http.get(env.apiUri + this.endPoint + '/' + id).toPromise();
  }

  atualizar(talento: any) {
    return this.http.put(env.apiUri + this.endPoint, talento).toPromise();
  }

}
