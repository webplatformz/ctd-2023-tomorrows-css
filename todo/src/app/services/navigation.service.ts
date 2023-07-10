import {Injectable, NgZone} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router, private zone: NgZone) {
  }


  async navigateWithElementAnimation(url: string, queryBefore: string, queryAfter: string, transitionName: string): Promise<void> {
    if (this.router.url !== url) {
      // fallback
      // @ts-ignore
      if (!document.startViewTransition) {
        void this.router.navigateByUrl(url);
        return;
      }

      document.querySelector(queryBefore)?.classList.add(transitionName);

      // @ts-ignore
      const transition = document.startViewTransition(() => {
        void this.zone.run(() => this.router.navigateByUrl(url));
      });

      transition.ready.finally(() =>
        document.querySelector(queryAfter)?.classList.add(transitionName)
      );

      transition.finished.finally(() =>
        document.querySelector(queryAfter)?.classList.remove(transitionName)
      );
    }
  }

  navigateTo(url: string): void {
    if (this.router.url !== url) {
      // @ts-ignore
      // fallback, if startViewTransition is not supported by browser
      if (!document.startViewTransition) {
        void this.router.navigateByUrl(url);
        return;
      }

      // @ts-ignore
      document.startViewTransition(() => this.zone.run(() => this.router.navigateByUrl(url)));
    }
  }
}
