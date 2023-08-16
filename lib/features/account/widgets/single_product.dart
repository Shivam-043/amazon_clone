import 'package:flutter/material.dart';

class SingleProduct extends StatelessWidget {
  final String link;
  const SingleProduct({Key? key , required this.link}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 5),
      child: DecoratedBox(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(5),
          border: Border.all(
            color: Colors.black12,
            width: 1.5
          )
        ),
        child: Container(
          child: Image.network(link , fit: BoxFit.fitHeight, width: 180),
        ),
      )
    );
  }
}
