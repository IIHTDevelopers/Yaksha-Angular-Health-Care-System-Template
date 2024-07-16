export interface Meal {
    day: string;
    meals: string[];
}

export interface MealPlan {
    id: number;
    patientId: number;
    plan: any[];
}
