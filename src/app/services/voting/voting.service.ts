import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VotingService {
  private url = 'http://15.185.46.105:5030/api';

  constructor(private http:HttpClient) { }

  getAllVoteTypes() {
    return this.http.get(this.url + '/voting/types')
  }    
  
  getVotingQuestions(category: string, year: string) {
    return this.http.get(this.url + '/voting/questions/' + category + '/' + year)
  }    
  
  getVotingMembers(category: string, cpr: string) {
    return this.http.get(this.url + '/voting/members/' + category + '/' + cpr)
  }    

  getVotingQuestionWiseResults(category: string) {
    return this.http.get(this.url + '/voting/results/' + category)
  }    
  
  checkVotingNumber() {
    return this.http.get(this.url + '/voting/number')
  }  

  checkVotingStatus(membno: string, category: string, year: string) {
    return this.http.get(this.url + '/voting/member/check/' + membno + '/' + category + '/' + year)
  }  

  submitVote(year: string, memberno: string, category: string, no: string, item: string, engDesc: string, araDesc: string, voted: string, votedby: string, membertype: string) {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
      const newTran = {
        year: year,
        memberno: memberno, 
        category: category,
        no: no,
        item: item,
        engDesc: engDesc,
        araDesc: araDesc,
        voted: voted,
        votedby: votedby,
        membertype: membertype
      }
      return this.http.post(this.url + '/vote/submit', JSON.stringify(newTran), { headers: headers })
    }

  updateVote(year: string, memberno: string, category: string, no: string, voted: string) {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
      const newTran = {
        year: year,
        memberno: memberno, 
        category: category,
        no: no,
        voted: voted
      }
      return this.http.post(this.url + '/vote/update', JSON.stringify(newTran), { headers: headers })
    }

  
}
