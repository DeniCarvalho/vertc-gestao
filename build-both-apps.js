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

function startDesignSystemPackage() {
  return new Promise((resolve, reject) => {
    // Design system
    const designSystemPackage = exec(
      'npx pnpm --filter @vertc/design-system build'
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
      console.log(`design-system: build finished ${code}`);
      reject();
    });
  });
}

function startDashboardApp() {
  // Dashboard
  const dashboardApp = exec('npx pnpm --filter @vertc/dashboard build');
  dashboardApp.stdout.on('data', (data) => {
    if (data?.trim()) {
      data = transformLog(data);
      process.stdout.write(
        `${chalk.bgHex('#44a9c6').bold('dashboard:')} ${data}`
      );
    }
  });
  dashboardApp.stderr.on('data', (data) => {
    console.error(`dashboard error: ${data}`);
    reject();
  });
  dashboardApp.on('exit', (code) => {
    console.log(`dashboard: build finished ${code}`);
  });
}

function startAreaLogadaApp() {
  // Area logada
  const areaLogadaApp = exec('npx pnpm --filter @vertc/area-logada build');
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

  areaLogadaApp.on('exit', (code) => {
    console.log(`area-logada: build finished ${code}`);
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

  await startDesignSystemPackage();

  if (apps.length === 0 || apps.includes('dashboard')) startDashboardApp();
  if (apps.length === 0 || apps.includes('area-logada')) startAreaLogadaApp();
}

devBothApps().catch((err) => {
  console.error('Erro ao inicializar apps:', err);
});