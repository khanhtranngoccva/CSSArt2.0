export default async function waitNextAnimationFrame() {
  const f1 = performance.now();
  const f2 = await new Promise<number>((resolve) => {
    requestAnimationFrame((timestamp) => {
      resolve(timestamp);
    })
  });
  return f2 - f1;
}
