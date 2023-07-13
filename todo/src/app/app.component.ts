import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationService} from "./services/navigation.service";
import {NavigationEnd, Router} from "@angular/router";
import {filter, Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isHomePage: boolean = true;

  private subscription: Subscription | undefined;

  constructor(private navigateService: NavigationService, private router: Router) {
  }

  ngOnInit(): void {
    window.addEventListener('popstate', () => this.navigateToWindowLocation());

    this.subscription = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe({
        next: (event) => (this.isHomePage = (event as NavigationEnd).urlAfterRedirects === '/'),
        error: console.log,
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    window.removeEventListener('popstate', () => this.navigateToWindowLocation());
  }

  async navigateToHomePage(): Promise<void> {
    const todoId = window.location.pathname.replace('/todos/', '');
    await this.navigateService.navigate('/', {
      queryBefore: '.banner-image',
      queryAfter: `[data-id="${todoId}"]`,
    });
  }

  private async navigateToWindowLocation(): Promise<void> {
    await this.navigateService.navigate(window.location.pathname);
  }
}
