import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';

// import { commonValidations } from '@/common/utils/commonValidation';

extendZodWithOpenApi(z);

export const SingleWAMsgSchema = z.object({
  phoneNumber: z.string().refine(isValidPhoneNumber, { message: 'Invalid phone number' }),
  message: z.string(),
});

export type SingleWAMsg = z.infer<typeof SingleWAMsgSchema>;

// Input Validation for 'POST wa-web/send-message' endpoint
export const PostSingleWAMsgSchema = z.object({
  body: SingleWAMsgSchema,
});
