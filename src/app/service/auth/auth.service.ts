import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { SIGN_IN, SIGN_UP } from '../../auth/gql/query';
import { Observable } from 'rxjs';
import { ISignIn } from '../../auth/model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apollo: Apollo) {}

  signIn(payload: ISignIn): Observable<any> {
    return this.apollo.mutate({
      mutation: SIGN_IN,
      variables: {
        payload,
      },
      useMutationLoading: true,
    });
  }

  signup(user: any): Observable<any> {
    return this.apollo.mutate({
      mutation: SIGN_UP,
      variables: {
        createUser: user,
      },
    });
  }

  isAuthenticated(): boolean {
    const token = this.getSession();
    if (token !== null && token !== '' && token?.startsWith('eyJ')) {
      return true;
    } else {
      return false;
    }
  }

  getSession() {
    var nameEQ = 'token' + '=';
    if (typeof document !== 'undefined') {
      var ca: any = document.cookie.split(';');
    }
    for (var i = 0; i < ca?.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  addSession(token: string) {
    let date = new Date();
    date.setTime(date.getTime() + 3 * 60 * 60 * 24 * 1000);
    const expiryDate = date.toUTCString();
    if (typeof document !== 'undefined') {
      document.cookie = `token=${token}; expires=${expiryDate}; path=/`;
    }
  }

  deleteSession() {
    let date = new Date();
    date.setTime(date.getTime() + -1 * 24 * 60 * 60);
    const expiryDate = date.toUTCString();
    if (typeof document !== 'undefined') {
      document.cookie = `token= ; expires=${expiryDate}; path=/`;
    }
  }
}
