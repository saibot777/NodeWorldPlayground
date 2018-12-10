export class TourModel {
    id: string | number;
    location: string;
    tourTitle: string;
    constructor(data: any) {
        this.id = data.id;
        this.location = data.location;
        this.tourTitle = data.tourTitle;
    }
}