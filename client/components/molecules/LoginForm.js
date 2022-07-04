import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { useForm, Controller } from "react-hook-form";

export default function LoginForm() {
    const { control, handleSubmit, formState: { errors } } = useForm({
      defaultValues: {
        username: '',
        password: ''
      }
    });
    const onSubmit = data => {
     console.log(data)
    }
    return (
      <View>
        <Controller
        control={control}
        rules={{required: true}}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder='Username'
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="username"
        />
          {errors.username && <Text>Username is required.</Text>}
        <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 5
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder='Password'
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
        />
        {errors.password && <Text>Password is required.</Text>}
        <Pressable onPress={handleSubmit(onSubmit)} style={styles.button}>
            <Text style={styles.text}>Submit</Text>
        </Pressable>
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
        width: '80%',
        marginLeft: '10%',
        borderColor: 'black',
        borderWidth: '1px',
        marginTop: '10px',
        marginBottom: '10px'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 2,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'blue',
        width: '20%',
        marginLeft: '40%'
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      }
  });
  