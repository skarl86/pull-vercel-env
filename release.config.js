module.exports = {
  branches: ["main"],
  plugins: [
    "@semantic-release/commit-analyzer", // 커밋 메시지를 분석하여 버전 업데이트 유형 결정
    "@semantic-release/release-notes-generator", // 변경 사항을 기반으로 릴리스 노트 생성
    "@semantic-release/changelog", // CHANGELOG.md 파일을 자동 업데이트
    "@semantic-release/npm", // NPM 패키지 버전 업데이트 및 배포
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "CHANGELOG.md"], // 변경된 파일을 커밋
        message: "chore(release): ${nextRelease.version} [skip ci]",
      },
    ],
    "@semantic-release/github", // GitHub 릴리스 생성 및 태그 추가
  ],
}
