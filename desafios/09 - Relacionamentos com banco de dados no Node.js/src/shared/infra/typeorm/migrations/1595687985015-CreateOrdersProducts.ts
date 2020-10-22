import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export default class CreateOrdersProductsTable1595687985015
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    await queryRunner.createTable(
      new Table({
        name: 'orders_products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'product_id',
            type: 'uuid'
          },
          {
            name: 'order_id',
            type: 'uuid'
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 8,
            scale: 2,
            isNullable: false
          },
          {
            name: 'quantity',
            type: 'decimal',
            isNullable: false
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'OrdersProductsProduct',
            columnNames: ['product_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          {
            name: 'OrdersProductsOrder',
            columnNames: ['order_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'orders',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders_products')
  }
}
