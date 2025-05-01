export async function compressString(input: string): Promise<string> {
  // Step 1: Create a CompressionStream
  const compressionStream = new CompressionStream("gzip");

  // Step 2: Convert string to a stream of Uint8Array
  const encoder = new TextEncoder();
  const inputStream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(input));
      controller.close();
    },
  });

  // Step 3: Pipe the input stream to the CompressionStream
  const compressedStream: ReadableStream<Uint8Array> =
    inputStream.pipeThrough(compressionStream);

  // Step 4: Read and collect the compressed data
  const reader = compressedStream.getReader();
  const chunks: Uint8Array[] = [];
  let done, value;
  while ((({ done, value } = await reader.read()), !done)) {
    chunks.push(value!);
  }

  // Step 5: Concatenate chunks and convert to base64 string
  const compressedArray = new Uint8Array(
    chunks.reduce<number[]>((acc, chunk) => acc.concat(Array.from(chunk)), []),
  );
  const base64String = btoa(String.fromCharCode(...compressedArray));

  return base64String;
}

export async function decompressString(compressedBase64String: string) {
  // Step 1: Base64 decode the string to a Uint8Array
  const compressedArray = Uint8Array.from(atob(compressedBase64String), (c) =>
    c.charCodeAt(0),
  );

  // Step 2: Create a DecompressionStream
  const decompressionStream = new DecompressionStream("gzip");

  // Step 3: Convert the Uint8Array to a stream and pipe it through the DecompressionStream
  const inputStream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(compressedArray);
      controller.close();
    },
  });
  const decompressedStream =
    inputStream.pipeThrough<Uint8Array>(decompressionStream);

  // Step 4: Read and collect the decompressed data
  const reader = decompressedStream.getReader();
  const chunks: Uint8Array[] = [];
  let done, value;
  while ((({ done, value } = await reader.read()), !done)) {
    chunks.push(value!);
  }

  // Step 5: Concatenate chunks and convert to a string
  const decompressedArray = new Uint8Array(
    chunks.reduce<number[]>((acc, chunk) => acc.concat(Array.from(chunk)), []),
  );
  const decoder = new TextDecoder();
  const originalString = decoder.decode(decompressedArray);

  return originalString;
}
