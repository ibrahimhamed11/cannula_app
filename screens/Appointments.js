import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import CustomPicker from '../components/CustomPicker ';
import StepIndicator from '../components/StepIndicator ';
const AppointmentsScreen = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [timeSlots, setTimeSlots] = useState([
    { day: 'الأحد', examinationDuration: '', appointments: [{ from: '', to: '' }] },
    { day: 'الاثنين', examinationDuration: '', appointments: [{ from: '', to: '' }] },
    { day: 'الثلاثاء', examinationDuration: '', appointments: [{ from: '', to: '' }] },
    { day: 'الأربعاء', examinationDuration: '', appointments: [{ from: '', to: '' }] },
    { day: 'الخميس', examinationDuration: '', appointments: [{ from: '', to: '' }] },
    { day: 'الجمعة', examinationDuration: '', appointments: [{ from: '', to: '' }] },
    { day: 'السبت', examinationDuration: '', appointments: [{ from: '', to: '' }] },
  ]);
  const [appointmentData, setAppointmentData] = useState([
    {
      day: 'Sat',
      examinationDuration: '',
      appointments: [{ from: '', to: '' }]
    },
    {
      day: 'Sun',
      examinationDuration: '',
      appointments: [{ from: '', to: '' }]
    },
    {
      day: 'Mon',
      examinationDuration: '',
      appointments: [{ from: '', to: '' }]
    },
    {
      day: 'Tue',
      examinationDuration: '',
      appointments: [{ from: '', to: '' }]
    },
    {
      day: 'Wed',
      examinationDuration: '',
      appointments: [{ from: '', to: '' }]
    },
    {
      day: 'Thu',
      examinationDuration: '',
      appointments: [{ from: '', to: '' }]
    },
    {
      day: 'Fri',
      examinationDuration: '',
      appointments: [{ from: '', to: '' }]
    },
  ]);

  const generateTimePickerItems = () => {
    const items = [];
    for (let i = 1; i <= 12; i++) {
      items.push({ label: `${i}:00 ص`, value: `${i}:00AM` });
    }
    for (let i = 1; i <= 8; i++) {
      items.push({ label: `${i + 12}:00 م`, value: `${i + 12}:00PM` });
    }
    return items;
  };
  const timePickerItems = generateTimePickerItems();
  const examTimeItems = [
    { label: '15 دقيقة', value: '15' },
    { label: '30 دقيقة', value: '30' },
    { label: '60 دقيقة', value: '60' },
  ];
  const handleTogglePicker = (index) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index].showPicker = !updatedTimeSlots[index].showPicker;
    setTimeSlots(updatedTimeSlots);
  };

  const handleChangeTime = (index, slotIndex, key, value) => {
    const updatedAppointmentData = [...appointmentData];
    updatedAppointmentData[index].appointments[slotIndex][key] = value;
    setAppointmentData(updatedAppointmentData);
  };
  
  const handleAddSlot = (index) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index].appointments.push({ from: '', to: '' });
    setTimeSlots(updatedTimeSlots);
  };
  const handleRemoveSlot = (index, slotIndex) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index].appointments.splice(slotIndex, 1);
    setTimeSlots(updatedTimeSlots);
  };

  const handleExamTimeChange = (index, value) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index].examinationDuration = value;
    setTimeSlots(updatedTimeSlots);
  };

  const handleNextStep = () => {
    const nextStep = activeStep + 1;
    setActiveStep(Math.min(nextStep, 1));
  
  
   
  };
  
  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
      <StepIndicator activeStep={activeStep} headerText="المواعيد المتاحه"  setActiveStep={setActiveStep} />

      {timeSlots.map((timeSlot, index) => (
        <View key={index} style={styles.timeSlotRow}>
          <View style={styles.dayContainer}>
            <Text style={styles.dayText}>{timeSlot.day}</Text>
            <Switch
              value={timeSlot.showPicker}
              onValueChange={() => handleTogglePicker(index)}
              trackColor={{ false: "#D5CDCD", true: "#4cb6d3" }}
              thumbColor={"#f4f3f4"}
              ios_backgroundColor="#8D8888"
              style={styles.switch}
              thumbStyle={{ height: 16, width: 16, borderRadius: 8 }}
            />
          </View>
          {timeSlot.showPicker && (
            <View style={styles.customPickerContainer}>
              {timeSlot.appointments.map((slot, slotIndex) => (
                <View key={slotIndex} style={styles.slotContainer}>
                  <CustomPicker
                    label="من*"
                    value={slot.from}
                    onValueChange={(value) => handleChangeTime(index, slotIndex, 'from', value)}
                    items={timePickerItems}
                    width={'50%'}
                    labelFontSize={15}
                    labelOpacity={0.5}
                    style={{ textAlign: 'right' }}
                  />
                  <CustomPicker
                    label="الي*"
                    value={slot.to}
                    onValueChange={(value) => handleChangeTime(index, slotIndex, 'to', value)}
                    items={timePickerItems}
                    width={'48%'}
                    labelFontSize={15}
                    labelOpacity={0.5}
                    style={{ textAlign: 'right' }}
                  />
                </View>
              ))}
              <View style={styles.examTimeContainer}>
                <CustomPicker
                  label="مدة الكشف*"
                  value={timeSlot.examinationDuration}
                  onValueChange={(value) => handleExamTimeChange(index, value)}
                  items={examTimeItems}
                  width={'100%'}
                  labelFontSize={15}
                  labelOpacity={0.5}
                  style={{ textAlign: 'right' }}
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleAddSlot(index)} style={styles.plusButton}>
                  <Text style={styles.plusButtonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleRemoveSlot(index, timeSlot.appointments.length - 1)}
                  style={[
                    styles.minusButton,
                    timeSlot.appointments.length === 1 && styles.disabledButton
                  ]}
                  disabled={timeSlot.appointments.length === 1}
                >
                  <Text style={styles.minusButtonText}>-</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {index < timeSlots.length - 1 && <View style={styles.horizontalLine} />}
        </View>
      ))}

     
        <TouchableOpacity onPress={handleNextStep} style={styles.nextButton}>
        <Text style={styles.stepText}>{activeStep === 0 ? 'التالي' : 'تاكيد'}</Text>
        </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  timeSlotRow: {
    flexDirection: 'column',
    marginTop: 10,
  },
  dayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '7%',
  },
  dayText: {
    fontFamily: 'Droid',
    fontSize: 18,
    marginRight: 10,
    color:'#000000'
  },
  customPickerContainer: {
    flexDirection: 'column',
  },
  slotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  examTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  examTimeText: {
    fontFamily: 'Droid',
    fontSize: 16,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  plusButton: {
    backgroundColor: '#4cb6d3',
    width: 30,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  plusButtonText: {
    color: 'white',
    fontSize: 20,
  },
  minusButton: {
    backgroundColor: 'red',
    width: 30,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  minusButtonText: {
    color: 'white',
    fontSize: 20,
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  horizontalLine: {
    borderBottomColor: '#D5CDCD',
    borderBottomWidth: 0.8,
    marginVertical: 7,
  },
  nextButton: {
    backgroundColor: '#4cb6d3',
    width: '100%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom:'10%'

  },
  stepText: {
    color: 'white',
    fontSize: 15,
    fontFamily:'Droid',

  },
});

export default AppointmentsScreen;