import { ApiProperty } from '@nestjs/swagger';
import { BaseReponse } from '../../common/base-reponse.dto';

export class LogoutCustomerResponseDto extends BaseReponse {
  @ApiProperty({ example: null, nullable: true, type: 'null' })
  data: null;
}
