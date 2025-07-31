import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator, // Import ActivityIndicator for loading state
  Alert // Import Alert for user feedback
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/useAuthStore';

type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
  retypePassword: string;
};

const SignUpScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Required'),
    retypePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required')
  });

  const router = useRouter();
  const { registerUser, isSigningUp, redirect } = useAuthStore();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <ImageBackground
          source={require("../../assets/images/food-bg.jpg")}
          style={styles.backgroundImage}
          imageStyle={styles.imageStyle}
          resizeMode="cover"
        >
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.push("/(auth)")}>
              <Icon name="arrow-back-ios" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.subtitle}>Please sign up to get started</Text>
          </View>

          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              retypePassword: ''
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values: SignUpFormValues) => {
              try {
                await registerUser({
                  full_name: values.name,
                  email: values.email,
                  password: values.password
                });
                if(redirect) router.replace("/(dashboard)");

              } catch (error: any) {
                console.error('Sign Up Error:', error);
                Alert.alert('Sign Up Failed', error.message || 'Something went wrong. Please try again.');
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.formContainer}>
                  <Text style={styles.label}>NAME</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="John Doe"
                      placeholderTextColor="#A0A0A0"
                      value={values.name}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      returnKeyType="next"
                      autoCapitalize="words"
                    />
                  </View>
                  {touched.name && errors.name && (
                    <Text style={styles.errorText}>{errors.name}</Text>
                  )}

                  <Text style={styles.label}>EMAIL</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="example@gmail.com"
                      placeholderTextColor="#A0A0A0"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      returnKeyType="next"
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}

                  {/* Password Input */}
                  <Text style={styles.label}>PASSWORD</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="********"
                      placeholderTextColor="#A0A0A0"
                      secureTextEntry={!showPassword}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      returnKeyType="next"
                      autoCapitalize='none'
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeIcon}
                    >
                      <Icon
                        name={showPassword ? 'visibility' : 'visibility-off'}
                        size={24}
                        color="#888"
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}

                  {/* Re-type Password Input */}
                  <Text style={styles.label}>RE-TYPE PASSWORD</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="********"
                      placeholderTextColor="#A0A0A0"
                      secureTextEntry={!showRetypePassword}
                      value={values.retypePassword}
                      onChangeText={handleChange('retypePassword')}
                      onBlur={handleBlur('retypePassword')}
                      returnKeyType="done"
                      autoCapitalize='none'
                    />
                    <TouchableOpacity
                      onPress={() => setShowRetypePassword(!showRetypePassword)}
                      style={styles.eyeIcon}
                    >
                      <Icon
                        name={showRetypePassword ? 'visibility' : 'visibility-off'}
                        size={24}
                        color="#888"
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.retypePassword && errors.retypePassword && (
                    <Text style={styles.errorText}>{errors.retypePassword}</Text>
                  )}

                  <TouchableOpacity
                    style={styles.signUpButton}
                    onPress={handleSubmit} // Triggers Formik's onSubmit
                    activeOpacity={0.8}
                    disabled={isSigningUp} // Button is disabled while signing up
                  >
                    {isSigningUp ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.signUpButtonText}>SIGN UP</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </Formik>
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Fallback color if image not loaded
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30, // Extra space when keyboard is open
  },
  header: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  formContainer: {
    flex: 1,
    width: '90%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    marginTop: 30,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    marginTop: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F5F8',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 10,
  },
  signUpButton: {
    backgroundColor: '#FF7F39',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: { // Added style for error messages
    color: "red",
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 5,
  }
});

export default SignUpScreen;
