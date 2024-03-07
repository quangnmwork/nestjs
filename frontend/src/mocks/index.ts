export async function initMocks(): Promise<void> {
  console.log('Typeof', typeof window);

  if (typeof window === 'undefined') {
    console.log('Mock server listening');
    const { server } = await import('./server');
    server.listen();
  } else {
    console.log('Mock worker listening');
    const { worker } = await import('./browser');
    worker.start();
  }
}

initMocks();

export {};
