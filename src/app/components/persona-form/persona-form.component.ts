import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-persona-form',
  templateUrl: './persona-form.component.html',
  styleUrls: ['./persona-form.component.css']
})
export class PersonaFormComponent {

  @Input() formularioIn!: FormGroup;
  @Input() formularioConfig!: any[];
  @Input() buttonActionMessage!: string;

  @Output() enviar = new EventEmitter<void>();

  constructor() {}

  onSubmit() {
    this.enviar.emit();
  }
}
