import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';

import 'package:http/http.dart' as http;

void main() => runApp(new MaterialApp(
  home: new HomePage(),
));


class HomePage extends StatefulWidget{

  @override
  HomePageState createState() => new HomePageState();

}

class HomePageState extends State<HomePage> {

  final String url = "https://pomber.github.io/covid19/timeseries.json";
  List data;

  @override
  void initState(){
    super.initState();
    this.getJsonData();
  }
  
  Future<String> getJsonData() async{
    var response = await http.get(
      // Encode the url
      Uri.encodeFull(url),
      // Accept json response
      headers: {"Accept": "application/json"}
    );

    print(response.body);

    setState(() {
      var convertDatatoJson = jsonDecode(response.body);
      data = convertDatatoJson['results'];
    });

    return "Success";
  }

  @override 
  Widget build(BuildContext context){
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("Retrieve JSON via HTTP Get"),
      ),
      
      body: new ListView.builder(
        itemCount: data == null ? 0 : data.length,
        itemBuilder: (BuildContext context, int index){
          return new Container(
            child: new Center(
              child: new Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: <Widget>[
                  new Card(
                    child :new Container(
                      child: new Text(data[index]['name']),
                      padding: const EdgeInsets.all(20.0),
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),

    );
  }
}


