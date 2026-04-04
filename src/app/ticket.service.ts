import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  filaSP: string[] = [];
  filaSG: string[] = [];
  filaSE: string[] = [];

  ultimasChamadas: string[] = [];
  ultimoTipoChamado: string = '';

  constructor() {}

  gerarSenha(tipo: string) {
    const data = new Date();

    const yy = data.getFullYear().toString().slice(-2);
    const mm = (data.getMonth() + 1).toString().padStart(2, '0');
    const dd = data.getDate().toString().padStart(2, '0');

    const seq = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

    const senha = `${yy}${mm}${dd}-${tipo}${seq}`;

    if (tipo === 'SP') this.filaSP.push(senha);
    if (tipo === 'SG') this.filaSG.push(senha);
    if (tipo === 'SE') this.filaSE.push(senha);

    return senha;
  }

  chamarProxima() {
    let senha = '';

    if (this.ultimoTipoChamado !== 'SP' && this.filaSP.length > 0) {
      senha = this.filaSP.shift()!;
      this.ultimoTipoChamado = 'SP';
    } else if (this.filaSE.length > 0) {
      senha = this.filaSE.shift()!;
      this.ultimoTipoChamado = 'SE';
    } else if (this.filaSG.length > 0) {
      senha = this.filaSG.shift()!;
      this.ultimoTipoChamado = 'SG';
    }

    if (Math.random() < 0.05) {
      return 'Cliente não compareceu';
    }

    if (senha) {
      this.ultimasChamadas.unshift(senha);
      this.ultimasChamadas = this.ultimasChamadas.slice(0, 5);
    }

    return senha || 'Sem senhas';
  }
}