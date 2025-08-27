import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService) { }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(data: CreateUserDto): Promise<{ access_token: string }> {
        const email = data.email;
        // Hash the password with bcrypt
        const hashedPassword = await this.hashPassword(data.password);
        const user = this.userRepository.create({ email, password: hashedPassword });
        await this.userRepository.save(user);
        return await this.login(user);
    }

    async checkCredentials(user: any): Promise<User | null> {
        const foundUser = await this.userRepository.findOne({ where: { email: user.email } });
        if (!foundUser) {
            return null;
        }
        // Check that password is correct
        const passwordMatch = await this.comparePassword(user.password, foundUser.password);
        return passwordMatch ? foundUser : null;
    }

    async hashPassword(plainPassword: string): Promise<string> {
        const saltRounds = 10;
        const hash = await bcrypt.hash(plainPassword, saltRounds);
        return hash;
    }

    async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}