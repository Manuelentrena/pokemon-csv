type PromiseResult<T> =
  | { status: 'fulfilled'; value: T }
  | { status: 'rejected'; reason: unknown };

export async function promiseAllSafe<T>(
  promises: Promise<T>[],
): Promise<{ fulfilled: T[]; rejected: unknown[] }> {
  const results: PromiseResult<T>[] = await Promise.all(
    promises.map((p) =>
      p.then(
        (value): PromiseResult<T> => ({ status: 'fulfilled', value }),
        (reason: unknown): PromiseResult<T> => ({ status: 'rejected', reason }),
      ),
    ),
  );

  const fulfilled: T[] = [];
  const rejected: unknown[] = [];

  for (const result of results) {
    if (result.status === 'fulfilled') {
      fulfilled.push(result.value);
    } else {
      rejected.push(result.reason);
    }
  }

  return { fulfilled, rejected };
}
