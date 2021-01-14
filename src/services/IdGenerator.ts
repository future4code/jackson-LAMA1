import { v4 } from "uuid";

export class IdGenerator {
    async generate(): Promise<string> {
        return v4();
    };
};

export const idGenerator = new IdGenerator();