import { Strategy } from 'passport-jwt';
import { Auth } from './auth.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from './jwt-payload.interface';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private authRepository;
    constructor(authRepository: Repository<Auth>);
    validate(payload: JwtPayload): Promise<{
        id: string;
    }>;
}
export {};
