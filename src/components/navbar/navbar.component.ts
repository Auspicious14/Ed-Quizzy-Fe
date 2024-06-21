import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: '.app-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  show: boolean = false;

  toggle() {
    this.show = !this.show;
  }
}
