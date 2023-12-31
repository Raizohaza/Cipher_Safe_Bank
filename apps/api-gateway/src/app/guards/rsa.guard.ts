import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { decrypt, isVerifiedWithSign } from '../utils/rsa.encrypt';
import * as fetch from 'node-fetch';
import 'dotenv/config';
import { KeyLike } from 'crypto';

@Injectable()
export class RsaGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const verify = this.reflector.get<string[]>('Verify', context.getHandler());
    if (!verify) {
      return true;
    }
    const HOME = 'https://backend-bank-raizohaza.cloud.okteto.net';
    const request = context.switchToHttp().getRequest();
    const data = decrypt(request.body.encrypted);
    if (!data) {
      throw new BadRequestException('Body parse failure!');
    }
    const verifyData = Buffer.from(data.toString('utf-8'));
    const abineSign = request.body.sign;
    const sign = Buffer.from(request.body.sign, 'base64');
    const fetchData = await fetch(HOME + '/linking-banks/public.pem');
    const publicKey: KeyLike = await fetchData.text();
    const bfPublicKey: Buffer = Buffer.from(publicKey.toString());

    console.log({ data: verifyData, sign });

    if (!isVerifiedWithSign({ data: verifyData, sign, publicKey: bfPublicKey }))
      throw new UnauthorizedException('Signature invalid!');
    if (!data) {
      return false;
    }
    const decryptedData = JSON.parse(data.toString());

    request.body = decryptedData;
    request.body.sign = abineSign;
    console.log('Verified successfully!', request.body);

    return true;
  }
}
