import { exec } from 'child_process';
import chalk from 'chalk';

function transformLog(data) {
  const isInfo = data.includes('[info]');
  if (isInfo)
    data = data.replace('[info]', chalk.hex('#394b5f').bold('[info]'));

  const isWarn = data.includes('[warn]');
  if (isWarn)
    data = data.replace('[warn]', chalk.hex('#f5a623').bold('[warn]'));

  const isError = data.includes('[error]');
  if (isError)
    data = data.replace('[error]', chalk.hex('#d0021b').bold('[error]'));

  const isServerUp = data.includes('[remix-serve]');
  if (isServerUp)
    data = data.replace(
      '[remix-serve]',
      chalk.hex('#14ce06').bold('[remix-serve]')
    );
  return data;
}

function isFinished(data) {
  const isServerUp = data?.includes('[remix-serve]');
  if (isServerUp) return true;
  return false;
}

function startDashboardApp() {
  return new Promise((resolve, reject) => {
    // Dashboard
    const dashboardApp = exec('npx pnpm --filter dashboard dev');
    dashboardApp.stdout.on('data', (data) => {
      if (data?.trim()) {
        data = transformLog(data);
        process.stdout.write(
          `${chalk.bgHex('#44a9c6').bold('dashboard:')} ${data}`
        );
      }
      if (isFinished(data)) resolve();
    });
    dashboardApp.stderr.on('data', (data) => {
      console.error(`dashboard error: ${data}`);
    });
    dashboardApp.on('exit', (code) => {
      console.log(`dashboard exited with code ${code}`);
      reject();
    });
  });
}

function startAreaLogadaApp() {
  // Area logada
  const areaLogadaApp = exec('npx pnpm --filter area-logada dev');
  areaLogadaApp.stdout.on('data', (data) => {
    if (data?.trim()) {
      data = transformLog(data);
      process.stdout.write(
        `${chalk.bgHex('#44c66b').bold('area-logada:')} ${data}`
      );
    }
  });
  areaLogadaApp.stderr.on('data', (data) => {
    console.error(`area-logada error: ${data}`);
  });
}

async function startBothApps() {
  await startDashboardApp();
  startAreaLogadaApp();
}

startBothApps().catch((err) => {
  console.error('Erro ao inicializar apps:', err);
});
