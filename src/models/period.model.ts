import type Mood from '@/models/mood.model';
import type Symptom from '@/models/symptom.model';

export interface PeriodModel {
  periodCycleInfo: {},
  moods: Mood[],
  symptoms: Symptom[],
}