import { Injectable, Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS, COFFEE_BRANDS_DB } from './coffees.constants';
import { NODE_ENV_DEV } from '../app.contants';
import { Connection } from 'typeorm';

// class MockCoffeesService {}

abstract class ConfigService {}
class DevelopmentConfigServices extends ConfigService {}
class ProductionConfigServices extends ConfigService {}

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    return ['buddy_brew', 'nescafe'];
  }
}

@Module({
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: COFFEE_BRANDS,
      useFactory: async (connection: Connection): Promise<string[]> => {
        // const coffeeBrands = await connection.query(
        //   'SELECT DISTINCT brand FROM coffees;',
        // );
        const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
        return coffeeBrands;
      },
    },
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === NODE_ENV_DEV
          ? DevelopmentConfigServices
          : ProductionConfigServices,
    },
  ],
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  exports: [CoffeesService],
})
export class CoffeesModule {}
