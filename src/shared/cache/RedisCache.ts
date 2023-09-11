import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';
import { promises } from 'dns';
import { da } from 'date-fns/locale';
import { parentPort } from 'worker_threads';

export default class RedisCache{
    private client: RedisClient;

    constructor(){
        this.client = new Redis(cacheConfig.config.redis);
    }

    public async save(key: string, value: any): Promise<void>{
        console.log(key, value);
    }

     public async recover<T>(key: string): Promise<T | null>{
        const data = await this.client.get(key);

        if(!data){
            return null;
        }

        const parsedData = JSON.parse(data) as T;

        return parsedData;
     }

     public async invalidate(key:string) : Promise<void> {
        this.client.del(key);
     }
}