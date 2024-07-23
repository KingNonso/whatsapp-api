import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { PostSingleWAMsgSchema, SingleWAMsg, SingleWAMsgSchema } from '@/api/whatsapp/waWebModel';
import { waWebService } from '@/api/whatsapp/waWebService';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';

export const waWebRegistry = new OpenAPIRegistry();

waWebRegistry.register('SingleWAMsg', SingleWAMsgSchema);

export const waWebRouter: Router = (() => {
  const router = express.Router();

  waWebRegistry.registerPath({
    method: 'post',
    path: '/wa-web/send-message',
    tags: ['WhatsApp'],
    request: {
      // headers: z.object({
      //   secretKey: z.string().openapi({ description: "API secret key to authenticate requests. It's a secret!" }),
      // }),
      body: {
        description: 'Send a single message to a WhatsApp user',
        content: {
          'application/json': { schema: SingleWAMsgSchema },
        },
        required: true,
      },
    },
    responses: createApiResponse(z.string(), 'Message sent successfully!'),
  });

  router.post('/send-message', validateRequest(PostSingleWAMsgSchema), async (_req: Request, res: Response) => {
    const payload = _req.body as SingleWAMsg;
    const serviceResponse = await waWebService.sendSingleMessage(payload);
    handleServiceResponse(serviceResponse, res);
  });

  // waWebRegistry.registerPath({
  //   method: 'get',
  //   path: '/users/{id}',
  //   tags: ['User'],
  //   request: { params: GetUserSchema.shape.params },
  //   responses: createApiResponse(UserSchema, 'Success'),
  // });

  // router.get('/:id', validateRequest(GetUserSchema), async (req: Request, res: Response) => {
  //   const id = parseInt(req.params.id as string, 10);
  //   const serviceResponse = await waWebService.findById(id);
  //   handleServiceResponse(serviceResponse, res);
  // });

  return router;
})();
