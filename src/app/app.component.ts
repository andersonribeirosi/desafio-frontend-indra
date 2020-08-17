import { Component, OnInit } from '@angular/core';
import { HistoryService } from './services/historic.service';
import { Fuel } from './models/fuel';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  history = {} as Fuel;
  histories: Fuel[];

  constructor(private historyService: HistoryService) {}

  ngOnInit() {
    this.getFuels();
  }

  // defini se um carro será criado ou atualizado
  saveFuel(form: NgForm) {
    if (this.history.id !== undefined) {
      this.historyService.updateFuel(this.history).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.historyService.saveFuel(this.history).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os carros
  getFuels() {
    this.historyService.getFuels().subscribe((historicos: any) => {
      this.histories = historicos;
    });
  }

  // deleta um carro
  deleteFuel(fuel: Fuel) {
    this.historyService.deleteFuel(fuel).subscribe(() => {
      this.getFuels();
    });
  }

  // Pega os dados para serem editados.
  editFuel(fuel: Fuel) {
    this.history = { ...fuel };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getFuels();
    form.resetForm();
    this.history = {} as Fuel;
  }
}
