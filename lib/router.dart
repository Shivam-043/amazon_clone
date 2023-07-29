import 'package:amazon_clone/features/auth/screen/auth_screen.dart';
import 'package:amazon_clone/home/screens/home_screen.dart';
import 'package:flutter/material.dart';

MaterialPageRoute generateRoutes(RouteSettings routeSettings) {
  switch (routeSettings.name) {
    case AuthScreen.routeName:
      return MaterialPageRoute(
          builder: (_) => AuthScreen(), settings: routeSettings);

    case HomeScreen.routeName:
      return MaterialPageRoute(
          builder: (_) => HomeScreen(), settings: routeSettings);

    default:
      return MaterialPageRoute(
          settings: routeSettings,
          builder: (_) => const Scaffold(
                body: Center(
                  child: Text("Screen 404 Error"),
                ),
              ));
  }
}
