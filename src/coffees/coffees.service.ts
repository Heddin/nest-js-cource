import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  public findAll() {
    return this.coffees;
  }

  public findOne(id: number) {
    const coffee = this.coffees.find((item) => item.id == +id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  public create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
    return createCoffeeDto;
  }

  public update(id: number, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      //update existing coffee
    }
  }

  public remove(id: number) {
    const coffeeIndex = this.coffees.findIndex((item) => (item.id = +id));
    if (coffeeIndex) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
