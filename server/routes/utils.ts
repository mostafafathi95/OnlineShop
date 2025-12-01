/**
 * Route Utilities and Helpers
 * 
 * Common functions used across multiple route files
 */

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

function handleError(error: any, defaultMessage: string): string {
  console.error("[Route Error]", error);
  return defaultMessage;
}

interface ResponseFormat {
  success?: boolean;
  data?: any;
  error?: string;
}

function formatResponse(
  success: boolean,
  data?: any,
  error?: string
): ResponseFormat {
  const response: ResponseFormat = { success };
  if (data) response.data = data;
  if (error) response.error = error;
  return response;
}

export { generateOrderNumber, handleError, formatResponse };
