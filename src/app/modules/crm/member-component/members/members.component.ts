import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrmService } from 'src/app/services/crm/crm.service';
import { UploadService } from 'src/app/services/upload/upload.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  memberForm: FormGroup;

  membArr: any[] = [];
  laLoArr: any[] = [];

  utc = new Date();
  mCurDate = this.formatDate(this.utc);
  mCYear = new Date().getFullYear();

  imageSrc: string = '';
  selectedFileToUpload = new File([""], "img");
  errMes: string = '';

  messageString: string = '';
  mesBgdColour: string = '#f4f4f4';
  mesTxtColour: string = '#dcdcdc';
  mexBorColour: string = '1px solid #dcdcdc';

  openDependentMembers: boolean = false;
  isMember: string = '';
  isLandlord: string = '';

  constructor(private crmservice: CrmService, private router: Router, private route: ActivatedRoute, private uploadService: UploadService) {
    this.memberForm = new FormGroup({ 
      cprno: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      memberNo: new FormControl('', []),
      image: new FormControl('', []),
      landLordId: new FormControl('', []),
      memberType: new FormControl('', [Validators.required]),
      add1: new FormControl('', []),
      add2: new FormControl('', []),
      add3: new FormControl('', []), 
      phone1: new FormControl('', []),
      phone2: new FormControl('', []),
      mobile: new FormControl('', []),
      email: new FormControl('', [Validators.required]),
      dependentMembers: new FormArray([]),
    });
    const dependentMember = new FormGroup({
      dMemberNo: new FormControl('', [Validators.required]),
      dcprno: new FormControl('', [Validators.required]),
      dname: new FormControl('', [Validators.required]),
      add1: new FormControl('', []),
      add2: new FormControl('', []),
      add3: new FormControl('', []), 
      mobile: new FormControl('', []),
      email: new FormControl('', [Validators.required]),
    });
    this.dependentMembers.push(dependentMember);

  }

  getDetails(cprno: string) {
    if (cprno === 'new') {
      this.newForm();
    } else {
      this.isMember = '';
      this.isLandlord = '';
      this.crmservice.getMemberFromCPR(cprno).subscribe((res: any) => {
        console.log(res);
        this.membArr = res.recordset;
        if(res.recordset.length === 0) {
          this.isMember = 'false';
        } else {
          this.isMember = 'true';
        }
        this.checkStatus()
      }, err => {
        console.log(err)
        this.isMember = 'false';
        this.checkStatus()
      })
      this.crmservice.getLandLordFromCPR(cprno).subscribe((res: any) => {
        console.log(res);
        this.laLoArr = res.recordset;
        if(res.recordset.length === 0) {
          this.isLandlord = 'false';
        } else {
          this.isLandlord = 'true';
        }
        this.checkStatus()
      }, err => {
        console.log(err)
        this.isLandlord = 'false';
        this.checkStatus()
      })
    }
  }

  checkStatus() {
    console.log(this.isLandlord)
    console.log(this.isMember)
    if ((this.isMember === 'true') && (this.isLandlord === 'true')) {
      this.messageString = 'Person registered as both Landlord as well as Member';
      this.mesBgdColour = '#aafa9d';
      this.mesTxtColour = '#2f5c2f';
      this.mexBorColour = '1px solid #2f5c2f';
      this.memberForm.patchValue({
        cprno: this.laLoArr[0].CPRNO,
        name: this.laLoArr[0].NAME,
        memberNo: this.membArr[0].MemberNo,
        image: this.membArr[0].IMAGENAME,
        landLordId: this.laLoArr[0].LANDLORD_ID,
        memberType: this.membArr[0].MEMBTYPE,
        add1: this.laLoArr[0].ADD1,
        add2: this.laLoArr[0].ADD2,
        add3: this.laLoArr[0].ADD3, 
        phone1: this.laLoArr[0].PHONE1,
        phone2: this.laLoArr[0].PHONE2,
        mobile: this.laLoArr[0].MOBILE,
        email: this.laLoArr[0].EMAIL_ID,
      })
      console.log(this.membArr[0].IMAGENAME);
      var imgVal: string = this.membArr[0].IMAGENAME;
      if ((this.membArr[0].IMAGENAME === null) || (this.membArr[0].IMAGENAME === "")) {
        this.imageSrc = "https://ifamygate-floatingcity.s3.me-south-1.amazonaws.com/images/imgNaN.png";
      } else if (this.membArr[0].IMAGENAME != null) {
        console.log(this.membArr[0].IMAGENAME);
        if (imgVal.includes("fakepath")) {
          var imgName: string = imgVal.slice(12);
          console.log(imgName);
          this.imageSrc = "https://ifamygate-floatingcity.s3.me-south-1.amazonaws.com/images/" + imgName;
        } else {
          this.imageSrc = "https://ifamygate-floatingcity.s3.me-south-1.amazonaws.com/images/" + imgVal;
        }
      }
      console.log(this.imageSrc);
    } else if ((this.isMember === 'false') && (this.isLandlord === 'true')) {
      this.messageString = 'Landlord has not registered as Member';
      this.mesBgdColour = '#fae891';
      this.mesTxtColour = '#f5cd05';
      this.mexBorColour = '1px solid #f5cd05';
      this.memberForm.patchValue({
        cprno: this.laLoArr[0].CPRNO,
        name: this.laLoArr[0].NAME,
        memberNo: '***NEW***',
        image: '',
        landLordId: this.laLoArr[0].LANDLORD_ID,
        memberType: '',
        add1: this.laLoArr[0].ADD1,
        add2: this.laLoArr[0].ADD2,
        add3: this.laLoArr[0].ADD3, 
        phone1: this.laLoArr[0].PHONE1,
        phone2: this.laLoArr[0].PHONE2,
        mobile: this.laLoArr[0].MOBILE,
        email: this.laLoArr[0].EMAIL_ID,
      })
    } else if ((this.isMember === 'true') && (this.isLandlord === 'false')) {
      this.messageString = 'Member is not Landlord';
      this.mesBgdColour = '#fae891';
      this.mesTxtColour = '#f5cd05';
      this.mexBorColour = '1px solid #f5cd05';
      this.memberForm.patchValue({
        cprno: this.membArr[0].CPRNo,
        name: this.membArr[0].NAME,
        memberNo: this.membArr[0].MemberNo,
        image: this.membArr[0].IMAGENAME,
        landLordId: this.membArr[0].PRIMARYMEMBER,
        memberType: this.membArr[0].MEMBTYPE,
        add1: this.membArr[0].ADD1,
        add2: this.membArr[0].ADD2,
        add3: this.membArr[0].ADD3, 
        phone1: this.membArr[0].TELRES,
        phone2: this.membArr[0].TELOFF,
        mobile: this.membArr[0].TELRES,
        email: this.membArr[0].Email,
      })
      console.log(this.membArr[0].IMAGENAME);
      var imgVal: string = this.membArr[0].IMAGENAME;
      if (imgVal === "") {
        this.imageSrc = "https://ifamygate-floatingcity.s3.me-south-1.amazonaws.com/images/imgNaN.png";
      } else {
        if (imgVal.includes("fakepath")) {
          var imgName: string = imgVal.slice(12);
          console.log(imgName);
          this.imageSrc = "https://ifamygate-floatingcity.s3.me-south-1.amazonaws.com/images/" + imgName;
        } else {
          this.imageSrc = "https://ifamygate-floatingcity.s3.me-south-1.amazonaws.com/images/" + imgVal;
        }
      }
    } else if ((this.isMember === 'false') && (this.isLandlord === 'false')) {
      this.messageString = 'Person is neither registered as Member nor Landlord';
      this.mesBgdColour = '#fa9191';
      this.mesTxtColour = '#fc0303';
      this.mexBorColour = '1px solid #fc0303';
    }
  }

  submitForm() {
    console.log(this.isLandlord)
    console.log(this.isMember)
    let data = this.memberForm.value
    console.log(data)
    if ((this.isMember === 'true') && (this.isLandlord === 'true')) {
      this.crmservice.updateMember(data.cprno,data.cprno,data.cprno,data.name,'O',data.add1,data.add2,data.add3,data.phone1,data.phone2,data.email,data.cprno,'Y',data.image,'self').subscribe((res: any) => {
        console.log(res);        
        this.uploadImage();
        this.crmservice.updateLandLord(data.landLordId, data.name, data.add1, data.add2, data.add3, data.phone1, data.phone2, data.mobile,data.email,data.cprno, data.mobile,data.cprno,'1','ADMIN',this.mCurDate).subscribe((resp: any) => {
          console.log(resp);
          if(data.memberType!='O') {
            for(let i=0; i<data.dependentMembers.length; i++) {
              this.crmservice.postMember(data.dependentMembers[i].dcprno,data.dependentMembers[i].dcprno,data.dependentMembers[i].dcprno,data.dependentMembers[i].dname,data.memberType,data.dependentMembers[i].add1,data.dependentMembers[i].add2,data.dependentMembers[i].add3,data.dependentMembers[i].mobile,data.dependentMembers[i].mobile,data.dependentMembers[i].email,data.cprno,'N',data.image,data.cprno).subscribe((response: any) => {
                console.log(response);
              }, rreror => {
                console.log(rreror);
              })
            }
          }
        }, error => {
          console.log(error)
        })
      }, err => {
        console.log(err)
      })
    } else if ((this.isMember === 'false') && (this.isLandlord === 'true')) {
      this.crmservice.postMember(data.cprno,data.cprno,data.cprno,data.name,'O',data.add1,data.add2,data.add3,data.phone1,data.phone2,data.email,data.cprno,'Y',data.image,'self').subscribe((res: any) => {
        console.log(res);
        this.uploadImage();
        this.crmservice.updateLandLord(data.landLordId, data.name, data.add1, data.add2, data.add3, data.phone1, data.phone2, data.mobile,data.email,data.cprno, data.mobile,data.cprno,'1','ADMIN',this.mCurDate).subscribe((resp: any) => {
          console.log(resp);
          if(data.memberType!='O') {
            for(let i=0; i<data.dependentMembers.length; i++) {
              this.crmservice.postMember(data.dependentMembers[i].dcprno,data.dependentMembers[i].dcprno,data.dependentMembers[i].dcprno,data.dependentMembers[i].dname,data.memberType,data.dependentMembers[i].add1,data.dependentMembers[i].add2,data.dependentMembers[i].add3,data.dependentMembers[i].mobile,data.dependentMembers[i].mobile,data.dependentMembers[i].email,data.cprno,'N',data.image,data.cprno).subscribe((response: any) => {
                console.log(response);
              }, rreror => {
                console.log(rreror);
              })
            }
          }
        }, error => {
          console.log(error)
        })
      }, err => {
        console.log(err)
      })
    } else if ((this.isMember === 'true') && (this.isLandlord === 'false')) {
      this.crmservice.updateMember(data.cprno,data.cprno,data.cprno,data.name,'O',data.add1,data.add2,data.add3,data.phone1,data.phone2,data.email,data.cprno,'Y',data.image,'self').subscribe((res: any) => {
        console.log(res);
        this.uploadImage();
        if(data.memberType!='O') {
          for(let i=0; i<data.dependentMembers.length; i++) {
            this.crmservice.updateMember(data.dependentMembers[i].dcprno,data.dependentMembers[i].dcprno,data.dependentMembers[i].dcprno,data.dependentMembers[i].dname,data.memberType,data.dependentMembers[i].add1,data.dependentMembers[i].add2,data.dependentMembers[i].add3,data.dependentMembers[i].mobile,data.dependentMembers[i].mobile,data.dependentMembers[i].email,data.cprno,'N',data.image,data.cprno).subscribe((response: any) => {
              console.log(response);
            }, rreror => {
              console.log(rreror);
            })
          }
        }
      }, err => {
        console.log(err)
      })
    } else if ((this.isMember === 'false') && (this.isLandlord === 'false')) {
      this.crmservice.postMember(data.cprno,data.cprno,data.cprno,data.name,'O',data.add1,data.add2,data.add3,data.phone1,data.phone2,data.email,data.cprno,'Y',data.image,'self').subscribe((res: any) => {
        console.log(res);
        this.uploadImage();
        this.crmservice.postLandlord(data.cprno, data.name, data.add1, data.add2, data.add3, data.phone1, data.phone2, data.mobile,data.email,data.cprno, data.mobile,data.cprno,'1','ADMIN',this.mCurDate).subscribe((resp: any) => {
          console.log(resp);
          if(data.memberType!='O') {
            for(let i=0; i<data.dependentMembers.length; i++) {
              this.crmservice.postMember(data.dependentMembers[i].dcprno,data.dependentMembers[i].dcprno,data.dependentMembers[i].dcprno,data.dependentMembers[i].dname,data.memberType,data.dependentMembers[i].add1,data.dependentMembers[i].add2,data.dependentMembers[i].add3,data.dependentMembers[i].mobile,data.dependentMembers[i].mobile,data.dependentMembers[i].email,data.cprno,'N',data.image,data.cprno).subscribe((response: any) => {
                console.log(response);
              }, rreror => {
                console.log(rreror);
              })
            }
          }
        }, error => {
          console.log(error)
        })
      }, err => {
        console.log(err)
      })
    }
    this.getDetails(data.cprno)
  }

  checkDependents(memberType: string, cprno: string) {
    if (memberType === 'O') {
      this.openDependentMembers = false;
    } else {
      this.openDependentMembers = true;
    }
  }

  addDependentMember() {
    const index = this.dependentMembers.length + 1;
    const dependentMember = new FormGroup({
      dMemberNo: new FormControl('', [Validators.required]),
      dcprno: new FormControl('', [Validators.required]),
      dname: new FormControl('', [Validators.required]),
      add1: new FormControl('', []),
      add2: new FormControl('', []),
      add3: new FormControl('', []), 
      mobile: new FormControl('', []),
      email: new FormControl('', [Validators.required]),
    });
    this.dependentMembers.push(dependentMember);
  }

  deleteDependentMember(index: number) {
    if(this.dependentMembers.length === 1){
      console.log(this.dependentMembers)
    } else {
      this.dependentMembers.removeAt(index);
    }
  }

  getMessageStyles(background: string, colour: string, border: string) {
    return {
      background: background,
      color: colour,
      border: border
    };
  }

  ngOnInit() {
    this.getDetails(this.route.snapshot.params.id);
  }

  newForm(){
    this.membArr = [];
    this.laLoArr = [];
  
    this.imageSrc = '';
    this.selectedFileToUpload = new File([""], "img");
    this.errMes = '';
  
    this.messageString = '';
    this.mesBgdColour = '#f4f4f4';
    this.mesTxtColour = '#dcdcdc';
    this.mexBorColour = '1px solid #dcdcdc';
  
    this.openDependentMembers = false;
    this.isMember = '';
    this.isLandlord = '';

    this.memberForm = new FormGroup({ 
      cprno: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      memberNo: new FormControl('', []),
      image: new FormControl('', []),
      landLordId: new FormControl('', []),
      memberType: new FormControl('', [Validators.required]),
      add1: new FormControl('', []),
      add2: new FormControl('', []),
      add3: new FormControl('', []), 
      phone1: new FormControl('', []),
      phone2: new FormControl('', []),
      mobile: new FormControl('', []),
      email: new FormControl('', [Validators.required]),
      dependentMembers: new FormArray([]),
    });
  }

  onFileChange(event: any) {
    var filesList: FileList = event.target.files;
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const fileToUpload: any = filesList.item(0);
      console.log(fileToUpload.name);
      const imgNm: string = fileToUpload.name;
      console.log(imgNm);
      reader.readAsDataURL(fileToUpload);
      reader.onload = () => {
          this.imageSrc = reader.result as string;
          this.memberForm.patchValue({
            //image: reader.result
            image: imgNm
          });
      };
      console.log(this.imageSrc)
      this.selectedFileToUpload = fileToUpload;
    }
  }

  public gotoPropertyDetails(url, id) {
    var myurl = `${url}/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
    });
  }


  uploadImage() {
    if (!this.selectedFileToUpload) {
      alert('Please select a file first!'); // or any other message to the user to choose a file
      return;
    } else {
      console.log('attempt to upload')
      this.uploadService.uploadImage(this.selectedFileToUpload);
    }
  }

  formatDate(date: any) {
    var d = new Date(date), day = '' + d.getDate(), month = '' + (d.getMonth() + 1), year = d.getFullYear();

    if (day.length < 2) {
      day = '0' + day;
    } 
    if (month.length < 2) {
      month = '0' + month;
    }
    return [day, month, year].join('-');
  }

  get f(){
    return this.memberForm.controls;
  }

  get dependentMembers(): FormArray {
    return this.memberForm.get('dependentMembers') as FormArray
  }

}
