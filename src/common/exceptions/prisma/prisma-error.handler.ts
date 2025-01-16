import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaErrorCode } from './prisma-error-codes.enum';
import {
  ErrorMessageParams,
  PrismaErrorMessages,
} from './prisma-error.messages';

export class PrismaErrorHandler {
  static handle(error: any, entityName: string, target?: string): never {
    if (error instanceof PrismaClientKnownRequestError) {
      const errorParams: ErrorMessageParams = {
        entityName,
        target: (target ?? error.meta?.target) as string,
        fieldName: error.meta?.field_name as string,
      };

      switch (error.code) {
        case PrismaErrorCode.UNIQUE_CONSTRAINT:
          throw new BadRequestException(
            PrismaErrorMessages[PrismaErrorCode.UNIQUE_CONSTRAINT](errorParams),
          );

        case PrismaErrorCode.NOT_FOUND:
          throw new NotFoundException(
            PrismaErrorMessages[PrismaErrorCode.NOT_FOUND](errorParams),
          );

        case PrismaErrorCode.FOREIGN_KEY_CONSTRAINT:
          throw new BadRequestException(
            PrismaErrorMessages[PrismaErrorCode.FOREIGN_KEY_CONSTRAINT](
              errorParams,
            ),
          );

        case PrismaErrorCode.REQUIRED_FIELD:
          throw new BadRequestException(
            PrismaErrorMessages[PrismaErrorCode.REQUIRED_FIELD](errorParams),
          );

        default:
          throw new InternalServerErrorException(
            PrismaErrorMessages.DEFAULT(errorParams),
          );
      }
    }

    // For unknown errors
    throw new InternalServerErrorException(
      PrismaErrorMessages.DEFAULT({ entityName }),
    );
  }
}
