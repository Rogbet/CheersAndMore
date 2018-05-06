import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Expense } from '../../models/expense';
import { ExpensesService } from '../../services/expenses.service';
import { SnackbarService } from '../../services/snackbar.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
  name = new FormControl('', [
    Validators.required
  ]);
  cost = new FormControl('', [
    Validators.required
  ]);
  date = new FormControl('', [
    Validators.required
  ]);
  loading = false;
  expenseForm: FormGroup;
  
  expense: Expense = {
    name:'',
    cost: null,
    date: null,
  }

  constructor(private expenseService: ExpensesService,private snackbarService: SnackbarService,private router: Router) { }

  ngOnInit() {
    this.expenseForm = new FormGroup ({
      name: this.name,
      cost: this.cost,
      date : this.date,
    })
  }

  save(){
    if(this.expenseForm.valid){

      this.loading = true;
      this.expenseService.addExpense(this.expense).then(() => {
        this.loading = false;
        this.snackbarService.openSnackBar("Un nuevo egreso ha sido creado!", "Cerrar");

        this.router.navigate(['Egresos']);
      }).catch(() => {
        this.loading = false;
      });

    }
  }
}
