export interface Exercise {
    day: string;
    exercises: string[];
}

export interface WorkoutRoutine {
    id: number;
    patientId: number;
    routine: Exercise[];
}
