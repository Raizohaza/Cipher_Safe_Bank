import { ApiProperty } from '@nestjs/swagger';
import { BaseReponse } from '../../../interfaces/common/base-reponse.dto';
import { ICustomer } from '../customer.interface';

export class findAllCustomerResponseDTO extends BaseReponse {
  @ApiProperty({
    example: {
      customer: {
        email: 'test@ibank.com',
        is_confirmed: true,
        id: '5d987c3bfb881ec86b476bcc',
        name: 'username',
      },
    },
    nullable: true,
  })
  data: {
    customer: [ICustomer];
  };
}
