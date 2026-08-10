import { StatusCodes } from 'http-status-codes';
import { Mock } from 'vitest';

import { waWebService } from '@/api/whatsapp/waWebService';
import { waWebClient } from '@/waweb';

vi.mock('@/waweb', () => ({
  waWebClient: {
    isRegisteredUser: vi.fn(),
    sendMessage: vi.fn(),
  },
}));

vi.mock('@/server', () => ({
  logger: {
    error: vi.fn(),
    info: vi.fn(),
  },
  infoLoggerToFile: {
    info: vi.fn(),
  },
  errorLoggerToFile: {
    error: vi.fn(),
  },
}));

describe('waWebService', () => {
  const payload = {
    phoneNumber: '+44 7876 375594',
    message: 'Voting code test message',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (waWebClient.isRegisteredUser as Mock).mockResolvedValue(true);
  });

  it('returns success when WhatsApp confirms a sent message', async () => {
    (waWebClient.sendMessage as Mock).mockResolvedValue({ ack: 1 });

    const result = await waWebService.sendSingleMessage(payload);

    expect(waWebClient.isRegisteredUser).toHaveBeenCalledWith('447876375594');
    expect(waWebClient.sendMessage).toHaveBeenCalledWith('447876375594@c.us', payload.message);
    expect(result.statusCode).toEqual(StatusCodes.OK);
    expect(result.success).toBeTruthy();
    expect(result.message).toContain('Message sent');
  });

  it('returns a bad request when the phone number is not registered on WhatsApp', async () => {
    (waWebClient.isRegisteredUser as Mock).mockResolvedValue(false);

    const result = await waWebService.sendSingleMessage(payload);

    expect(waWebClient.sendMessage).not.toHaveBeenCalled();
    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(result.success).toBeFalsy();
    expect(result.message).toContain('not a registered WhatsApp number');
  });

  it('returns a failure when WhatsApp marks the message as not acknowledged', async () => {
    (waWebClient.sendMessage as Mock).mockResolvedValue({ ack: -1 });

    const result = await waWebService.sendSingleMessage(payload);

    expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.success).toBeFalsy();
    expect(result.message).toContain('Message not sent');
    expect(result.responseObject).toContain('Message NOT sent');
  });

  it('returns success when WhatsApp accepts the message without returning a sent message', async () => {
    (waWebClient.sendMessage as Mock).mockResolvedValue(undefined);

    const result = await waWebService.sendSingleMessage(payload);

    expect(result.statusCode).toEqual(StatusCodes.OK);
    expect(result.success).toBeTruthy();
    expect(result.message).toContain('Message sent');
    expect(result.responseObject).toContain('Message sent');
  });

  it('returns a failure when WhatsApp throws while sending', async () => {
    (waWebClient.sendMessage as Mock).mockRejectedValue(new Error('Client disconnected'));

    const result = await waWebService.sendSingleMessage(payload);

    expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.success).toBeFalsy();
    expect(result.message).toContain('Error sending message');
    expect(result.responseObject).toBeNull();
  });
});
