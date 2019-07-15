import 'dart:async';
import 'dart:io';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:image_picker/image_picker.dart';
import 'package:sgnj/pages/gallery/photoView.dart';
import 'package:sgnj/utils/firebase_anon_auth.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';
import 'package:url_launcher/url_launcher.dart';
//import 'package:image_picker/image_picker.dart';

class Gallery extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _GalleryState();
  }
}

class _GalleryState extends State<Gallery> {
  final _scaffoldKey = GlobalKey<ScaffoldState>();

  FirebaseMessaging firebaseMessaging = new FirebaseMessaging();

  StreamSubscription<QuerySnapshot> subscription;
  List<DocumentSnapshot> wallpapersList;
  final CollectionReference collectionReference =
      Firestore.instance.collection("gallery");

  final FirebaseAnonAuth firebaseAnonAuth = new FirebaseAnonAuth();

  dynamic appConfig = {};

  String userId;
  bool isAdminLoggedIn = false;

  _GalleryState() {
    firebaseAnonAuth.isLoggedIn().then((user) {
      if (user != null && user.uid != null) {
        setState(() {
          this.userId = user.uid;
          if (user.isAnonymous == false) {
            isAdminLoggedIn = true;
          }
        });
      }
    });

    Firestore.instance
        .collection("app")
        .document("config")
        .snapshots()
        .listen((onData) {
      if (onData != null) {
        appConfig = onData.data;
      }
    });
  }

  @override
  void initState() {
    super.initState();
    subscription = collectionReference.snapshots().listen((datasnapshot) {
      setState(() {
        wallpapersList = datasnapshot.documents;
      });
    });
  }

  @override
  void dispose() {
    subscription?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        key: _scaffoldKey,
        appBar: new AppBar(
          title: Text("Gallery"),
          backgroundColor: Colors.blueAccent,
          actions: <Widget>[
            isAdminLoggedIn
                ? IconButton(
                    icon: Icon(Icons.add),
                    tooltip: 'Add Photo',
                    onPressed: () {
                      //addPhoto();
                      //_optionsDialogBox();
                      openGallery();
                    },
                  )
                : FlatButton.icon(
                    icon: Icon(Icons.send),
                    splashColor: Colors.white,
                    label: Text('Add photos'),
                    textColor: Colors.white,
                    onPressed: () async {
                      _scaffoldKey.currentState.showSnackBar(SnackBar(
                          backgroundColor: Colors.amber,
                          content: Text(
                            appConfig["submit_photos_message"] != null
                                ? appConfig["submit_photos_message"]
                                : 'Send us your photos on whatsapp. We will add them to the gallery once reviewed!',
                            style: TextStyle(color: Colors.black),
                          )));
                      if (appConfig["submit_photos"] != null ||
                          appConfig["submit_photos_backup"] != null) {
                        try {
                          if (await canLaunch(
                              Uri.encodeFull(appConfig["submit_photos"]))) {
                            _launchURL(
                                Uri.encodeFull(appConfig["submit_photos"]));
                          } else if (await canLaunch(Uri.encodeFull(
                              appConfig["submit_photos_backup"]))) {
                            _launchURL(Uri.encodeFull(
                                appConfig["submit_photos_backup"]));
                          }
                        } catch (e) {
                          _launchURL(Uri.encodeFull(
                              "https://web.whatsapp.com/send?phone=14123453825&text=&source=&data="));
                        }
                      } else {
                        _launchURL(Uri.encodeFull(
                            "https://web.whatsapp.com/send?phone=14123453825&text=&source=&data="));
                      }
                    },
                  )
          ],
        ),
        body: wallpapersList != null
            ? new StaggeredGridView.countBuilder(
                padding: const EdgeInsets.all(8.0),
                crossAxisCount: 4,
                itemCount: wallpapersList.length,
                itemBuilder: (context, i) {
                  return new Material(
                    elevation: 8.0,
                    borderRadius:
                        new BorderRadius.all(new Radius.circular(8.0)),
                    child: new InkWell(
                      onTap: () {
                        Navigator.push(
                            context,
                            new MaterialPageRoute(
                                builder: (context) =>
                                    PhotoViewer(i, isAdminLoggedIn)));
                      },
                      child: new Hero(
                        tag: wallpapersList[i].documentID,
                        child: new FadeInImage(
                          image:
                              new NetworkImage(wallpapersList[i].data['url']),
                          fit: BoxFit.cover,
                          placeholder:
                              new AssetImage("assets/images/placeholder.png"),
                        ),
                      ),
                    ),
                  );
                },
                staggeredTileBuilder: (i) =>
                    new StaggeredTile.count(2, i.isEven ? 2 : 3),
                mainAxisSpacing: 8.0,
                crossAxisSpacing: 8.0,
              )
            : new Center(
                child: new CircularProgressIndicator(),
              ));
  }

  _launchURL(url) async {
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch $url';
    }
  }

  Future openGallery() async {
    //var picture = "openGallery";
    File picture = await ImagePicker.pickImage(source: ImageSource.gallery);
    uploadImageToStorage(picture);
  }

  uploadImageToStorage(File picture) async {
    List<String> fileNameSplit = picture.toString().split(".");
    String fileName = DateTime.now().toString() +
        "." +
        fileNameSplit[fileNameSplit.length - 1];
    fileName = fileName.split("'")[0];
    final StorageReference firebaseStorageRef =
        FirebaseStorage.instance.ref().child("2019/" + fileName);
    final StorageUploadTask storageUploadTask =
        firebaseStorageRef.putFile(picture);

    final StorageTaskSnapshot downloadUrl =
        (await storageUploadTask.onComplete);
    final String url = (await downloadUrl.ref.getDownloadURL());
    if (url != null) {
      saveLinkToFireStore(url);
    } else {
       _scaffoldKey.currentState.showSnackBar(SnackBar(
        backgroundColor: Colors.redAccent,
        content: Text(
          "Uploaded Failed!",
          style: TextStyle(color: Colors.white),
        )));
    }
  }

  saveLinkToFireStore(String url) async {
    await Firestore.instance.collection("gallery").add({
      "url": url,
    });

    _scaffoldKey.currentState.showSnackBar(SnackBar(
        backgroundColor: Colors.amber,
        content: Text(
          "Uploaded Successfully..!",
          style: TextStyle(color: Colors.black),
        )));
  }
}
