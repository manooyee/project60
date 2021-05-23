import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import AppHeader from '../components/AppHeader';
import db from '../config';


export default class HomeScreen extends React.Component{
   constructor(){
    super();
    this.state = {
      presentStudentList : [],
      absentStudentList : [],
    };
  }


 componentDidMount(){
   var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth();

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = 0 + dd;
    }

    if (mm < 10) {
      mm = 0 + mm;
    }

    today = dd + '-' + mm + '-' + yyyy;

   var studentRef = db.ref('/');
   studentRef.on('value',(data)=>{
     var studentList = data.val()
     var presentStudentList = []
     var absentStudentList = []
     for(var student in studentList){
       if(studentList[student][today]=== 'present'){
         presentStudentList.push(studentList[student])
       }else absentStudentList.push(studentList[student])

       
    }
    this.setState({
      presentStudentList:presentStudentList,
      absentStudentList:absentStudentList
    })
   })
 }
  
  render(){
    return(
      <View>
      <AppHeader/>

      <Text style ={styles.text}>
      students present:{this.state.presentStudentList.length}
      </Text>

      <Text style ={styles.text}>
      students absent:{this.state.absentStudentList.length}
      </Text>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontFamily: 'bold',
    textAlign: 'center',
    fontStyle: 'cursive',
  },
})