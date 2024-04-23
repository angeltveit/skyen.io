import { PUBLIC_S3_BUCKET_NAME } from '$env/static/public';
import { S3 } from '$lib/s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { json } from "@sveltejs/kit";
import { generateFileName } from '$lib/word-generator.js';
 
export const POST = async ({ request }) => {
    const { fileName, fileType, } = await request.json();

    const slug = generateFileName()
 
    if (!fileName || !fileType || fileName.trim() === '' || fileType.trim() === '') {
        return json({ message: 'Missing required parameters.' }, { status: 400 });
    }
  
    const presignedUrl = await getSignedUrl(S3, new PutObjectCommand({
        Bucket: PUBLIC_S3_BUCKET_NAME,
        Key: slug,
        ContentType: fileType,
        ACL: 'public-read'
    }), {
        expiresIn: 60 * 5 // 5 minutes
    });
 
    return json({ presignedUrl, slug });
};