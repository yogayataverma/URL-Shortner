import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly model: Model<User>) {}

  async create(email: string, pwd: string): Promise<User> {
    const hashed = await bcrypt.hash(pwd, 10);
    return this.model.create({ email, password: hashed });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.model.findOne({ email });
  }

  async validateUser(email: string, pwd: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (user && (await bcrypt.compare(pwd, user.password))) return user;
    return null;
  }
}
