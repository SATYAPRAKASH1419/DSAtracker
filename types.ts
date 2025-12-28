
export enum MasteryLevel {
  NOT_STARTED = 'NOT_STARTED',
  NEEDS_PRACTICE = 'NEEDS_PRACTICE',
  PRACTICING = 'PRACTICING',
  MASTERED = 'MASTERED'
}

export interface SubTopic {
  id: string;
  name: string;
  mastery: MasteryLevel;
  notes: string;
}

export interface Chapter {
  id: string;
  title: string;
  subTopics: SubTopic[];
}

export interface ProgressSummary {
  level: MasteryLevel;
  count: number;
  color: string;
}
