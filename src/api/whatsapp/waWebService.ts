import { StatusCodes } from 'http-status-codes';

import { type SingleWAMsg } from '@/api/whatsapp/waWebModel';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { errorLoggerToFile, infoLoggerToFile, logger } from '@/server';
import { waWebClient } from '@/waweb';
export const waWebService = {
  // Retrieves all users from the database
  sendSingleMessage: async ({ message, phoneNumber }: SingleWAMsg): Promise<ServiceResponse<string | null>> => {
    try {
      const purifiedPhoneNumber = phoneNumber.replace(/\D/g, '');
      const isRegisteredWhatsAppNumber = await waWebClient.isRegisteredUser(purifiedPhoneNumber);
      // const validWhatsAppNumber = await waWebClient.getNumberId(purifiedPhoneNumber);

      if (!isRegisteredWhatsAppNumber) {
        logger.error(`Phone number ${phoneNumber} is not a registered WhatsApp number`);
        errorLoggerToFile.error(`Phone number ${phoneNumber} is not a registered WhatsApp number`);
        return new ServiceResponse<string>(
          ResponseStatus.Failed,
          'Phone number is not a registered WhatsApp number',
          `Phone number ${phoneNumber} is not a registered WhatsApp number`,
          StatusCodes.BAD_REQUEST
        );
      }

      const username = `${purifiedPhoneNumber}@c.us`;
      const response = await waWebClient.sendMessage(username, message);
      logger.info(`Sending message to ${username}: ${message}`);
      if (response?.ack !== -1) {
        logger.info(`Message sent to ${phoneNumber}`);
        infoLoggerToFile.info(`Message sent to ${phoneNumber}`);
        return new ServiceResponse<string>(
          ResponseStatus.Success,
          'Message sent',
          `Message sent to ${phoneNumber}`,
          StatusCodes.OK
        );
      }

      logger.error(`Message NOT sent to ${phoneNumber}`);
      errorLoggerToFile.error(`Message NOT sent to ${phoneNumber}`);
      return new ServiceResponse<string>(
        ResponseStatus.Failed,
        'Something went wrong. Message not sent',
        `Message NOT sent to ${phoneNumber}`,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    } catch (ex) {
      const errorMessage = `Error sending message: $${(ex as Error).message}`;
      logger.error(errorMessage);
      errorLoggerToFile.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  // findAll: async (): Promise<ServiceResponse<User[] | null>> => {
  //   try {
  //     const users = await userRepository.findAllAsync();
  //     if (!users) {
  //       return new ServiceResponse(ResponseStatus.Failed, 'No Users found', null, StatusCodes.NOT_FOUND);
  //     }
  //     return new ServiceResponse<User[]>(ResponseStatus.Success, 'Users found', users, StatusCodes.OK);
  //   } catch (ex) {
  //     const errorMessage = `Error finding all users: $${(ex as Error).message}`;
  //     logger.error(errorMessage);
  //     return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
  //   }
  // },
};
