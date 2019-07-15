import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:sgnj/utils/firebase_anon_auth.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import 'loginPage.dart';

class Info extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _InfoState();
  }
}

class _InfoState extends State<Info> {
  FirebaseAnonAuth firebaseAuth = FirebaseAnonAuth();
  bool adminLoggedIn = false;

  final _scaffoldKey = GlobalKey<ScaffoldState>();


  _InfoState() {
    firebaseAuth.isLoggedIn().then((user) {
      if (user != null && user.uid != null && user.uid != "") {
        if (user.isAnonymous == false) {
          setState(() {
            adminLoggedIn = true;
          });
        }
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        key: _scaffoldKey,
        appBar: AppBar(
          backgroundColor: Colors.blueAccent,
          title: Text("Info"),
          actions: <Widget>[
            adminLoggedIn == false
                ? FlatButton.icon(
                    icon: Icon(Icons.lock),
                    splashColor: Colors.white,
                    label: Text('Login'),
                    textColor: Colors.white,
                    onPressed: () async {
                      final result = await Navigator.push(
                          context,
                          new MaterialPageRoute(
                              builder: (context) => LoginPage()));
                      if (result == true) {
                        setState(() {
                          adminLoggedIn = true;
                        });
                        _scaffoldKey.currentState.showSnackBar(SnackBar(
                              backgroundColor: Colors.greenAccent,
                              content: Text(
                                "Admin Logged-In Successfully..!",
                                style: TextStyle(color: Colors.black),
                              )));
                      }
                    },
                  )
                : FlatButton.icon(
                    icon: Icon(Icons.lock_open),
                    label: Text('Logout'),
                    splashColor: Colors.white,
                    textColor: Colors.white,
                    onPressed: () {
                      firebaseAuth.signOut().then((data) {
                        setState(() {
                          adminLoggedIn = false;
                        });
                        _scaffoldKey.currentState.showSnackBar(SnackBar(
                              content: Text(
                                "Admin Logged-Out!",
                              )));
                      });
                    },
                  )
          ],
        ),
        body: Center(
          child: infoPageContent(context),
        ));
  }

  Widget infoPageContent(BuildContext context) {
    return StreamBuilder<QuerySnapshot>(
      stream: Firestore.instance.collection("contacts").snapshots(),
      builder: (BuildContext context, AsyncSnapshot snapshot) {
        if (!snapshot.hasData) {
          return CircularProgressIndicator();
        } else {
          return renderLinkList(snapshot);
        }
      },
    );
  }

  renderLinkList(AsyncSnapshot<QuerySnapshot> snapshot) {
    return CustomScrollView(
      slivers: <Widget>[
        SliverList(
          delegate: SliverChildBuilderDelegate((context, index) {
            return Card(
              child: new Container(
                  padding: EdgeInsets.all(10.0),
                  child: Column(
                    children: <Widget>[
                      Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: <Widget>[
                          Column(
                            mainAxisAlignment: MainAxisAlignment.end,
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: <Widget>[
                              contactIcon(),
                            ],
                          ),
                          Expanded(
                              child: Column(
                            mainAxisAlignment: MainAxisAlignment.start,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: <Widget>[
                              Text(snapshot.data.documents[index]["name"],
                                  style: TextStyle(
                                      fontSize: 18.0,
                                      fontWeight: FontWeight.bold)),
                              Text(snapshot.data.documents[index]["number"])
                              //  displayTeams(snapshot.data.documents[index]["teams"]),
                            ],
                          )),
                          Column(
                            mainAxisAlignment: MainAxisAlignment.end,
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: <Widget>[
                              openButton(
                                  snapshot.data.documents[index]["number"]),
                            ],
                          )
                        ],
                      ),
                      moreInfo(snapshot.data.documents[index]["info"])
                    ],
                  )),
            );
          }, childCount: snapshot.data.documents.length),
        )
      ],
    );
  }

  moreInfo(info) {
    return Row(
      children: <Widget>[
        Expanded(
          child: Text(info),
        )
      ],
    );
  }

  openButton(url) {
    return Container(
        padding: EdgeInsets.all(10.0),
        child: InkWell(
            onTap: () {
              _launchURL(Uri.encodeFull(url));
            },
            child: Image.asset(
              "assets/images/call.png",
              width: 30,
            )));
  }

  contactIcon() {
    return Container(
        padding: EdgeInsets.all(10.0),
        child: Image.asset(
          "assets/images/contact.png",
          width: 30,
        ));
  }

  _launchURL(url) async {
    if (await canLaunch("tel://" + url)) {
      await launch("tel://" + url);
    } else {
      throw 'Could not launch $url';
    }
  }
}
