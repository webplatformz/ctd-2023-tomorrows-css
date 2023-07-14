import {Injectable, NgZone} from '@angular/core';
import {Router} from "@angular/router";
import {NavigationOptions} from "../models/navigation-options.model";
import {ScrollPosition} from "../models/scroll-position.model";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private scrollPositions: ScrollPosition = {};

  constructor(private router: Router, private zone: NgZone) {
  }

  async navigate(url: string, options?: NavigationOptions): Promise<void> {
    if (this.router.url !== url) {
      if (Object.hasOwn(document, 'startViewTransition')) {
        await this.router.navigateByUrl(url);
        return;
      }

      if (url === '/') {
        document.documentElement.classList.add('back-navigation');
      }

      this.saveScrollPosition(this.router.url);

      if (options) {
        document.querySelector(options.queryBefore)?.classList.add('embed-transition');
      }

      await this.zone.runOutsideAngular(async () => {
        // @ts-ignore
        const transition = await document.startViewTransition(async () => {
          await this.zone.run(async () => {
            await this.router.navigateByUrl(url);
          });
          if (options) {
            document.querySelector(options.queryAfter)?.classList.add('embed-transition');
          }
          this.applyScrollPosition(url);
        });

        try {
          await transition.finished;
        } finally {
          document.documentElement.classList.remove('back-navigation');
          if (options) {
            document.querySelector(options.queryAfter)?.classList.remove('embed-transition');
          }
        }
      });
    }
  }

  private saveScrollPosition(url: string): void {
    this.scrollPositions[url] = {
      top: document.documentElement.scrollTop,
      left: document.documentElement.scrollLeft,
    };
  }

  private applyScrollPosition(url: string): void {
    if (this.scrollPositions[url]) {
      const {top, left} = this.scrollPositions[url];
      document.documentElement.scroll({top, left});
      delete this.scrollPositions[url];
    }
  }
}
