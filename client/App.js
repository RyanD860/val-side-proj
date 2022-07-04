import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import {getUserInfo} from './axios'
import UserLookupForm from './components/molecules/UserLookupForm'
import LoginForm from './components/molecules/LoginForm'

export default function App() {
  return (
    <LoginForm/>
   /* <UserLookupForm/> */
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
