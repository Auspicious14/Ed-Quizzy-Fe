import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastSvc {
  constructor(public toast: ToastrService) {}

  success(message: string) {
    this.toast.success(message);
  }

  graphQlError(error: any) {
    const err =
      error.graphQLErrors && error.graphQLErrors.length > 0
        ? error.graphQLErrors
        : error.networkError && error.networkError.result
        ? error.networkError.result.errors
        : [];

    const mappedError = err.map((e: any) => e.message).toString();
    this.toast.error(mappedError);
  }
}
