'use client';

import { SingleImageDropzone } from '@/components/upload/single-image';
import {
  UploaderProvider,
  type UploadFn,
} from '@/components/upload/uploader-provider';
import { useEdgeStore } from '@/lib/edgestore';
import * as React from 'react';

export interface SingleImageUsageProps {
  onUploadSuccess: (url: string) => void;
}

export function SingleImageDropzoneUsage(
  { onUploadSuccess }: SingleImageUsageProps
) {
  const { edgestore } = useEdgeStore();

  const uploadFn: UploadFn = React.useCallback(
    async ({ file, onProgressChange, signal }) => {
      const res = await edgestore.publicFiles.upload({
        file,
        signal,
        onProgressChange,
      });
      // you can run some server action or api here
      // to add the necessary data to your database
      // Giả sử kết quả trả về có trường 'url'
      const uploadedUrl = res.url;
      // Gọi callback để thông báo URL sau upload thành công
      onUploadSuccess(uploadedUrl);

      console.log(res);
      return res;
    },
    [edgestore, onUploadSuccess],
  );

  return (
    <UploaderProvider uploadFn={uploadFn} autoUpload>
      <SingleImageDropzone
        height={200}
        width={200}
        dropzoneOptions={{
          maxSize: 1024 * 1024 * 5, // 5 MB
        }}
      />
    </UploaderProvider>
  );
}