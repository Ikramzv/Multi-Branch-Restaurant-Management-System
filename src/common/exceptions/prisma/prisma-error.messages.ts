import { PrismaErrorCode } from './prisma-error-codes.enum';

export type ErrorMessageParams = {
  entityName: string;
  target?: string;
  fieldName?: string;
};

export const PrismaErrorMessages = {
  [PrismaErrorCode.UNIQUE_CONSTRAINT]: ({
    entityName,
    target,
  }: ErrorMessageParams) => `${entityName} with this ${target} already exists`,

  [PrismaErrorCode.NOT_FOUND]: ({ entityName }: ErrorMessageParams) =>
    `${entityName} not found`,

  [PrismaErrorCode.FOREIGN_KEY_CONSTRAINT]: ({
    entityName,
    fieldName,
  }: ErrorMessageParams) =>
    `Related ${fieldName} for ${entityName} does not exist`,

  [PrismaErrorCode.REQUIRED_FIELD]: ({
    entityName,
    fieldName,
  }: ErrorMessageParams) => `${fieldName} is required for ${entityName}`,

  DEFAULT: ({ entityName }: ErrorMessageParams) =>
    `Error processing ${entityName}`,
};
