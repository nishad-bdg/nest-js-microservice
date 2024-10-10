import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './schemas/order.schema';

@Controller({ path: 'orders' })
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() dto: CreateOrderDto, @Req() request: any) {
    console.info(request?.user);
    return await this.ordersService.create(dto);
  }

  @Get()
  async getOrders(): Promise<Order[]> {
    return await this.ordersService.getOrders();
  }
}
