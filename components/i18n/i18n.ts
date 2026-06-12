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
          missing_fields: 'Some required fields are missing',
          internal_server_error: 'An error occurred on the server. Please try again later.',
          user_not_found: 'This user is not found',
          "2fa_already_enabled": "2FA is already enabled for this account",
          "2fa_not_initiated": "2FA enrollment has not been initiated for this account",
          invalid_mfa_code: 'The 2FA code is invalid',
          invalid_or_expired_token: 'The authentication token is invalid or has expired. Try logging in again.',
          active_task_exists: 'You already have an active task. Please submit proof or forfeit it before starting a new one.',
          invalid_fields: 'Some fields are invalid. Please check your input and try again.',
          invalid_page: 'The page you are looking for does not exist.',
          task_not_found: 'The task you are looking for does not exist.',
          task_already_completed: 'This task has already been completed.',
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
            heading: 'Registration Error',
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
        mfa_request: {
          headings: {
            text1: 'Do you want to sign up for 2FA?',
            text2:
              '2FA helps improve the security of your account by requiring a separate authentication code.\n<2>It is required for payment-related features</2>',
          },
          options: {
            enroll: 'Enroll',
            continue: 'Continue',
          },
        },
        mfa_register: {
          headings: {
            text1: 'Set up 2FA',
            text2: 'Click the button below to enroll in 2FA with your authenticator app. Alternatively, you can scan the QR code <1>with another device</1> to enroll with 2FA on that device.',
            other_device: 'Set up on another device',
            authenticator: 'Link to Authenticator App',
            continue: 'Continue',
          },
          errors: {
              heading: '2FA Enrollment Error',
              network_failure: 'There was an error submitting the form'
          }
        },
        mfa_register_code: {
          headings: {
            text2: 'Enter the 6-digit code generated by your authenticator app to complete enrollment',
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
            heading: '2FA Enrollment Error',
            network_failure: 'There was an error submitting the form',
          }
        },
        vault_new: {
          headings: {
            text1: 'Enter task details',
            text2: 'Fill in the details of the task you want to track',
            title: 'Title',
            amount: 'Amount ($)',
            length: 'Task Length',
          },
          continue: 'Continue',
          placeholders: {
            title: 'Title...',
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
