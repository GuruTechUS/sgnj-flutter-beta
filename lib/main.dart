import 'package:firebase_analytics/firebase_analytics.dart';
import 'package:firebase_analytics/observer.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'appNavBar.dart';
import 'package:firebase_messaging/firebase_messaging.dart';

void main() {
  SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp])
    .then((_) {
     runApp(
        MaterialApp(
          title: 'Sikh Games of NJ',
          debugShowCheckedModeBanner: false,
          navigatorObservers: [
            FirebaseAnalyticsObserver(analytics: FirebaseAnalytics()),
          ],
          theme: new ThemeData(
            primarySwatch: Colors.blue,
          ),
          home: MyApp(),
        )
      );
    });
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {

  final FirebaseMessaging _firebaseMessaging = FirebaseMessaging();

  @override
  void initState() {
    _firebaseMessaging.configure(
      onLaunch: (Map<String,dynamic> msg){
        print("onLaunch called");
        return Future<dynamic>.value(msg);
      },
      onMessage: (Map<String,dynamic> msg){
        print("onMessage called");
        return Future<dynamic>.value(msg);
      },
      onResume: (Map<String,dynamic> msg){
        print("onResume called");
        return Future<dynamic>.value(msg);
      }
    );
    _firebaseMessaging.requestNotificationPermissions(
      const IosNotificationSettings(
        sound: true,
        alert: true,
        badge: true
      )
    );
    _firebaseMessaging.onIosSettingsRegistered.listen((IosNotificationSettings setting){
      print("iOS settings registered");
    });
    _firebaseMessaging.getToken().then((token) {
      update(token);
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return AppNavBar();
  }

  void update(String token) {
  }
}
