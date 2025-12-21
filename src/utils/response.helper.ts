import { Response } from 'express';

interface SuccessResponseParams {
  res: Response;
  statusCode?: number;
  message: string;
  data?: any;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters?: any;
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
  pagination,
  filters,
  search_result,
}: SuccessResponseParams) => {
  const response: any = {
    success: true,
    message,
  };

  if (data !== undefined) {
    response.data = data;
  }

  if (pagination) {
    response.pagination = pagination;
  }

  if (filters) {
    response.filters = filters;
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