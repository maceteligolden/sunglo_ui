import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projectcard',
  templateUrl: './projectcard.component.html',
  styleUrls: ['./projectcard.component.css']
})
export class ProjectcardComponent implements OnInit {

  @Input() title?: string;

  @Input() description?: string;

  @Input() cost?: string;

  @Input() id?: string;

  @Input() thumbnail?: string;

  @Input() status?: string;

  value?: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.value = "~ USD " + this.cost ;
  }

  viewDetail(): void {
    this.router.navigate(['/projects/', this.id])
  }

}
