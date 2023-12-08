import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Profile } from './entities/profile.entity';
import { User } from '../users/entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfilesService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    ) {}

    async createProfile(id: number, profile: CreateProfileDto) {
        const userFound = await this.userRepository.findOne({
            where: {
                id
            }
        })

        if(!userFound) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        const newProfile = this.profileRepository.create(profile)
        const savedProfile = await this.profileRepository.save(newProfile)
        userFound.profile = savedProfile

        return this.userRepository.save(userFound)
    }
}
