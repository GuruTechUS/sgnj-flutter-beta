import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:image_downloader/image_downloader.dart';
import 'package:photo_view/photo_view.dart';
import 'package:photo_view/photo_view_gallery.dart';

class PhotoViewer extends StatefulWidget{
  
  final int initialIndex;
  final PageController pageController;
  
  PhotoViewer(this.initialIndex):
    pageController = PageController(initialPage: initialIndex);
  

  @override
  State<StatefulWidget> createState() {
    return _PhotoViewerState();
  }
}

class _PhotoViewerState extends State<PhotoViewer>{

  int currentIndex;
  List<DocumentSnapshot> imagesList;

  @override
  void initState() {
    currentIndex = widget.initialIndex;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.delete),
            tooltip: 'Delete',
            onPressed: () {
              deleteImageLink();
            },
          ),
          IconButton(
            icon: Icon(Icons.file_download),
            tooltip: 'Download',
            onPressed: () {
              downloadImageFile();
            },
          ),
        ],
      ),
      body: Container(
        decoration: BoxDecoration(
          color: Colors.black
        ),
        constraints: BoxConstraints.expand(
            height: MediaQuery.of(context).size.height,
        ),
        child:  imageListStream(context)
      ),
    );
  }

  Widget imageListStream(BuildContext context) {
    return StreamBuilder<QuerySnapshot>(
      stream: Firestore.instance.collection("gallery").snapshots(),
      builder: (BuildContext context, AsyncSnapshot snapshot) {
        if(!snapshot.hasData){
          return CircularProgressIndicator();
        } else {
          //return ListView(children: getExpenseItems(snapshot));
          return eventPageBody(snapshot);
        }
      },
    );
  }

  eventPageBody(AsyncSnapshot<QuerySnapshot> imagesListLocal){
    imagesList = imagesListLocal.data.documents;
    return Stack(
          alignment: Alignment.bottomRight,
          children: <Widget>[
            PhotoViewGallery.builder(
                scrollPhysics: const BouncingScrollPhysics(),
                builder: _buildItem,
                itemCount: imagesList.length,
                loadingChild: null,
                backgroundDecoration: const BoxDecoration(
                  color: Colors.black,
                ),
                pageController: widget.pageController,
                onPageChanged: onPageChanged,
              )
          ],
        );
  }

  void deleteImageLink(){
    int totalCount = imagesList.length;
    if(currentIndex == 0 && totalCount == 1){
      Firestore.instance.collection("gallery").document(imagesList[currentIndex].documentID).delete();
      Navigator.pop(context);
    } else if(currentIndex == 0 && totalCount > 1){
      Firestore.instance.collection("gallery").document(imagesList[currentIndex].documentID).delete();
    } else if (currentIndex > 0 && (totalCount - currentIndex) == 1){
      Firestore.instance.collection("gallery").document(imagesList[currentIndex].documentID).delete();
      currentIndex = currentIndex -1;
    }
    setState(() {
      
    });
  }

  void onPageChanged(int index) {
    setState(() {
      currentIndex = index;
    });
  }

  PhotoViewGalleryPageOptions _buildItem(BuildContext context, int index) {
    //final GalleryExampleItem item = widget.galleryItems[index];
    return  PhotoViewGalleryPageOptions(
            imageProvider: NetworkImage(imagesList[index].data['url']),
            initialScale: PhotoViewComputedScale.contained,
            //minScale: PhotoViewComputedScale.contained * (0.5 + index / 10),
            //maxScale: PhotoViewComputedScale.covered * 1.1,
            heroTag: imagesList[index].documentID,
          );
  }

  downloadImageFile() async {
    try {
      print("download start");
      // Saved with this method.
      print(imagesList[currentIndex].data['url']);
      var imageId =  await ImageDownloader.downloadImage(imagesList[currentIndex].data['url']);
      if (imageId == null) {
        return;
      } else if(imageId != null) {
        print("Download success");
        return;
      }

    } on Exception catch (error) {
      print("download failed"); 
      print(error);
    }
  }

}