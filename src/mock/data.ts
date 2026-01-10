export interface Article {
  id: string;
  title: string;
  source: string;
  summary: string;
  url: string;
  publishedAt: string;
}

const articlePool: Article[] = [
  {
    id: "tech-1",
    title: "AI 기술, 2025년 헬스케어 산업 혁신 주도",
    source: "테크뉴스",
    summary:
      "인공지능 기술이 의료 진단과 치료 계획 수립에 혁신을 가져오고 있습니다. 딥러닝 기반 영상 분석으로 암 조기 진단율이 크게 향상되었습니다.",
    url: "#",
    publishedAt: "2025-10-20",
  },
  {
    id: "tech-2",
    title: "반도체 기업, 3나노 공정 양산 본격화",
    source: "산업일보",
    summary:
      "국내 반도체 기업들이 3나노 공정 기술의 양산을 본격화하며 글로벌 시장에서 경쟁력을 강화하고 있습니다.",
    url: "#",
    publishedAt: "2025-10-20",
  },
  {
    id: "tech-3",
    title: "클라우드 컴퓨팅 시장 연간 30% 성장 전망",
    source: "디지털타임스",
    summary:
      "기업들의 디지털 전환 가속화로 클라우드 서비스 수요가 급증하며 관련 시장이 빠르게 성장하고 있습니다.",
    url: "#",
    publishedAt: "2025-10-20",
  },
  {
    id: "tech-4",
    title: "양자컴퓨터 상용화, 5년 내 현실화 전망",
    source: "미래과학",
    summary:
      "양자컴퓨터 기술 발전으로 복잡한 암호화 해독과 신약 개발 시뮬레이션이 획기적으로 개선될 것으로 예상됩니다.",
    url: "#",
    publishedAt: "2025-10-20",
  },
  {
    id: "tech-5",
    title: "자율주행차, 도심 시범 운행 확대",
    source: "모빌리티뉴스",
    summary:
      "레벨4 자율주행 기술을 탑재한 차량들이 주요 도심에서 시범 운행을 확대하며 상용화에 한 발 다가섰습니다.",
    url: "#",
    publishedAt: "2025-10-20",
  },
  {
    id: "tech-6",
    title: "메타버스 플랫폼, 교육 분야 활용 증가",
    source: "에듀테크",
    summary:
      "가상현실 기반 교육 콘텐츠가 학습 몰입도와 이해도를 높이며 새로운 교육 패러다임을 제시하고 있습니다.",
    url: "#",
    publishedAt: "2025-10-20",
  },

  // 금융 카테고리
  {
    id: "finance-1",
    title: "디지털 화폐 도입, 금융 시스템 변화 예고",
    source: "경제신문",
    summary:
      "중앙은행 디지털화폐(CBDC) 도입이 본격화되며 전통적인 금융 시스템에 큰 변화가 예상됩니다.",
    url: "#",
    publishedAt: "2025-10-20",
  },
  {
    id: "finance-2",
    title: "ESG 투자, 기관 투자자 사이 필수 전략으로",
    source: "투자일보",
    summary:
      "환경·사회·지배구조를 고려한 ESG 투자가 주류로 자리잡으며 기업 평가 기준이 변화하고 있습니다.",
    url: "#",
    publishedAt: "2025-10-20",
  },
  {
    id: "finance-3",
    title: "핀테크 기업, 전통 은행 시장 점유율 확대",
    source: "금융타임스",
    summary:
      "디지털 뱅킹 서비스의 편의성과 낮은 수수료로 핀테크 기업들이 시장 점유율을 빠르게 확대하고 있습니다.",
    url: "#",
    publishedAt: "2025-10-20",
  },
  {
    id: "finance-4",
    title: "부동산 PF 대출 리스크 관리 강화",
    source: "부동산경제",
    summary:
      "금융당국이 부동산 프로젝트 파이낸싱 대출에 대한 리스크 관리를 강화하며 시장 안정화에 나섰습니다.",
    url: "#",
    publishedAt: "2025-10-20",
  },
  {
    id: "finance-5",
    title: "암호화폐 규제 프레임워크 마련",
    source: "블록체인뉴스",
    summary:
      "정부가 투자자 보호와 시장 투명성 확보를 위한 암호화폐 규제 방안을 발표했습니다.",
    url: "#",
    publishedAt: "2025-10-20",
  },
  {
    id: "finance-6",
    title: "연기금 대체투자 비중 확대 추세",
    source: "연금뉴스",
    summary:
      "국내 주요 연기금들이 안정적 수익 확보를 위해 인프라, 사모펀드 등 대체투자 비중을 늘리고 있습니다.",
    url: "#",
    publishedAt: "2025-10-20",
  },

  // 문화 카테고리
  {
    id: "culture-1",
    title: "K-드라마, 글로벌 스트리밍 차트 석권",
    source: "엔터뉴스",
    summary:
      "한국 드라마가 넷플릭스 글로벌 TOP 10에 여러 작품이 동시에 진입하며 한류 열풍을 이어가고 있습니다.",
    url: "#",
    publishedAt: "2025-10-20",
  },
  {
    id: "culture-2",
    title: "메가 콘서트 시대, 공연 산업 호황",
    source: "공연타임스",
    summary:
      "대형 아티스트들의 스타디움 투어가 연이어 성공하며 공연 산업이 팬데믹 이전 수준을 회복했습니다.",
    url: "#",
    publishedAt: "2025-10-20",
  },
  {
    id: "culture-3",
    title: "웹툰 원작 영화·드라마 제작 붐",
    source: "콘텐츠뉴스",
    summary:
      "인기 웹툰을 원작으로 한 영상 콘텐츠 제작이 활발해지며 새로운 IP 시장이 형성되고 있습니다.",
    url: "#",
    publishedAt: "2025-10-20",
  },
  {
    id: "culture-4",
    title: "미술관·박물관 관람객 증가 추세",
    source: "문화일보",
    summary:
      "예술에 대한 관심 증가로 주요 전시회와 문화 공간의 방문객 수가 크게 늘어나고 있습니다.",
    url: "#",
    publishedAt: "2025-10-20",
  },
  {
    id: "culture-5",
    title: "독서 인구 회복, 오디오북 기여 주목",
    source: "출판저널",
    summary:
      "출퇴근 시간에 듣는 오디오북 서비스가 인기를 끌며 독서 인구 증가에 기여하고 있습니다.",
    url: "#",
    publishedAt: "2025-10-20",
  },
  {
    id: "culture-6",
    title: "지역 축제 활성화로 관광객 유치",
    source: "지역뉴스",
    summary:
      "지자체별 특색있는 문화 축제가 관광 명소로 자리잡으며 지역 경제 활성화에 기여하고 있습니다.",
    url: "#",
    publishedAt: "2025-10-20",
  },
];

export function getArticlesByCategory(
  category: string,
  excludeIds: string[] = []
): Article[] {
  const filtered = articlePool
    .filter((article) => article.id.startsWith(category.toLowerCase()))
    .filter((article) => !excludeIds.includes(article.id));

  // 랜덤하게 섞어서 5개 반환
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5);
}

export const categories = [
  { value: "tech", label: "기술/IT" },
  { value: "finance", label: "금융/경제" },
  { value: "culture", label: "문화/예술" },
];
