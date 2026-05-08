# Stitch MCP 설정 체크리스트

Stitch MCP가 연결되지 않거나 디자인 도구 호출이 막히면, 코드 설정을 의심하기 전에 Google Cloud 프로젝트 선택과 Stitch API 사용 설정을 먼저 확인합니다.

## 1. 올바른 Google Cloud 프로젝트 선택

1. [Stitch API 페이지](https://console.cloud.google.com/apis/library/stitch.googleapis.com)를 엽니다.
2. 상단 프로젝트 선택기에서 실습에 사용하는 Google Cloud 프로젝트가 선택되어 있는지 확인합니다.
3. 개인 프로젝트, 조직 프로젝트, 실습용 프로젝트를 번갈아 사용했다면 프로젝트가 잘못 선택되어 있을 가능성이 큽니다.

## 2. Stitch API 사용 설정 확인

1. Stitch API 페이지에서 `사용 설정` 버튼이 보이면 아직 API가 활성화되지 않은 상태입니다.
2. `사용 설정`을 눌러 API를 활성화합니다.
3. 버튼이 `관리` 또는 비슷한 관리 화면 진입 버튼으로 보이면 API는 이미 활성화된 상태입니다.

일반적인 핸즈온 실습에서는 위 화면에서 `사용 설정`을 누르는 것으로 충분합니다.

## 3. 버튼이 비활성화되거나 접근이 막힐 때

GDG 핸즈온 실습에서는 보통 복잡한 IAM 설정을 직접 다루지 않습니다. API 사용 설정 버튼이 보이지 않거나 비활성화되어 있다면 먼저 아래를 확인합니다.

1. Google Cloud Console 상단의 프로젝트가 실습에서 사용하는 프로젝트인지 확인합니다.
2. Google 계정이 여러 개라면 실습에 사용하는 계정으로 로그인되어 있는지 확인합니다.
3. 조직이나 회사 계정에서 제한이 걸려 있다면 개인 실습 프로젝트 또는 안내받은 실습 프로젝트로 전환합니다.

## 4. 다시 시도하기

프로젝트 선택과 API 사용 설정을 확인한 뒤 MCP 클라이언트 또는 에이전트 환경을 다시 시작하고 Stitch MCP 호출을 다시 시도합니다. 같은 문제가 반복되면 Google Cloud Console에서 선택한 프로젝트와 MCP에서 사용하는 계정이 같은지 다시 확인합니다.

## 참고

- [Google Cloud Service Usage: Enable and disable services](https://docs.cloud.google.com/service-usage/docs/enable-disable)
