import { Response } from 'express';

interface SuccessResponseParams {
  res: Response;
  statusCode?: number;
  message: string;
  data?: any;
  search_result?: {
    total: number;
    search?: string;
    filters?: any;
  };
}

interface ErrorResponseParams {
  res: Response;
  statusCode?: number;
  message: string;
  errors?: Array<{ field: string; message: string }>;
}

export const successResponse = ({
  res,
  statusCode = 200,
  message,
  data,
  search_result,
}: SuccessResponseParams) => {
  const response: any = {
    success: true,
    message,
  };

  if (data !== undefined) {
    response.data = data;
  }

  if (search_result) {
    response.search_result = search_result;
  }

  return res.status(statusCode).json(response);
};

export const errorResponse = ({
  res,
  statusCode = 400,
  message,
  errors = [],
}: ErrorResponseParams) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};