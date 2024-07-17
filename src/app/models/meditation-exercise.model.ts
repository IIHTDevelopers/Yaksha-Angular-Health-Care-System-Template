export interface MeditationExercise {
    id: number;
    patientId: number;
    exercises: {
        title: string;
        description: string;
        resources: string[];
    }[];
}
