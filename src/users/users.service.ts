/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async createUser(user: CreateUserDto) {
        const userFound = await this.userRepository.findOne({
            where: {
                username: user.username
            }
        })

        if (userFound) {
            return new HttpException('User already exists', HttpStatus.CONFLICT)
        }

        const newUser = this.userRepository.create(user)
        return this.userRepository.save(newUser)
    }

    getUsers() {
        return this.userRepository.find()
    }

    async getUser(id: number) {
        const userFound = await this.userRepository.findOne({
            where: {
                id
            }
        })

        if (!userFound) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        return userFound
    }

    async deleteUser(id: number) {
        const resultado = await this.userRepository.delete({id})

        if(resultado.affected === 0) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        return resultado
    }

    async updateUser(id: number, user: UpdateUserDto) {
        const userFound = await this.userRepository.findOne({
            where: {
                id
            }
        })

        if(!userFound) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        const updateUser = Object.assign(userFound, user)
        return this.userRepository.save(updateUser)
    }

}
