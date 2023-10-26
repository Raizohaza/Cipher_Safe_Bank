import { ApiProperty } from '@nestjs/swagger';
import { BaseReponse } from '../../common/base-reponse.dto';
import { IAccount } from '../account.interface';

export class GetByUserIdResponse extends BaseReponse {
  @ApiProperty()
  data: IAccount | any;
}
