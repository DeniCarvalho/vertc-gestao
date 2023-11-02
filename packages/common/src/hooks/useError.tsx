import { errors } from '../constants/errors';

type ErrorType = {
  message: string;
  code: number;
  details?: any;
};

export default function useError() {
  function error(err: any): ErrorType {
    const defaultError = {
      message: 'Tente novamente mais tarde.',
      code: 500,
    } as ErrorType;

    if (typeof err === 'string') {
      try {
        if (err.includes('<!DOCTYPE html>') || err.includes('<html>')) {
          return defaultError;
        }
        err = JSON.parse(err);
      } catch (_) {}
    }
    // Is string
    if (typeof err === 'string') {
      let message = '';
      try {
        message = errors[err] || err;
      } catch (error) {
        message = err;
      }

      return {
        ...defaultError,
        ...{
          message: message,
        },
      };
    }
    // Axios error
    if (err?.message && typeof err?.message === 'string') {
      let message = '';
      try {
        message = errors[err.message] || err;
      } catch (error) {
        message = err.message;
      }

      return {
        ...defaultError,
        ...{
          message: message,
          code: err.code,
        },
      };
    }

    // Others error
    if (err?.error?.message && typeof err?.error?.message === 'string') {
      let message = '';
      try {
        message = errors[err.error.message] || err;
      } catch (error) {
        message = err.error.message;
      }

      return {
        ...defaultError,
        ...{
          message: message,
          code: err.error.code,
        },
      };
    }
    return defaultError;
  }

  return { error };
}
