import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import AppHeader from '../components/AppHeader';
import db from '../config';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      all_students: [],
      presentList: [],
      absentList: [],
      pressedButtonIndex :'',
    };
  }

  componentDidMount = async () => {
    var class_ref = await db.ref('/').on('value', (data) => {
      var all_students = [];
      var class_a = data.val();
      for (var i in class_a) {
        all_students.push(class_a[i]);
      }
      all_students.sort(function (a, b) {
        return a.roll_no - b.roll_no;
      });
      this.setState({ all_students: all_students })
    console.log(all_students)
    });
  };

  updateAttendence(roll_no, status) {
    var id = ' ';
    if (roll_no <= 9) {
      id = '0' + roll_no;
    } else {
      id = roll_no;
    }

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
    var ref_path = id;
    var class_ref = db.ref(ref_path);
    class_ref.update({
      [today]: status,
    });
  }

  afterSubmit = () => {
    this.props.navigation.navigate('SummaryScreen');
  };

  render() {
    var all_students = this.state.all_students;
    return (
      <View>
        <View>
          <AppHeader />
        </View>

        <View>
          {all_students.map((student, index) => (
            <View key={index}>
              <View key={'name' + index}>
                <Text style={[styles.roll]}>{student.roll_no}.</Text>
                <Text style={[styles.name]}>{student.name}</Text>

                <View>
                  <TouchableOpacity
                    style={[styles.present]}
                    onPress={() => {
                      var presentList = this.state.presentList;
                      presentList.push(index);
                      this.setState({
                        presentList: presentList,
                      });
                      var roll_no = index + 1;
                      this.updateAttendence(roll_no, 'present');
                    }}>
                    <Text>Present</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.absent]}
                  onPress={() => {
                      var absentList = this.state.absentList;
                      absentList.push(index);
                      this.setState({
                        absentList: absentList,
                      });
                      var roll_no = index + 1;
                      this.updateAttendence(roll_no, 'absent');}}
                      >
                    <Text>Absent</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          <View>
            <TouchableOpacity
              style={[styles.submit]}
              onPress= {() => {
                this.afterSubmit()
              }}>
              <Text style={[styles.submitT]}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  present: {
    marginTop: -20,
    marginLeft: 170,
    marginBottom: -65,
    borderWidth: 3,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 23,
  },
  absent: {
    marginTop: 42,
    marginLeft: 250,
    marginBottom: -65,
    borderWidth: 3,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 23,
  },
  submit: {
    backgroundColor: 'yellow',
    marginTop: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitT: {
    fontSize: 20,
    fontFamily: 'bold',
    textAlign: 'center',
    fontStyle: 'cursive',
  },
  roll: {
    fontSize: 15,
    marginTop: 40,
    marginLeft: 30,
  },
  name: {
    fontSize: 15,
    marginTop: -20,
    marginLeft: 45,
  },
});
