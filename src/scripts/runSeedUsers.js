import { exec } from 'child_process';

console.log('Building TypeScript files...');
exec('npm run build', (error, stdout, stderr) => {
  if (error) {
    console.error(`Build error: ${error}`);
    return;
  }
  
  console.log('Build output:', stdout);
  if (stderr) console.error('Build stderr:', stderr);
  
  console.log('Running seed script...');
  exec('node dist/scripts/seedUsers.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Seed error: ${error}`);
      return;
    }
    
    console.log(stdout);
    if (stderr) console.error(stderr);
  });
});