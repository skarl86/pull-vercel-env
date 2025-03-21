# pull-vercel-env

🚀 **pull-vercel-env**는 Vercel 프로젝트의 환경 변수를 로컬 환경 파일로 자동으로 가져오는 CLI 도구입니다.

## 📌 기능

- **자동 Vercel 프로젝트 연결 (`vercel link`)**
- **환경 변수 다운로드**
  - 기본: 단일 파일(기본은 `.env`)
  - `--all` 옵션: production, preview, development 환경 변수 각각을 `.env.production`, `.env.preview`, `.env.development` 파일로 다운로드
- **기존 환경 변수 파일이 존재하면 자동 백업**
- **npx를 통해 전역 설치 없이 최신 Vercel CLI를 사용**
- **깃허브 저장소 이름과 Vercel 프로젝트 이름이 다른 경우, `--project` 옵션으로 명시적 지정 가능**
- **`--help` 옵션으로 사용법 및 옵션 안내 제공**

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

또는 별도 설치 없이 `npx`로 실행할 수 있습니다.

```sh
npx pull-vercel-env
```

---

## 🚀 사용법

### **기본 실행**

현재 Vercel 프로젝트의 환경 변수를 기본 파일(`.env`)로 가져옵니다.

```sh
pull-vercel-env
```

또는

```sh
npx pull-vercel-env
```

### **특정 환경 파일로 다운로드**

특정 파일명으로 환경 변수를 다운로드할 경우, `--output` 옵션을 사용합니다.

```sh
pull-vercel-env --output .env.local
```

✅ 위 명령어는 `.env.local` 파일을 생성합니다.

### **특정 Vercel 프로젝트 지정**

깃허브 저장소 이름과 Vercel 프로젝트 이름이 다를 경우, `--project` 옵션을 사용해 원하는 Vercel 프로젝트를 지정할 수 있습니다.

```sh
pull-vercel-env --project my-vercel-project
```

### **production, preview, development 환경 모두 다운로드**

`--all` 옵션을 사용하면 production, preview, development 환경 변수를 각각 `.env.production`, `.env.preview`, `.env.development` 파일로 다운로드합니다.

```sh
pull-vercel-env --all
```

### **도움말 확인**

`--help` 옵션을 사용하면 사용법과 옵션 설명을 확인할 수 있습니다.

```sh
pull-vercel-env --help
```

---

## 🎯 CLI 옵션

| 옵션        | 설명                                                                              | 예제                          |
| ----------- | --------------------------------------------------------------------------------- | ----------------------------- |
| `--help`    | 사용법과 옵션 설명을 출력합니다.                                                  | `pull-vercel-env --help`      |
| `--output`  | 생성할 환경 변수 파일 이름을 지정합니다. (기본값: `.env`)                         | `--output .env.local`         |
| `--project` | Vercel 프로젝트 이름을 지정합니다 (깃허브 저장소와 다른 경우 사용).               | `--project my-vercel-project` |
| `--all`     | production, preview, development 세 환경의 변수들을 각각의 파일로 다운로드합니다. | `pull-vercel-env --all`       |

**예제 실행**

```sh
pull-vercel-env --output .env.production --project my-vercel-project
```

✅ 지정한 Vercel 프로젝트에 대해 `.env.production` 파일로 환경 변수를 가져옵니다.

---

## 🛠 개발 환경에서 테스트

### **로컬에서 직접 실행**

```sh
node pull-vercel-env.js --output .env.local --project my-vercel-project
```

### **전역 CLI 등록 (`npm link`)**

```sh
npm link
```

그 후 아래 명령어로 CLI를 직접 실행할 수 있습니다.

```sh
pull-vercel-env --all
```

---

## 💡 내부 동작 방식

1. `npx vercel whoami` 실행 → Vercel CLI 로그인 여부 확인
2. `npx vercel link --confirm` 실행 → 프로젝트가 연결되지 않은 경우 자동 연결
   - `--project` 옵션을 제공하면 지정한 Vercel 프로젝트로 연결합니다.
3. 환경 변수 다운로드:
   - 기본 동작: `npx vercel env pull <파일명> --yes` 실행
   - `--all` 옵션 사용 시: 각각 `production`, `preview`, `development` 환경 변수 파일 다운로드 (`--environment` 옵션 사용)
4. 기존 환경 변수 파일이 있을 경우, 해당 파일을 백업(`.backup` 확장자 추가) 후 덮어씁니다.

---

## 📌 Vercel 프로젝트가 연결되지 않은 경우?

✅ **자동으로 `vercel link`가 실행됩니다.**  
📌 처음 실행할 때 Vercel 프로젝트를 선택해 주세요.

수동으로 프로젝트를 연결하려면:

```sh
npx vercel link
```

---

## 📝 라이선스

MIT License  
© 2024 Namgee Lee
