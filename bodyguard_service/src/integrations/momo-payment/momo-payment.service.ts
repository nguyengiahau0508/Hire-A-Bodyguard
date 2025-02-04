
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';
import { MomoConfigService } from './config/config.service';

@Injectable()
export class MomoPaymentService {
  constructor(
    private readonly momoConfigService: MomoConfigService
  ) { }

  async createPayment(
    amount: number,
    items: Array<any>, // Danh sách sản phẩm
    userInfo: { name: string; phoneNumber: string; email: string }, // Thông tin người dùng
    orderId: string
  ): Promise<any> {
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
    const rawSignature = `accessKey=${this.momoConfigService.accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${this.momoConfigService.ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${this.momoConfigService.partnerCode}&redirectUrl=${this.momoConfigService.redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    const signature = crypto
      .createHmac('sha256', this.momoConfigService.secretKey)
      .update(rawSignature)
      .digest('hex');

    const requestBody = {
      partnerCode: this.momoConfigService.partnerCode,
      partnerName: 'Test',
      storeId: 'MomoTestStore',
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl: this.momoConfigService.redirectUrl,
      ipnUrl: this.momoConfigService.ipnUrl,
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

  async checkTracsactionStatus(orderId: string, requestId: string) {


  }
}

