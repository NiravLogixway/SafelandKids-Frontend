declare module 'sweet-pubsub' {
  interface PubSub {
    on(event: string, callback: (data: any) => void): void;
    off(event: string, callback: (data: any) => void): void;
    emit(event: string, data?: any): void;
  }

  const pubsub: PubSub;
  export default pubsub;
}
