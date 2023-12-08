import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {

    constructor(private profileServices: ProfilesService) {}

    @Post(':id/profile')
    createProfile(
        @Param('id', ParseIntPipe) id: number,
        @Body() profile: CreateProfileDto
    ) {
        return this.profileServices.createProfile(id, profile)
    }
}
