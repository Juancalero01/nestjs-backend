import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    // ! TYPEORM DATABASE CONNECTION
    // --------------------------------------------
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'Employee',
      autoLoadEntities: true,
      logging: true,
      synchronize: true,
    }),
    EmployeeModule,
    // --------------------------------------------
    // ! APPLICATION MODULES
    EmployeeModule,
    // --------------------------------------------
  ],
})
export class AppModule {}
