/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Users, UsersDocument } from 'src/models/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private readonly usersModel: Model<UsersDocument>,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.usersModel.find().exec();
  }

  async findOne(email: string): Promise<Users> {
    return this.usersModel.findOne({ email }).exec();
  }

  async create(usersDto: Users): Promise<Users> {
    const newObjectId = new Types.ObjectId();
    usersDto._id = newObjectId;
  
    if (usersDto.password) {
      usersDto.password = await bcrypt.hash(usersDto.password, 10);
    }
  
    const createdUsers = new this.usersModel(usersDto);
    return createdUsers.save();
  }

  async update(id: string, usersDto: Users): Promise<Users> {
    return this.usersModel
      .findByIdAndUpdate(id, usersDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Users> {
    return this.usersModel.findByIdAndDelete(id).exec();
  }
}
