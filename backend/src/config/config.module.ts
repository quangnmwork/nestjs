import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import {
  StoreConfig,
  StoreFeatureConfig,
  StoreRootConfig,
} from './config.type';

let rootStoreConfig: StoreConfig;
const STORE_CONFIG_TOKEN = 'STORE_CONFIG';
const DEFAULT_CONFIG: StoreConfig = {
  dirName: 'store',
  fileName: 'data.json',
};

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
class RootConfigModule {}

export class ConfigModule {
  private static getRootStoreConfig(config?: StoreConfig): StoreConfig {
    return Object.assign(DEFAULT_CONFIG, config);
  }

  static forRoot(storeConfig?: StoreRootConfig): DynamicModule {
    rootStoreConfig = ConfigModule.getRootStoreConfig(storeConfig);
    return {
      module: RootConfigModule,
      providers: [
        {
          provide: STORE_CONFIG_TOKEN,
          useValue: ConfigModule.getRootStoreConfig(storeConfig),
        },
      ],
      exports: [ConfigService],
    };
  }

  static forFeature(storeConfig?: StoreFeatureConfig): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'STORE_CONFIG',
          useFactory: () => {
            const featureStoreConfig = ConfigModule.getRootStoreConfig({
              ...rootStoreConfig,
              ...storeConfig,
            });
            return new ConfigService(featureStoreConfig);
          },
        },
      ],
    };
  }
}
