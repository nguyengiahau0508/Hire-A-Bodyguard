
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class MomoPaymentService {
  constructor() { }

  async createPayment(
    amount: number,
    items: Array<any>, // Danh sách sản phẩm
    userInfo: { name: string; phoneNumber: string; email: string }, // Thông tin người dùng
    orderId: number
  ): Promise<any> {
    const accessKey = process.env.MOMO_ACCESS_KEY;
    const secretKey = process.env.MOMO_SECRET_KEY;
    const partnerCode = process.env.MOMO_PARTNER_CODE;
    const redirectUrl = process.env.MOMO_REDIRECT_URL;
    const ipnUrl = process.env.MOMO_IPN_URL;
    const orderInfo = 'Pay with MoMo';
    const requestType = 'payWithMethod';
    // const orderId = partnerCode + new Date().getTime();
    const requestId = orderId;
    const extraData = Buffer.from(
      JSON.stringify({ username: 'momo' }),
    ).toString('base64');
    const autoCapture = true;
    const lang = 'vi';
    const orderExpireTime = 30; // Thời gian hết hạn đơn hàng (30 phút)

    // Tạo chữ ký (signature)
    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    const signature = crypto
      .createHmac('sha256', secretKey)
      .update(rawSignature)
      .digest('hex');

    const requestBody = {
      partnerCode,
      partnerName: 'Test',
      storeId: 'MomoTestStore',
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      lang,
      requestType,
      autoCapture,
      extraData,
      signature,
      orderExpireTime,
      items, // Danh sách sản phẩm
      userInfo, // Thông tin người dùng
    };

    try {
      const response = await axios.post(
        'https://test-payment.momo.vn/v2/gateway/api/create',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          `Payment request failed with status ${error.response.status}: ${JSON.stringify(
            error.response.data,
          )}`,
        );
      }
      throw new Error(`Error during payment request: ${error.message}`);
    }
  }
}

