import { AfterViewInit, Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <div class="spacer"></div>
    <header #el>
      <div [style.transform]="'scale({scale})'" class="title">Notes</div>
      <span>Link 1</span>
      <span>Link 1</span>
      <span>Link 1</span>
      <span>Link 1</span>
      <span>Link 1</span>
      <span>Link 1</span>
      <span>Link 1</span>
      <span>Link 1</span>
      <span>Link 1</span>
      <span>Link 1</span>
      <span>Link 1</span>
      <span>Link 1</span>
      <span>Link 1</span>
    </header>
    <div class="footer"></div>
  </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  scale = 2;
  running = false;

  @ViewChild('el', {static: false}) el: ElementRef;

  // constructor(private el: ElementRef) {}
  constructor(public renderer: Renderer2) {}
  
  @HostListener('scroll', ['$event'])
  scroll() {
    if (this.running) {
      return;
    }
    this.running = true;
    requestAnimationFrame(() => {
      this.el.nativeElement.dispatchEvent(new CustomEvent('optimizedScroll', {bubbles: true}));
      this.running = false;
    });
  }

  @HostListener('optimizedScroll', ['$event'])
  optimizedScroll($event) {

    const {top: pos} = $event.target.getBoundingClientRect();
    const scale = 2 - Math.pow(pos / 300 - 1, 2);
    console.log(scale);
    this.renderer.setStyle(this.el.nativeElement.firstChild, 'transform', `scale(${ scale })`);
  }
}
