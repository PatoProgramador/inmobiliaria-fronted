import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-persona-form',
  templateUrl: './persona-form.component.html',
  styleUrls: ['./persona-form.component.css']
})
export class PersonaFormComponent implements OnInit {

  @Input() formularioIn!: FormGroup;
  @Input() formularioConfig!: any[];

  @Output() enviar = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {
    console.log(this.formularioIn);
    console.log(this.formularioConfig)
  }

  onSubmit() {
    this.enviar.emit();
  } 
}
