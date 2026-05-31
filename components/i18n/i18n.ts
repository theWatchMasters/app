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
        error: {
          generic: 'An unexpected error occured',
          invalid_credentials: 'The email or password is incorrect',
          duplicate_credentials: 'An account with this email already exists',
          invalid_2fa: 'The 2FA code is invalid',
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
        mfa: {
          headings: {
            text1: 'Enter your 2FA Code',
            text2:
              'Using your preferred authenticator app, enter the 6-digit code below',
            code: 'Code',
          },
          placeholders: {
            code: '000000',
          },
          errors: {
            'code-minLength': 'The code is too short',
            'code-maxLength': 'The code is too long',
            'code-required': 'The code is required',
            'code-invalid': 'The code is invalid',
            heading: 'Login Error',
            network_failure: 'There was an error submitting the form',
          },
        },
        vault_new: {
          headings: {
            text1: 'Enter task details',
            text2: 'Fill in the details of the task you want to track',
            title: "Title",
            amount: "Amount ($)",
            length: "Task Length"
          },
          continue: 'Continue',
          placeholders: {
            title: 'Title...'
          },
          errors: {
            'title-maxLength': 'The title is too long',
            'amount-required': 'The amount is required',
            'length-required': 'The task length is required',
            heading: 'Task Creation Error',
            network_failure: 'There was an error submitting the form',
          },
        },
      },
    },
  },
});
