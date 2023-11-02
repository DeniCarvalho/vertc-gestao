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

function isFinished(data, tag = '[remix-serve]') {
  const isServerUp = data?.includes(tag);
  if (isServerUp) return true;
  return false;
}

function startCommonPackage() {
  return new Promise((resolve, reject) => {
    // Common
    const CommonPackage = exec('npx pnpm --filter vertc-common dev');
    CommonPackage.stdout.on('data', (data) => {
      if (data?.trim()) {
        data = transformLog(data);
        process.stdout.write(
          `${chalk.bgHex('#4c51c4').bold('common:')} ${data}`
        );
      }
      if (isFinished(data, '[closeCommon]')) resolve();
    });
    CommonPackage.stderr.on('data', (data) => {
      console.error(`common error: ${data}`);
      reject();
    });

    CommonPackage.on('exit', (code) => {
      console.log(`common: exited with code ${code}`);
      reject();
    });
  });
}

function startDesignSystemPackage() {
  return new Promise((resolve, reject) => {
    // Design system
    const designSystemPackage = exec(
      'npx pnpm --filter vertc-design-system dev'
    );
    designSystemPackage.stdout.on('data', (data) => {
      if (data?.trim()) {
        data = transformLog(data);
        process.stdout.write(
          `${chalk.bgHex('#c644a9').bold('design-system:')} ${data}`
        );
      }
      if (isFinished(data, '[closeBundle]')) resolve();
    });
    designSystemPackage.stderr.on('data', (data) => {
      console.error(`design-system error: ${data}`);
      reject();
    });

    designSystemPackage.on('exit', (code) => {
      console.log(`design-system: exited with code ${code}`);
      reject();
    });
  });
}

function startDashboardApp() {
  return new Promise((resolve, reject) => {
    // Dashboard
    const dashboardApp = exec('npx pnpm --filter @vertc/dashboard dev');
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
      reject();
    });
    dashboardApp.on('exit', (code) => {
      console.log(`dashboard: exited with code ${code}`);
      reject();
    });
  });
}

function startAreaLogadaApp() {
  return new Promise((resolve, reject) => {
    // Area logada
    const areaLogadaApp = exec('npx pnpm --filter @vertc/area-logada dev');
    areaLogadaApp.stdout.on('data', (data) => {
      if (data?.trim()) {
        data = transformLog(data);
        process.stdout.write(
          `${chalk.bgHex('#44c66b').bold('area-logada:')} ${data}`
        );
      }
      if (isFinished(data)) resolve();
    });
    areaLogadaApp.stderr.on('data', (data) => {
      console.error(`area-logada error: ${data}`);
      reject();
    });

    areaLogadaApp.on('exit', (code) => {
      console.log(`area-logada: exited with code ${code}`);
      reject();
    });
  });
}

async function devBothApps() {
  const args = process.argv.slice(2);
  let apps = [];

  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--apps=')) {
      apps = args[i].split('=')[1].split(',');
    }
  }

  await startCommonPackage();
  await startDesignSystemPackage();

  if (apps.length === 0 || apps.includes('dashboard'))
    await startDashboardApp();
  if (apps.length === 0 || apps.includes('area-logada'))
    await startAreaLogadaApp();
}

devBothApps().catch((err) => {
  console.error('Erro ao inicializar apps:', err);
});
