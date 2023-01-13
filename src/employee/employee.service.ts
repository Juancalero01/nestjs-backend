import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  // --------------------------------------------
  //! This action returns all employee
  async findAll() {
    return await this.employeeRepository.find();
  }

  //! This action returns a #${id} employee
  async findOne(id: number) {
    const employee = await this.employeeRepository.findOne({ where: { id } });
    return employee;
  }
  // --------------------------------------------

  //! This action adds a new employee
  async create(body) {
    const employee = new Employee();
    employee.name = body.name;
    employee.lastName = body.lastName;
    employee.email = body.email;
    employee.phoneNumber = body.phoneNumber;
    try {
      await this.employeeRepository.save(employee);
      return { status: HttpStatus.ACCEPTED };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'A problem has occurred when creating an employee',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  //! This action updates a #${id} employee
  async update(id: number, body) {
    const employee = await this.findOne(id);
    if (employee) {
      employee.name = body.name;
      employee.lastName = body.lastName;
      employee.email = body.email;
      employee.phoneNumber = body.phoneNumber;
      try {
        await this.employeeRepository.save(employee);
        return { status: HttpStatus.ACCEPTED };
      } catch (error) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'A problem has occurred when updating an employee',
          },
          HttpStatus.FORBIDDEN,
          {
            cause: error,
          },
        );
      }
    }
    return 'No results found';
  }

  //! This action removes a #${id} employee
  async remove(id: number) {
    const employee = await this.findOne(id);
    if (employee) {
      try {
        await this.employeeRepository.delete(id);
      } catch (error) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'A problem has occurred when deleting an employee',
          },
          HttpStatus.FORBIDDEN,
          {
            cause: error,
          },
        );
      }
    }
    return 'No results found';
  }
}
