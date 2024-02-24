import { Inject, Injectable } from '@nestjs/common';
import { StoreConfig } from './config.type';
import { appendFileSync, existsSync, mkdirSync } from 'fs';

@Injectable()
export class ConfigService {
  constructor(@Inject('STORE_CONFIG') private storeConfig: StoreConfig) {
    if (!existsSync(storeConfig.dirName)) {
      mkdirSync(storeConfig.dirName);
    }
  }

  save(data: any) {
    appendFileSync(
      this.storeConfig.dirName + '/' + this.storeConfig.fileName,
      JSON.stringify(data),
    );
  }
}
