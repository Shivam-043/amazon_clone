import 'package:amazon_clone/Constants/global_variables.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';

class CorouselImage extends StatelessWidget {
  const CorouselImage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CarouselSlider(items: GlobalVariables.carouselImages.map((e){
      return Builder(
        builder: (BuildContext context) => Image.network(e, fit: BoxFit.fitHeight));
    }).toList(), options: CarouselOptions(
      viewportFraction: 1,
      height: 200
    ));
  }
}
