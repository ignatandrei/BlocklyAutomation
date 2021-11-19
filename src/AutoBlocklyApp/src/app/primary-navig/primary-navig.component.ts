import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoadShowUsageService } from '../load-show-usage.service';
import { DemoBlocks } from '../DemoBlocks';

@Component({
  selector: 'app-primary-navig',
  templateUrl: './primary-navig.component.html',
  styleUrls: ['./primary-navig.component.css']
})
export class PrimaryNavigComponent implements OnInit {

  demoBlocks: DemoBlocks[]=[];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private loadDemo: LoadShowUsageService) {}
  ngOnInit(): void {
    this.loadDemo.getDemoBlocks().subscribe(res => {
      this.demoBlocks = res.sort((a, b) => a.description.localeCompare(b.description));
    });
  }

}
