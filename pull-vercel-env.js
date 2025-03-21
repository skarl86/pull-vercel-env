#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// 명령줄 인자 파싱
const args = process.argv.slice(2);
const argMap = {};
args.forEach((arg, index) => {
  if (arg.startsWith("--")) {
    if (arg === "--help") {
      argMap.help = true;
    } else if (arg === "--all") {
      argMap.all = true;
    } else {
      argMap[arg.replace("--", "")] = args[index + 1];
    }
  }
});

// --help 옵션 처리
if (argMap.help) {
  console.log(`
Usage: pull-vercel-env [options]

Options:
  --help               Display this help message.
  --output <filename>  Specify the output file name for environment variables (default: .env).
  --project <name>     Specify the Vercel project name if different from the repository name.
  --all                Download environment variables for production, preview, and development.

Examples:
  pull-vercel-env
  pull-vercel-env --output .env.local
  pull-vercel-env --project my-vercel-project
  pull-vercel-env --all
  `);
  process.exit(0);
}

// Vercel 프로젝트 이름 (명령줄 인자 --project)
const vercelProject = argMap.project;
// npx를 통해 전역 설치 없이 Vercel CLI 실행
const vercelCmd = "npx vercel";

try {
  console.log("🔍 Checking Vercel CLI authentication...");
  execSync(`${vercelCmd} whoami`, { stdio: "inherit" });

  console.log("\n🔗 Linking Vercel project...");
  let linkCommand = `${vercelCmd} link --confirm`;
  if (vercelProject) {
    linkCommand += ` --project ${vercelProject}`;
  }
  try {
    execSync(linkCommand, { stdio: "inherit" });
  } catch (linkError) {
    console.error(
      "\n⚠️ Failed to link the project. Please ensure it's set up correctly in Vercel."
    );
    process.exit(1);
  }

  // --all 옵션이 있을 경우 production, preview, development 모두 다운로드
  if (argMap.all) {
    const environments = [
      { name: "production", file: ".env.production" },
      { name: "preview", file: ".env.preview" },
      { name: "development", file: ".env.development" },
    ];

    environments.forEach(({ name, file }) => {
      const filePath = path.join(process.cwd(), file);
      const backupFilePath = `${filePath}.backup`;
      // 기존 파일 백업
      if (fs.existsSync(filePath)) {
        console.log(`\n📦 Backing up existing ${file} file to ${backupFilePath}...`);
        fs.renameSync(filePath, backupFilePath);
      }
      console.log(`\n🚀 Pulling ${name} environment variables into: ${file}...\n`);
      const vercelPullCommand = `${vercelCmd} env pull ${file} --yes --environment ${name}`;
      execSync(vercelPullCommand, { stdio: "inherit" });
      console.log(`✅ ${file} file successfully pulled and updated!`);
    });
  } else {
    // 기본 동작: --output 옵션 또는 기본 .env 파일 사용
    const outputFile = argMap.output || ".env";
    const filePath = path.join(process.cwd(), outputFile);
    const backupFilePath = `${filePath}.backup`;
    if (fs.existsSync(filePath)) {
      console.log(`\n📦 Backing up existing ${outputFile} file to ${backupFilePath}...`);
      fs.renameSync(filePath, backupFilePath);
    }
    console.log(`\n🚀 Pulling environment variables into: ${outputFile}...\n`);
    const vercelPullCommand = `${vercelCmd} env pull ${outputFile} --yes`;
    execSync(vercelPullCommand, { stdio: "inherit" });
    console.log(`✅ ${outputFile} file successfully pulled and updated!`);
  }
} catch (error) {
  console.error("\n❌ Failed to pull environment variables from Vercel.");
  console.error(error.message);
  process.exit(1);
}
