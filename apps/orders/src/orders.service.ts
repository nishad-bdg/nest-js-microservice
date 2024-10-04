import { Inject, Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './schemas/order.schema';
import { BILLING_SERVICE } from 'apps/orders/src/constant/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}

  async create(dto: CreateOrderDto) {
    console.info('Hello world');
    const session = await this.ordersRepository.startTransaction();
    try {
      const order = await this.ordersRepository.create(dto, { session });
      await lastValueFrom(this.billingClient.emit('order_created', { dto }));
      await session.commitTransaction();
      return order;
    } catch (err) {
      session.abortTransaction();
    }
  }

  async getOrders(): Promise<Order[]> {
    return await this.ordersRepository.find({});
  }
}
