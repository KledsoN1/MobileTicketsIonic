import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class Tab2Page {

  senhaAtual: string = '';

  constructor(private ticketService: TicketService) {}

  chamar() {
    this.senhaAtual = this.ticketService.chamarProxima();
  }
}