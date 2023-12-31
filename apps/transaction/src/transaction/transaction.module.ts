import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from './entities/transaction.entity';
import { ConfigService } from '@i-bank/utils';
import { MongoConfigService } from '@i-bank/utils';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigService,
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
    MongooseModule.forFeature([
      {
        name: 'Transaction',
        schema: TransactionSchema,
        collection: 'transactions',
      },
    ]),
  ],
  controllers: [TransactionController],
  providers: [
    ConfigService,
    TransactionService,
    {
      provide: 'ACCOUNT_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('accountService'));
      },
      inject: [ConfigService],
    },
  ],
})
export class TransactionModule {}
