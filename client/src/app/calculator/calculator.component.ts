import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { CalculatorService } from 'src/core/calculator.service';

// import fake-db
import TableData from "../../@fake-db/table-data.json";

// import interface
import { UserInterface, ResultInterface } from './type';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  modalRef?: BsModalRef;

  //table data
  rows: UserInterface[] = TableData;

  // input value
  inputedName: String = "";
  inputedAmount: Number | null = null;

  //result data
  total : Number = 0;
  equalShare : Number = 0;
  resultRows : ResultInterface[] = [];


  constructor(private modalService: BsModalService, private calcService: CalculatorService) {}

  openModal(template: TemplateRef<any>) {
    this.inputedAmount = null;
    this.inputedName = "";

    this.modalRef = this.modalService.show(template);
  }

  insertUser() {
    // validation
    if(!this.inputedAmount || !this.inputedName) return;

    let addedData: UserInterface[] = [...this.rows, { name: this.inputedName, amount: this.inputedAmount }];
    this.rows = addedData;

    this.modalRef?.hide();
  }

  handleSubmit() {
    this.calcService.calculateExpense(this.rows).subscribe(result => {
      console.log(result);
      this.total = result.total;
      this.equalShare = result.equalShare;
      this.resultRows = result.payouts;
    });
  }
}
