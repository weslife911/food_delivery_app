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
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/useAuthStore';

type verify = {
  email: string
}

// Define the type for the form values

const VerifyEmailScreen = () => {

  const VerifySchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required')
  });

  const router = useRouter();
  const { isVerifyingEmail, verifyEmail, token, redirect } = useAuthStore();

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
            initialValues={{ email: "" }}
            validationSchema={VerifySchema}
            onSubmit={async (values: verify) => {
              await verifyEmail({
                email: values.email
              });
              if(token) router.replace(`/(auth)/reset?token=${token}`);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
              <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.header}>
                  <TouchableOpacity style={styles.backButton} onPress={() => router.push("/(auth)")}>
                    <Icon name="arrow-back-ios" size={24} color="#fff" />
                  </TouchableOpacity>
                  <Text style={styles.title}>Verify Email</Text>
                  <Text style={styles.subtitle}>Please verify your email to rest your password</Text>
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
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      returnKeyType="next"
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}

                


                  <Pressable
                    style={({ pressed }) => [
                      styles.loginButton,
                      pressed && styles.buttonPressed
                    ]}
                    onPress={handleSubmit}
                    disabled={isVerifyingEmail}
                  >
                    {isVerifyingEmail ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.loginButtonText}>VERIFY EMAIL</Text>
                    )}
                  </Pressable>


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
    textAlign: "center"
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
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 8,
  },
});

export default VerifyEmailScreen;