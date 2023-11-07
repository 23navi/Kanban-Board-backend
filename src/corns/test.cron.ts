import cron from 'node-cron';

// Cron job to delete expired sessions where session.valid = false
const testCron = () => {
  cron.schedule(
    '*/5 * * * * *',
    () => {
      console.log('hello');
    },
    {
      timezone: 'Asia/Kolkata',
    },
  );
};

export default testCron;
