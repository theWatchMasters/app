import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        errors: {
          generic: 'An unexpected error occured',
        },
        login: {
          headings: {
            text1: 'Sign In',
            text2: 'Login to your account below',
            email: 'Email',
            password: 'Password',
          },
          forgot_password: 'Forgot your password?',
          continue: 'Continue',
          sign_up: {
            '1': "Don't have an account?",
            '2': 'Sign up',
          },
          placeholders: {
            email: 'Email...',
            password: 'Password...',
            submit: 'Submit',
          },
          errors: {
            'email-minLength': 'The email is too short',
            'email-maxLength': 'The email is too long',
            'email-required': 'The email is required',
            'email-invalid': 'The email is invalid',
            'password-minLength': 'The password is too short',
            'password-maxLength': 'The password is too long',
            'password-required': 'The password is required',
            'password-invalid': 'The password is invalid',
            heading: 'Login Error',
            network_failure: 'There was an error submitting the form',
          },
        },
        register: {
          headings: {
            text1: 'Sign Up',
            text2: 'Create your account below',
            email: 'Email',
            password: 'Password',
          },
          forgot_password: 'Forgot your password?',
          continue: 'Continue',
          sign_in: {
            '1': 'Already have an account?',
            '2': 'Sign In',
          },
          placeholders: {
            email: 'Email...',
            password: 'Password...',
            submit: 'Submit',
          },
          errors: {
            'email-minLength': 'The email is too short',
            'email-maxLength': 'The email is too long',
            'email-required': 'The email is required',
            'email-invalid': 'The email is invalid',
            'password-minLength': 'The password is too short',
            'password-maxLength': 'The password is too long',
            'password-required': 'The password is required',
            'password-invalid': 'The password is invalid',
            heading: 'Login Error',
            network_failure: 'There was an error submitting the form',
          },
        },
      },
    },
  },
});
