import { NextResponse } from 'next/server';
import { ZodError, ZodSchema } from 'zod';

/**
 * Standardized API error response format
 */
export interface ApiErrorResponse {
  success: false;
  error: string;
  code: string;
  details?: unknown;
  timestamp: string;
}

/**
 * Standardized API success response format
 */
export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  timestamp: string;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Creates a standardized error response
 */
export function createErrorResponse(
  error: string,
  code: string = 'INTERNAL_ERROR',
  status: number = 500,
  details?: unknown
): NextResponse<ApiErrorResponse> {
  const response: ApiErrorResponse = {
    success: false,
    error,
    code,
    details,
    timestamp: new Date().toISOString(),
  };
  
  console.error(`API Error [${code}]:`, error, details);
  
  return NextResponse.json(response, { status });
}

/**
 * Creates a standardized success response
 */
export function createSuccessResponse<T>(
  data: T,
  status: number = 200
): NextResponse<ApiSuccessResponse<T>> {
  const response: ApiSuccessResponse<T> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };
  
  return NextResponse.json(response, { status });
}

/**
 * Validates request body against a Zod schema
 */
export async function validateRequestBody<T>(
  request: Request,
  schema: ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; response: NextResponse<ApiErrorResponse> }> {
  try {
    const body = await request.json();
    const validatedData = schema.parse(body);
    
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof ZodError) {
      const validationErrors = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        received: 'input' in err ? err.input : undefined,
      }));
      
      return {
        success: false,
        response: createErrorResponse(
          'Request validation failed',
          'VALIDATION_ERROR',
          400,
          { validationErrors }
        ),
      };
    }
    
    if (error instanceof SyntaxError) {
      return {
        success: false,
        response: createErrorResponse(
          'Invalid JSON in request body',
          'INVALID_JSON',
          400
        ),
      };
    }
    
    return {
      success: false,
      response: createErrorResponse(
        'Failed to parse request body',
        'PARSE_ERROR',
        400,
        error
      ),
    };
  }
}

/**
 * Rate limiting (simple in-memory implementation)
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  limit: number = 10,
  windowMs: number = 60000 // 1 minute
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const key = identifier;
  
  const existing = rateLimitMap.get(key);
  
  if (!existing || now > existing.resetTime) {
    // First request or window expired
    const resetTime = now + windowMs;
    rateLimitMap.set(key, { count: 1, resetTime });
    return { allowed: true, remaining: limit - 1, resetTime };
  }
  
  if (existing.count >= limit) {
    // Rate limit exceeded
    return { allowed: false, remaining: 0, resetTime: existing.resetTime };
  }
  
  // Increment count
  existing.count++;
  rateLimitMap.set(key, existing);
  
  return { allowed: true, remaining: limit - existing.count, resetTime: existing.resetTime };
}

/**
 * Get client IP address from request
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp.trim();
  }
  
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }
  
  return 'unknown';
}

/**
 * Apply rate limiting to a request
 */
export function applyRateLimit(
  request: Request,
  limit: number = 10,
  windowMs: number = 60000
): NextResponse<ApiErrorResponse> | null {
  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit(clientIp, limit, windowMs);
  
  if (!rateLimit.allowed) {
    return createErrorResponse(
      'Rate limit exceeded',
      'RATE_LIMIT_EXCEEDED',
      429,
      {
        limit,
        windowMs,
        resetTime: new Date(rateLimit.resetTime).toISOString(),
      }
    );
  }
  
  return null;
}