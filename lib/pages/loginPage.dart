import 'package:sgnj/utils/firebase_anon_auth.dart';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';

class LoginPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _LoginPageState();
  }
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();
  FirebaseAnonAuth firebaseAuth = FirebaseAnonAuth();
  String _email;
  String _password;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Admin Login"),
      ),
      body: SingleChildScrollView(
        child: loginForm(),
      )
    );
  }

  loginForm(){
    return Form(
      key: _formKey,
      child: SafeArea(
          child: Container(
            child: Padding(
              padding: EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  TextFormField(
                    decoration: InputDecoration(
                      labelText: 'Email',
                      hintText: 'admin@sikhgamesofnj.com'
                    ),
                    validator: (value) {
                      _email = value;
                      if (value.isEmpty) {
                        return 'Enter email';
                      }
                      return null;
                    },
                  ),
                  TextFormField(
                    obscureText: true,
                    decoration: InputDecoration(
                      labelText: 'Password',
                      hintText: '*****'
                    ),
                    validator: (value) {
                      _password = value;
                      if (value.isEmpty) {
                        return 'Enter password';
                      }
                      return null;
                    },
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 16.0),
                    child: RaisedButton(
                      onPressed: () {
                        if (_formKey.currentState.validate()) {
                         
                          signInUser();
                          setState(() {
                          });
                          //Navigator.pop(context);
                        }
                      },
                      child: Text('Login'),
                    ),
                  ),
                ],
              ), 
            ),
          )
      )
    );
  }

  signInUser(){
    firebaseAuth.signInEmail(_email, _password).then((onValue){
      if(onValue.uid != null && onValue.uid != ""){
        Navigator.pop(context, true);
      }
    });
  }
  
}
