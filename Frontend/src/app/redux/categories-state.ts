import { CategoryModel } from "../models/category.model";


export class CategoriesState{
    public categories: CategoryModel[] = []
    
}

export enum CategoriesActionType{
    FetchCategories = "FetchCategories"
}

export interface CategoriesAction{
    type: CategoriesActionType,
    payload: any
}

export function fetchCategoriesAction(categories: CategoryModel[]): CategoriesAction {
    return { type: CategoriesActionType.FetchCategories, payload: categories}
}


export function categoriesReducer(currentState = new CategoriesState(), action: CategoriesAction): CategoriesState{
    const newState = {...currentState}

    switch(action.type){
        case CategoriesActionType.FetchCategories:
            newState.categories = action.payload
            break
     
    }

    return newState
}