import { MinioService } from 'nestjs-minio-client';
export declare class MinioBucketService {
    private readonly minioService;
    constructor(minioService: MinioService);
    listAllBuckets(): Promise<any[]>;
    uploadFile(file: Express.Multer.File): Promise<object>;
}
