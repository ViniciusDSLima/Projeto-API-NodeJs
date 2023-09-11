import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import OrderProducts from "./OrdersProducts";

@Entity("orders")
class Order{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Customer)
    @JoinColumn({name: 'customer_id'})
    customer : Customer;

    @OneToMany(() => OrderProducts, order_producsts => order_producsts.order, {
        cascade: true,
    })
    order_products : OrderProducts[];

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Order;
