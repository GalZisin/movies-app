import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-embed',
  templateUrl: './video-embed.component.html',
  styleUrls: ['./video-embed.component.scss']
})
export class VideoEmbedComponent implements OnInit, AfterViewChecked {
  @Input() site: string = 'YouTube';
  @Input() key: string | null = null;
  videoUrl: SafeResourceUrl = '';
  isLoading = true;
  @ViewChild('iframe') iframe!: ElementRef;
  constructor(private sanitizer: DomSanitizer, private detectChangesRef: ChangeDetectorRef) { }


  ngOnInit(): void {
    // console.log("ngOnInit isloading", this.isLoading);
    switch (this.site) {
      case 'YouTube':
        this.videoUrl = this.getSafeUrl('https://www.youtube.com/embed/' + this.key);
        break;
      case 'Vimeo':
        this.videoUrl = this.getSafeUrl('https://www.vimeo.com/embed/' + this.key);
        break;
    }
  }

  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onLoad() {
    this.isLoading = false;
    this.detectChangesRef.detectChanges();
  }

  // @HostListener('load')
  // onLoad() {
  //   this.isLoading = false;
  //   console.log("onLoad isloading", this.isLoading);
  //   console.log("onLoad", this.iframe.nativeElement);
  //   this.detectChangesRef.detectChanges();
  // }

  ngAfterViewChecked(): void {
    // this.detectChangesRef.detectChanges();
    // console.log("onLoad", this.iframe.nativeElement);
    // console.log("ngAfterViewChecked isloading", this.isLoading);
  }

}
