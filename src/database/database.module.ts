import { DynamicModule, Module } from '@nestjs/common';
import { createConnection } from 'typeorm';
import { ConnectionOptions } from 'tls';

@Module({})
export class DatabaseModule {
  public static register(options: ConnectionOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'CONNECTION',
          useValue: createConnection(/*options*/),
        },
      ],
    };
  }
}
