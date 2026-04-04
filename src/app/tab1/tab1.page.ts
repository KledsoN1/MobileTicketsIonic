import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class Tab1Page {

  ultimaSenha: string = '';

  constructor(private ticketService: TicketService) {}

  gerar(tipo: string) {
    this.ultimaSenha = this.ticketService.gerarSenha(tipo);
  }
}