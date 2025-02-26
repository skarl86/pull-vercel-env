# pull-vercel-env

🚀 **pull-vercel-env**는 Vercel 프로젝트의 환경 변수를 로컬 환경 파일(`.env`)로 자동으로 가져오는 CLI 도구입니다.

## 📌 기능

- **자동 Vercel 프로젝트 연결 (`vercel link`)**
- **환경 변수(`.env`, `.env.local`, `.env.production` 등) 자동 다운로드**
- **기존 `.env` 파일이 존재하면 자동 백업**
- **CLI에서 간편하게 실행 가능**

---

## 🛠 설치 방법

### 1️⃣ **npm 패키지로 설치 (전역)**

```sh
npm install -g pull-vercel-env
```

### 2️⃣ **로컬 개발용 설치**

```sh
npm install pull-vercel-env --save-dev
```

---

## 🚀 사용법

### **기본 실행**

현재 Vercel 프로젝트의 환경 변수를 `.env` 파일로 가져옵니다.

```sh
pull-vercel-env
```

### **특정 환경(`production`, `preview`, `development`) 변수 가져오기**

```sh
pull-vercel-env --output .env.local
```

✅ 위 명령어는 `.env.local` 파일을 생성합니다.

---

## 🎯 CLI 옵션

| 옵션       | 설명                            | 예제                  |
| ---------- | ------------------------------- | --------------------- |
| `--output` | 생성할 환경 변수 파일 이름 지정 | `--output .env.local` |

**예제 실행**

```sh
pull-vercel-env --output .env.production
```

✅ `.env.production` 파일로 환경 변수를 가져옵니다.

---

## 🛠 개발 환경에서 테스트

### **로컬에서 직접 실행**

```sh
node pull-vercel-env.js --output .env.local
```

### **전역 CLI 등록 (`npm link`)**

```sh
npm link
```

이제 아래 명령어를 CLI에서 직접 실행할 수 있습니다.

```sh
pull-vercel-env --output .env.local
```

---

## 💡 내부 동작 방식

1. `vercel whoami` 실행 → Vercel CLI 로그인 여부 확인
2. `vercel link --confirm` 실행 → 프로젝트가 연결되지 않은 경우 자동 연결
3. `vercel env pull <파일명>` 실행 → Vercel에서 환경 변수를 가져와 로컬 `.env` 파일 생성
4. 기존 `.env` 파일이 있을 경우 `.env.backup`으로 백업 후 덮어쓰기

---

## 📌 Vercel 프로젝트가 연결되지 않은 경우?

✅ **자동으로 `vercel link`가 실행됩니다.**
📌 처음 실행할 때 Vercel 프로젝트를 선택해 주세요.

수동으로 프로젝트를 연결하려면:

```sh
vercel link
```

---

## 📝 라이선스

MIT License
© 2024 Your Name
