import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { profileDto, tokenDto } from './auth.schema';

export function GoogleLoginDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Google login' }),
    ApiOkResponse({
      description: 'Redirect to google/redirect',
    }),
  );
}

export function GoogleRedirectDoc() {
  return applyDecorators(
    ApiOperation({ summary: `Redirected link from Google's OAUTH` }),
    ApiInternalServerErrorResponse({ description: 'Service error' }),
    ApiOkResponse({ type: tokenDto }),
  );
}

export function LoginDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'User login API' }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
    }),
    ApiOkResponse({ type: tokenDto }),
    ApiBadRequestResponse({
      description: 'Validation failed',
    }),
    ApiConflictResponse({
      description: 'This user already exist with another login method',
    }),
  );
}

export function RegisterDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'User register API' }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
    }),
    ApiOkResponse({ type: tokenDto }),
    ApiBadRequestResponse({
      description: 'Validation failed',
    }),
    ApiConflictResponse({ description: 'User already exist' }),
  );
}

export function GetProfileDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Get profile user API' }),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
    }),
    ApiOkResponse({ type: profileDto }),
  );
}

export function RefreshTokenDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Refresh token' }),
    ApiUnauthorizedResponse({
      description: 'Refresh token is expired',
    }),
    ApiOkResponse({ type: tokenDto }),
  );
}
