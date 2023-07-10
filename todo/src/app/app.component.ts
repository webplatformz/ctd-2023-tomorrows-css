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

  navigateToHomePage(): void {
    const todoId = window.location.pathname.replace('/todos/', '');
    const element = document.querySelector(`[data-id="${todoId}"]`);
    this.navigateService.navigateWithElementAnimation('/', 'img.banner-image', `[data-id="${todoId}"]`, 'todo-image');
    // this.navigateService.navigateTo('/');
  }

  private navigateToWindowLocation(): void {
    this.navigateService.navigateTo(window.location.pathname);
  }
}
