import type Mood from '@/models/mood.model';
import type Symptom from '@/models/symptom.model';

export interface PeriodInfoModel {
  id: number;
  from: string;
  predictedTo: string;
  to?: string;
}

export interface PeriodModel {
  periodCycleInfo: PeriodInfoModel,
  moods: Mood[],
  symptoms: Symptom[],
}