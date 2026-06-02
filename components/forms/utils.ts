import { FieldErrors, FieldValues } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { IErrorResponse } from '../types/responses';

type ReactHookFormErrorHandler = ({
  response,
  error,
}:
  | {
      response: Response;
      error?: undefined;
    }
  | {
      response?: undefined;
      error: unknown;
    }) => Promise<void>;

export function handleError(
  translationKey: string,
  t: (arg0: string) => string,
): ReactHookFormErrorHandler {
  return async ({ response, error }) => {
    let errorText: string;
    if (error instanceof TypeError) {
      errorText = t(`${translationKey}.errors.network_failure`);
    } else if (response instanceof Response && response !== null) {
      try {
        errorText = t(((await response.json()) as IErrorResponse).error);
      } catch {
        errorText = t('error.generic');
      }
    } else {
      errorText = t('error.generic');
    }
    Toast.show({
      type: 'error',
      swipeable: true,
      autoHide: true,
      text1: t(`${translationKey}.errors.heading`),
      text2: errorText,
    });
  };
}

export function handleValidationError<T extends FieldValues>(
  translationKey: string,
  t: (arg0: string) => string,
): (errors: FieldErrors<T>) => void {
  return (errors) => {
    for (let i of Object.keys(errors) as (keyof typeof errors)[]) {
      if (typeof i !== 'string') continue;
      Toast.show({
        type: 'error',
        swipeable: true,
        autoHide: true,
        text1: t('register.errors.heading'),
        text2: t('register.errors.' + i + '-' + errors[i]?.type),
      });
    }
  };
}
