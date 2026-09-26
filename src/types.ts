export type FocusTab = 'backend' | 'systems' | 'math';

export interface TelemetryBar {
  name: string;
  val: string;
  numericVal: number;
  detail: string;
  meta: string;
  grad: string;
}

export interface TelemetryBadge {
  text: string;
  bg: string;
  textCol: string;
  border: string;
}

export interface FocusTabData {
  score: string;
  numericScore: number;
  label: string;
  offset: number;
  title: string;
  desc: string;
  badges: TelemetryBadge[];
  bars: TelemetryBar[];
}

export interface ProjectData {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  metric: string;
  metricColor: string;
  description: string;
  highlights: string[];
  tags: string[];
  ctaText: string;
}

export interface LeadershipRole {
  title: string;
  org: string;
  category: string;
  badgeGrad: string;
  description: string;
  stack: string;
  metric: string;
  metricColor?: string;
}

export interface AcademicSemester {
  sem: string;
  label: string;
  sgpa: number;
  credits: number;
  highlight: string;
}
