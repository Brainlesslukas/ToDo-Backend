import { MinioBucketService } from './minio-bucket.service';
export declare class MinioBucketController {
    private readonly minioBucketService;
    constructor(minioBucketService: MinioBucketService);
    listAllBuckets(): Promise<any[]>;
    uploadFile(file: Express.Multer.File): Promise<object>;
}
