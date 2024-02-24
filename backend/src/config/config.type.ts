export interface StoreRootConfig {
  dirName: string;
}

export interface StoreFeatureConfig {
  fileName: string;
}

export type StoreConfig = Partial<StoreRootConfig & StoreFeatureConfig>;
