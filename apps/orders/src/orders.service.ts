import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async create(dto: CreateOrderDto) {
    return await this.ordersRepository.create(dto);
  }

  async getOrders(): Promise<Order[]> {
    return await this.ordersRepository.find({});
  }
}
