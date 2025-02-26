#!/usr/bin/env node

const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

// 명령줄 인자 파싱
const args = process.argv.slice(2)
const argMap = {}
args.forEach((arg, index) => {
  if (arg.startsWith("--")) {
    argMap[arg.replace("--", "")] = args[index + 1]
  }
})

// 환경 변수 설정
const OUTPUT_FILE = argMap.output || ".env"
const ENV_FILE_PATH = path.join(process.cwd(), OUTPUT_FILE)
const BACKUP_ENV_FILE_PATH = `${ENV_FILE_PATH}.backup`

try {
  console.log("🔍 Checking Vercel CLI authentication...")
  execSync("vercel whoami", { stdio: "inherit" })

  console.log("\n🔗 Checking Vercel project link...")
  try {
    execSync("vercel link --confirm", { stdio: "inherit" })
  } catch (linkError) {
    console.error(
      "\n⚠️ Failed to link the project. Please ensure it's set up correctly in Vercel."
    )
    process.exit(1)
  }

  // 기존 환경 변수 파일이 존재하는 경우에만 백업
  if (fs.existsSync(ENV_FILE_PATH)) {
    console.log(
      `\n📦 Backing up existing ${OUTPUT_FILE} file to ${BACKUP_ENV_FILE_PATH}...`
    )
    fs.renameSync(ENV_FILE_PATH, BACKUP_ENV_FILE_PATH)
  }

  console.log(`\n🚀 Pulling environment variables into: ${OUTPUT_FILE}...\n`)
  const vercelCommand = `vercel env pull ${OUTPUT_FILE} --yes`
  execSync(vercelCommand, { stdio: "inherit" })

  console.log(`✅ ${OUTPUT_FILE} file successfully pulled and updated!`)
} catch (error) {
  console.error("\n❌ Failed to pull environment variables from Vercel.")
  console.error(error.message)
  process.exit(1)
}
