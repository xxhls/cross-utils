import { unstable_requestPaint, unstable_scheduleCallback, unstable_NormalPriority } from 'scheduler';

class IdleQueue {
    private queue: { method: (...args: any[]) => void; args: any[] }[] = [];
    private executing: boolean = false;
  
    add(method: (...args: any[]) => void,...args: any[]) {
      this.queue.push({ method, args });
      if (!this.executing) {
        this.executeNext();
      }
    }
  
    private executeNext() {
      if (this.queue.length > 0) {
        const { method, args } = this.queue.shift()!;
        method(...args);
        this.executing = true;
        // requestIdleCallback(() => {
         
        // });
        unstable_scheduleCallback(unstable_NormalPriority, () => {
            // console.log('This is a low-priority callback');
            this.executing = false;
            this.executeNext();
        });
      }
    }
}

export default new IdleQueue();
  
//   // Usage example
//   const idleQueue = new IdleQueue();
  
//   function methodA(param: string) {
//     console.log(`Method A called with param: ${param}`);
//   }
  
//   // Add methods to the queue
//   idleQueue.add(methodA, 'param1');
//   idleQueue.add(methodA, 'param2');
//   idleQueue.add(methodA, 'param3');
  