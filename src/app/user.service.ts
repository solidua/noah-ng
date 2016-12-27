import { Injectable } from '@angular/core';
import { AngularFire, AngularFireAuth, AuthProviders, AuthMethods, FirebaseAuth} from 'angularfire2'

@Injectable()
export class UserService {

  constructor(private af: AngularFire, private afAuth: AngularFireAuth, private fbAuth: FirebaseAuth) { }

  createUser(fullname, email, password) {
    let credentials = {
      'email' : email, 
      'password' : password
    }
    this.afAuth.createUser(credentials).then((authData) => {
      console.log('successfully created user') 
      credentials = null; 
      this.afAuth.getAuth().auth.updateProfile({
        displayName: fullname, 
        photoURL: null
      }).then(function(success) {
        console.log(success); 
      }); 
    }).catch((error) => {
      console.log(error)
    })
  }

  signOut() {
    this.afAuth.logout()
  }

  signin(credentials) {
    this.afAuth.login(credentials, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }).then((authData) => {
      console.log('successfully signed in')
    })
  }

  fbSignin() {
    this.afAuth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    })
  }

  googleSignin() {
    this.afAuth.login({
      provider: AuthProviders.Google, 
      method: AuthMethods.Popup
    })
  }

  twitterSignin() {
    this.afAuth.login({
      provider: AuthProviders.Twitter, 
      method: AuthMethods.Popup
    })
  }
}
