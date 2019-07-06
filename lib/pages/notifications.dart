import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:sgnj/utils/timeAgoCalculator.dart';

class Notifications extends StatefulWidget{
  
  @override
  State<StatefulWidget> createState() {
    return _NotificationsState();
  }

}

class _NotificationsState extends State<Notifications>{

  FirebaseMessaging firebaseMessaging = new FirebaseMessaging();
  TimeAgoCalculator timeAgo = new TimeAgoCalculator();
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('Notifications'),
          backgroundColor: Colors.blueAccent,
        ),
        body: Center(
        child: notificationsList(context),
    ));
  }

  Widget notificationsList(BuildContext context) {
    return StreamBuilder<QuerySnapshot>(
      stream: Firestore.instance.collection("notifications").snapshots(),
      builder: (BuildContext context, AsyncSnapshot snapshot) {
        if(!snapshot.hasData){
          return CircularProgressIndicator();
        } else {
          return renderNotificationsList(snapshot);
        }
      },
    );
  }

  renderNotificationsList(AsyncSnapshot<QuerySnapshot> snapshot){
      return CustomScrollView(
        slivers: <Widget>[
          SliverList(
            delegate: SliverChildBuilderDelegate((context, index) {
              return Card(
                child: new Container(
                  padding: EdgeInsets.all(10.0),
                  child: new Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: <Widget>[
                      Column(
                        mainAxisAlignment: MainAxisAlignment.end,
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: <Widget>[
                          notificationIcon(),
                        ],
                      ),
                      Expanded(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.start,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            Row(
                              children: <Widget>[
                                Expanded(
                                  child: Text(snapshot.data.documents[index]["title"],
                                  style: TextStyle(
                                    fontSize: 16.0,
                                    fontWeight: FontWeight.bold
                                  )),
                                ),
                                displayTimeAgo(snapshot.data.documents[index]["timestamp"])
                              ],
                            ),
                            Text(snapshot.data.documents[index]["body"]),
                          ],
                        )
                      )
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

  displayTimeAgo(Timestamp timestamp){
    return timestamp != null ? Text(
            timeAgo.calculate(timestamp.toDate()),
            style: TextStyle(
              fontStyle: FontStyle.italic
            ),
          ) : Text("");
  }

  notificationIcon(){
    return Container(
      padding: EdgeInsets.all(10.0),
      child: Image.asset(
                 "assets/images/notification.png",
                width: 30,
              ));
  }

}