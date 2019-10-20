import Bee from 'bee-queue';
import AnswerMail from '../app/jobs/AnswerMail';
import redisConfig from '../config/redis';

const jobs = [AnswerMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, error) {
    console.log(`Queue ${job.queue.name}: FAILED`, error);
  }
}

export default new Queue();
