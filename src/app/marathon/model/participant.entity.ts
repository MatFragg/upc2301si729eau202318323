export class Participant {
    id:number;
    firstName:string;
    lastName:string;
    photoUrl:string;
    centerId:number;
    ranking:number;
    recordTime:string;

    constructor(id:number, firstName:string, lastName:string, photoUrl:string, centerId:number, ranking:number, recordTime:string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.photoUrl = photoUrl;
        this.centerId = centerId;
        this.ranking = ranking;
        this.recordTime = recordTime;
    }
}
