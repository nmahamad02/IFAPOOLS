import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CrmService {
  private url = 'http://15.185.46.105:5030/api';

  constructor(private http:HttpClient) { }

  getAllMembers() {
    return this.http.get(this.url + '/members')
  }    
  
  upDateMemberDate() {
    return this.http.get(this.url + '/update/member/date')
  }  

  getMemberFromCPR(cprno: string) {
    return this.http.get(this.url + '/member/' + cprno)
  }  

  getProxyFromCPR(cprno: string) {
    return this.http.get(this.url + '/proxy/' + cprno)
  }    
  
  checkProxy(cprno: string) {
    return this.http.get(this.url + '/proxy/check/' + cprno)
  }  

  postMember(Mid: string, MemberNo: string, REFMEMBNO: string, NAME: string, MEMBTYPE: string, ADD1: string, ADD2: string, ADD3: string, TELOFF: string, TELRES: string,Email: string, CPRNo: string,isPrimary: string,image: string, primaryMember: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      Mid: Mid,
      MemberNo: MemberNo, 
      REFMEMBNO: REFMEMBNO,
      NAME: NAME,
      MEMBTYPE: MEMBTYPE,
      ADD1: ADD1,
      ADD2: ADD2,
      ADD3: ADD3,
      TELOFF: TELOFF, 
      TELRES: TELRES,
      Email: Email,
      CPRNo: CPRNo,
      isPrimary: isPrimary,
      image:image,
      primaryMember: primaryMember,
    }
    return this.http.post(this.url + '/member/new', JSON.stringify(newTran), { headers: headers })
  }

  updateMember(Mid: string, MemberNo: string, REFMEMBNO: string, NAME: string, MEMBTYPE: string, ADD1: string, ADD2: string, ADD3: string, TELOFF: string, TELRES: string,Email: string, CPRNo: string,isPrimary: string,image: string, primaryMember: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      Mid: Mid,
      MemberNo: MemberNo, 
      REFMEMBNO: REFMEMBNO,
      NAME: NAME,
      MEMBTYPE: MEMBTYPE,
      ADD1: ADD1,
      ADD2: ADD2,
      ADD3: ADD3,
      TELOFF: TELOFF, 
      TELRES: TELRES,
      Email: Email,
      CPRNo: CPRNo,
      isPrimary: isPrimary,
      image:image,
      primaryMember: primaryMember,
    }
    return this.http.post(this.url + '/member/update', JSON.stringify(newTran), { headers: headers })
  }

  getLandLordFromCPR(cprno: string) {
    return this.http.get(this.url + '/landlord/cpr/' + cprno)
  }

  postLandlord(landLordId: string, fullname: string, add1: string, add2: string, add3: string, phone1: string, phone2: string, mobile: string, email: string,contactPerson: string, contactMobile: string,cpr: string,active: string, createUser: string, createDate: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      landLordId: landLordId,
      name: fullname,
      add1: add1,
      add2: add2,
      add3: add3,
      phone1: phone1,
      phone2: phone2,
      mobile: mobile, 
      email: email,
      contactPerson: contactPerson,
      contactMobile: contactMobile,
      cpr: cpr,
      active:active,
      createUser: createUser,
      createDate: createDate,
    }
    return this.http.post(this.url + '/landlord/new', JSON.stringify(newTran), { headers: headers })
  }

  updateLandLord(landLordId: string, fullname: string, add1: string, add2: string, add3: string, phone1: string, phone2: string, mobile: string, email: string,contactPerson: string, contactMobile: string,cpr: string,active: string, editUser: string, editDate: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      landLordId: landLordId,
      name: fullname,
      add1: add1,
      add2: add2,
      add3: add3,
      phone1: phone1,
      phone2: phone2,
      mobile: mobile, 
      email: email,
      contactPerson: contactPerson,
      contactMobile: contactMobile,
      cpr: cpr,
      active:active,
      editUser: editDate,
      editDate: editDate,
    }
    return this.http.post(this.url + '/landlord/update', JSON.stringify(newTran), { headers: headers })
  }

  getAllUnits(){
    return this.http.get(this.url + '/units')
  }
  
  getAllEligibleUnits(){
    return this.http.get(this.url + '/units/eligible')
  }
  
  getAllNonEligibleUnits(){
    return this.http.get(this.url + '/units/non-eligible')
  }  
  
  getAllProperties(){
    return this.http.get(this.url + '/properties')
  }
  
  getAllPropertyWiseLandlords(){
    return this.http.get(this.url + '/properties/landlords')
  }
  
  getLandlordWiseProperties(memberno: string){
    return this.http.get(this.url + '/property/' + memberno)
  }

  getAllDocuments(memberno: string, houseno: string) {
    return this.http.get(this.url + '/document/' + memberno + '/' + houseno)
  }  
  
  checkCprDoc(membno: string) {
    return this.http.get(this.url + '/document/check/cpr/' + membno)
  }  
  
  checkTitleDeedDoc(membno: string) {
    return this.http.get(this.url + '/document/check/titleDeed/' + membno)
  }  
  
  checkProxyDoc(membno: string) {
    return this.http.get(this.url + '/document/check/proxy/' + membno)
  }

  addNewDocument(memberno: string, houseno: string, documentname: string, documenttype: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      memberno: memberno,
      houseno: houseno,
      documentname: documentname,
      documenttype: documenttype
    }
    return this.http.post(this.url + '/document/new', JSON.stringify(newTran), { headers: headers })
  }

  deleteDocument(memberno: string, houseno: string) {
    return this.http.get(this.url + '/document/delete/' + memberno + '/' + houseno)
  }

  getAllActiveMembers() {
    return this.http.get(this.url + '/members/active')
  }

  getAllEligibleMembers() {
    return this.http.get(this.url + '/members/eligible')
  }

  getAllRegisteredMembers() {
    return this.http.get(this.url + '/members/registered')
  }

  getAllProxyMembers() {
    return this.http.get(this.url + '/members/proxy')
  }

  getAllPotentialMembers() {
    return this.http.get(this.url + '/members/all')
  }

  getMemberNotification() {
    return this.http.get(this.url + '/members/notification')
  }
}
3