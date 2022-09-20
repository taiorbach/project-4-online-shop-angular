import { CategoryModel } from "./category.model"

export class ProductModel{
    public _id: string
    public name: string
    public price: number
    public image: File
    public imageName: string
    public categoryId: string
    public category: any
    
}