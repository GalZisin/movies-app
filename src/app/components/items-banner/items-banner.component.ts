import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';

// const backdrop_path:string = items.backdrop_path ?? '';

@Component({
  selector: 'app-items-banner',
  templateUrl: './items-banner.component.html',
  styleUrls: ['./items-banner.component.scss']
})
export class ItemsBannerComponent implements OnInit {
  @Input() items: Movie[] = [];
  @Input() title: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
