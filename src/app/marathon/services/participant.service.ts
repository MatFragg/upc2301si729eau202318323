import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Participant } from '../model/participant.entity';
import { catchError, Observable, retry, throwError,map, pipe } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ParticipantService extends BaseService<Participant>
{
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/participants';
  }

  getWinner(): Observable<Participant> {
    return this.getAll().pipe(
      map(participants => participants.find(p => p.ranking === 1) || {} as Participant)
    );
  }

  getParticipantsByCenter(centerId: number): Observable<Participant[]> {
    return this.http.get<Participant[]>(`${this.basePath}/api/v1/centers/${centerId}/participants`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError),
        map(participants => participants.sort((a, b) => a.ranking - b.ranking))
      );
  }

  getAllTopParticipants(): Observable<Participant[]> {
    return this.getAll().pipe(
      map(participants => {
        const topParticipantsByCenter = new Map<number,Participant[]>();

        participants.forEach((participant: Participant) => {
          if(!topParticipantsByCenter.has(participant.centerId)) {
            topParticipantsByCenter.set(participant.centerId, []);
          }
          topParticipantsByCenter.get(participant.centerId)?.push(participant);
        });

        const topParticipants: Participant[] = [];
        topParticipantsByCenter.forEach((participants: Participant[]) => {
          const sortedParticipants = participants.sort((a, b) => a.ranking - b.ranking);
          topParticipants.push(...sortedParticipants.slice(0,7));
      });
        return topParticipants;
      }),
    )
  }

  getAllTopParticipantsByCenter(): Observable<Participant[]>{
  return this.getAll().pipe(
    map(participants => {
      const topParticipantsByCenter = new Map<number, Participant[]>();

      // Group participants by center
      participants.forEach((participant: Participant) => {
        if (!topParticipantsByCenter.has(participant.centerId)) {
          topParticipantsByCenter.set(participant.centerId, []);
        }
        topParticipantsByCenter.get(participant.centerId)?.push(participant);
      });

      const winners: Participant[] = [];
      // Get only rank 1 from each center
      topParticipantsByCenter.forEach((centerParticipants: Participant[]) => {
        const sortedParticipants = centerParticipants.sort((a, b) => a.ranking - b.ranking);
        if (sortedParticipants.length > 0) {
          winners.push(sortedParticipants[0]); // Add only the rank 1 participant
        }
      });

      return winners;
    })
  );
}

  convertTimeToSeconds(timeStr: string): number {
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }
}
