import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  ActivityIndicator, // Import ActivityIndicator for loading state
  Alert // Import Alert for user feedback
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';
// Assuming useAuthStore has a loginUser function
import { useAuthStore } from '@/store/useAuthStore';


// Define the type for the form values
type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required')
  });

  const router = useRouter();
  const { loginUser, isLoggingIn, redirect } = useAuthStore();

  const handleForgotPassword = () => {
    router.push("/(auth)/verify");
  };

  const handleSignUp = () => {
    router.push("/(auth)/register");
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Attempting social login with: ${provider}`);
    Alert.alert('Social Login', `Social login with ${provider} is not yet implemented.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <ImageBackground
          source={require('../../assets/images/food-bg.jpg')}
          style={styles.backgroundImage}
          imageStyle={styles.imageStyle}
          resizeMode="cover"
        >
          <Formik
            initialValues={{ email: '', password: '', rememberMe: false }}
            validationSchema={LoginSchema}
            onSubmit={async (values: LoginFormValues) => {
              try {
                await loginUser({
                  email: values.email,
                  password: values.password
                });
                if(redirect) router.replace("/(dashboard)");
              } catch (error: any) {
                console.error('Login Error:', error);
                Alert.alert('Login Failed', error.message || 'Invalid credentials or something went wrong. Please try again.');
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
              <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.header}>
                  <Text style={styles.title}>Log In</Text>
                  <Text style={styles.subtitle}>Please sign in to your existing account</Text>
                </View>

                <View style={styles.formContainer}>
                  {/* Email Input */}
                  <Text style={styles.label}>EMAIL</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="example@gmail.com"
                      placeholderTextColor="#A0A0A0"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      value={values.email} // Use Formik's values
                      onChangeText={handleChange('email')} // Use Formik's handleChange
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
                      returnKeyType="done"
                      onSubmitEditing={handleSubmit}
                      autoCapitalize='none'
                    />
                    <Pressable
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeIcon}
                      hitSlop={10}
                    >
                      <Icon
                        name={showPassword ? 'visibility' : 'visibility-off'}
                        size={24}
                        color="#888"
                      />
                    </Pressable>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}

                  <View style={styles.optionsRow}>
                    <Pressable
                      style={styles.checkboxContainer}
                      onPress={() => setFieldValue('rememberMe', !values.rememberMe)} // Use setFieldValue for checkbox
                    >
                      <View style={[styles.checkbox, values.rememberMe && styles.checkedCheckbox]}>
                        {values.rememberMe && <Icon name="check" size={18} color="#fff" />}
                      </View>
                      <Text style={styles.rememberMeText}>Remember me</Text>
                    </Pressable>
                    <Pressable onPress={handleForgotPassword}>
                      <Text style={styles.forgotPasswordText}>Forgot Password</Text>
                    </Pressable>
                  </View>

                  <Pressable
                    style={({ pressed }) => [
                      styles.loginButton,
                      pressed && styles.buttonPressed
                    ]}
                    onPress={handleSubmit}
                    disabled={isLoggingIn} 
                  >
                    {isLoggingIn ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.loginButtonText}>LOG IN</Text>
                    )}
                  </Pressable>

                  <View style={styles.signUpSection}>
                    <Text style={styles.dontHaveAccountText}>{"Don't have an account?"} </Text>
                    <Pressable onPress={handleSignUp}>
                      <Text style={styles.signUpText}>SIGN UP</Text>
                    </Pressable>
                  </View>

                  <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.orText}>Or</Text>
                    <View style={styles.dividerLine} />
                  </View>

                  <View style={styles.socialButtonsContainer}>
                    <Pressable
                      style={({ pressed }) => [
                        styles.socialButton,
                        styles.facebookButton,
                        pressed && styles.buttonPressed
                      ]}
                      onPress={() => handleSocialLogin('Facebook')}
                    >
                      <FontAwesome name="facebook" size={24} color="#fff" />
                    </Pressable>
                    <Pressable
                      style={({ pressed }) => [
                        styles.socialButton,
                        styles.twitterButton,
                        pressed && styles.buttonPressed
                      ]}
                      onPress={() => handleSocialLogin('Twitter')}
                    >
                      <FontAwesome name="twitter" size={24} color="#fff" />
                    </Pressable>
                    <Pressable
                      style={({ pressed }) => [
                        styles.socialButton,
                        styles.appleButton,
                        pressed && styles.buttonPressed
                      ]}
                      onPress={() => handleSocialLogin('Apple')}
                    >
                      <Entypo name="app-store" size={24} color="#fff" />
                    </Pressable>
                  </View>
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
    backgroundColor: '#f5f5f5', // Fallback color
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
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
    marginTop: 20,
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
    paddingVertical: 12,
  },
  eyeIcon: {
    padding: 10,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkedCheckbox: {
    backgroundColor: '#FF7F39',
    borderColor: '#FF7F39',
  },
  rememberMeText: {
    fontSize: 14,
    color: '#555',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#FF7F39',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#FF7F39',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  signUpSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  dontHaveAccountText: {
    fontSize: 15,
    color: '#555',
  },
  signUpText: {
    fontSize: 15,
    color: '#FF7F39',
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  orText: {
    width: 50,
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  facebookButton: {
    backgroundColor: '#3B5998',
  },
  twitterButton: {
    backgroundColor: '#1DA1F2',
  },
  appleButton: {
    backgroundColor: '#000',
  },
  errorText: { // Added style for error messages
    color: "red",
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 5,
  }
});

export default LoginScreen;
