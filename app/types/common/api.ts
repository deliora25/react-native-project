export interface RequestExceptionError {
  data?: {
    error?: {
      message?: string;
    };
    errors?: string[];
    title?: string[];
  };
  response?: {
    data?: {
      error?: {
        message: string;
      };
      errors?: Record<string, string[]>;
      title?: string;
    };
  };
}
