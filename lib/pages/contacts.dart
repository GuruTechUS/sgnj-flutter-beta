import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:sgnj/utils/firebase_anon_auth.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class Contacts extends StatefulWidget{

  @override
  State<StatefulWidget> createState() {
    return _ContactsState();
  }
}


class _ContactsState extends State<Contacts> {

  FirebaseAnonAuth firebaseAuth = FirebaseAnonAuth();
  bool adminLoggedIn = false;

  _ContactsState()  {
    // firebaseAuth.isLoggedIn().then((user){
    //   if(user !=null && user.uid != null && user.uid != ""){
    //     if(user.isAnonymous == false){
    //       setState(() { 
    //           adminLoggedIn = true;
    //       });
    //     }
    //   }
    // });
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.blueAccent,
          title:  Text("Contacts"),
        ),
        body: Center(
        child: infoPageContent(context),
    ));
  }

  Widget infoPageContent(BuildContext context) {
    return StreamBuilder<QuerySnapshot>(
      stream: Firestore.instance.collection("contacts").snapshots(),
      builder: (BuildContext context, AsyncSnapshot snapshot) {
        if(!snapshot.hasData){
          return CircularProgressIndicator();
        } else {
          return renderLinkList(snapshot);
        }
      },
    );
  }

  renderLinkList(AsyncSnapshot<QuerySnapshot> snapshot){
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
                                  fontWeight: FontWeight.bold
                                )),
                                Text(snapshot.data.documents[index]["number"])
                              //  displayTeams(snapshot.data.documents[index]["teams"]),
                              ],
                            )
                          ),
                            Column(
                            mainAxisAlignment: MainAxisAlignment.end,
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: <Widget>[
                              openButton(snapshot.data.documents[index]["number"]),
                            ],
                          )
                        ],
                      ),
                      moreInfo(snapshot.data.documents[index]["info"])
                    ],
                  )
                   
                ),
              );
            },
            childCount: snapshot.data.documents.length
            ),
          )
        ],
      );
  }

  moreInfo(info){
    return Row(
      children: <Widget>[
         Expanded(
          child: Text(info),
        )
      ],
    );
  }

  openButton(url){
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

  contactIcon(){
    return Container(
      padding: EdgeInsets.all(10.0),
      child: Image.asset(
                 "assets/images/contact.png",
                width: 30,
              ));
  }

  _launchURL(url) async {
    if (await canLaunch("tel:"+url)) {
      await launch("tel:"+url);
    } else {
      throw 'Could not launch $url';
    }
  }

}
  