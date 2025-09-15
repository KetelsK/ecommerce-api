import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserWithoutPassword } from './jwt.strategy';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService) { }

    login(user: UserWithoutPassword) {
        const payload: UserWithoutPassword = { id: user.id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(data: CreateUserDto): Promise<{ access_token: string }> {
        try {
            const email: string = data.email;
            // Hash the password with bcrypt
            const hashedPassword: string = await this.hashPassword(data.password);
            const user: User = this.userRepository.create({ email, password: hashedPassword });
            await this.userRepository.save(user);
            return this.login(user);
        } catch (error: unknown) {
            if (typeof error === 'object' && error !== null) {
                if ('code' in error && error.code == 'ER_DUP_ENTRY') {
                    throw new ConflictException('User already exists')
                }
            }

            throw error;
        }
    }

    async checkCredentials(user: User): Promise<User | null> {
        const foundUser: User | null = await this.userRepository.findOne({ where: { email: user.email } });
        if (!foundUser) {
            return null;
        }
        // Check that password is correct
        const passwordMatch: boolean | null = await this.comparePassword(user.password, foundUser.password);
        return passwordMatch ? foundUser : null;
    }

    async hashPassword(plainPassword: string): Promise<string> {
        const saltRounds: number = 10;
        const hash: string = await bcrypt.hash(plainPassword, saltRounds);
        return hash;
    }

    async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}