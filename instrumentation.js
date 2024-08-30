import connectMongoDB from './lib/utils';

export async function register() {
  await connectMongoDB();

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await require('pino')
    await require('next-logger')
  }
}