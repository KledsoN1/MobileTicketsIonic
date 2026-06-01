import { Injectable } from '@angular/core';

export interface Ticket {
  numero: string;
  tipo: string;
  dataEmissao: Date;
  dataAtendimento?: Date;
  atendida: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  filaSP: Ticket[] = [];
  filaSG: Ticket[] = [];
  filaSE: Ticket[] = [];

  historico: Ticket[] = [];

  ultimasChamadas: string[] = [];
  ultimoTipoChamado: string = '';

  constructor() {}

  gerarSenha(tipo: string) {

    const data = new Date();

    const yy = data.getFullYear().toString().slice(-2);
    const mm = (data.getMonth() + 1).toString().padStart(2, '0');
    const dd = data.getDate().toString().padStart(2, '0');

    const seq = (
      this.historico.filter(t => t.tipo === tipo).length + 1
    ).toString().padStart(3, '0');

    const numero = `${yy}${mm}${dd}-${tipo}${seq}`;

    const ticket: Ticket = {
      numero,
      tipo,
      dataEmissao: new Date(),
      atendida: false
    };

    if (tipo === 'SP') this.filaSP.push(ticket);
    if (tipo === 'SG') this.filaSG.push(ticket);
    if (tipo === 'SE') this.filaSE.push(ticket);

    this.historico.push(ticket);

    return numero;
  }

  chamarProxima() {

    let ticket: Ticket | undefined;

    if (this.ultimoTipoChamado !== 'SP' && this.filaSP.length > 0) {

      ticket = this.filaSP.shift();
      this.ultimoTipoChamado = 'SP';

    } else if (this.filaSE.length > 0) {

      ticket = this.filaSE.shift();
      this.ultimoTipoChamado = 'SE';

    } else if (this.filaSG.length > 0) {

      ticket = this.filaSG.shift();
      this.ultimoTipoChamado = 'SG';
    }

    if (!ticket) {
      return 'Sem senhas';
    }

    if (Math.random() < 0.05) {
      return `${ticket.numero} - Cliente não compareceu`;
    }

    ticket.atendida = true;
    ticket.dataAtendimento = new Date();

    this.ultimasChamadas.unshift(ticket.numero);
    this.ultimasChamadas = this.ultimasChamadas.slice(0, 5);

    return ticket.numero;
  }

  getTotalEmitidas() {
    return this.historico.length;
  }

  getTotalAtendidas() {
    return this.historico.filter(t => t.atendida).length;
  }

  getEmitidasPorTipo(tipo: string) {
    return this.historico.filter(t => t.tipo === tipo).length;
  }

  getAtendidasPorTipo(tipo: string) {
    return this.historico.filter(
      t => t.tipo === tipo && t.atendida
    ).length;
  }
}