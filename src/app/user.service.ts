import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2'

@Injectable()
export class UserService {

  constructor(private afAuth: AngularFireAuth) { }

  createUser(fullname, email, password) {
    let credentials = {
      'email' : email, 
      'password' : password
    }
    this.afAuth.createUser(credentials).then((authData) => {
      console.log('successfully created user')
      console.log(authData)
    }).catch((error) => {
      console.log(error)
    })
  }
}
