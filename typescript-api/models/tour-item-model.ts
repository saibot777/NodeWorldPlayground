import { ToursListModel } from "./tours-list-model";
import { Review } from "./review-model";

export class TourItemModel extends ToursListModel {
    tourCategory: string;
    tourDescription: string;
    price: number;
    currency: string;
    reviews: Review[];
    constructor(tourData: any, reviewData: any) {
        super(tourData);
        this.tourCategory = tourData.tourCategory;
        this.tourDescription = tourData.tourDescription;
        this.price = tourData.price;
        this.currency = tourData.currency;
        this.reviews = reviewData.map((item) => new Review(item));
    }
}