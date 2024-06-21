import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { graphqlProvider } from './graphql.provider';
import { provideToastr } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCarouselModule } from 'ng-mat-carousel';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    graphqlProvider,
    provideToastr(),
    provideAnimations(),
    ReactiveFormsModule,
    MatCarouselModule,
  ],
};
