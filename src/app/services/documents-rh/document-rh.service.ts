import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { document_rh } from 'src/app/shared/models/document-rh';

@Injectable({
  providedIn: 'root'
})
export class DocumentRhService {

  listDocsRh!: document_rh[];

  listAskedDocsRh!: document_rh[];

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  formForAsk = this.fb.group({   
    type : ["", Validators.required],
    titre : ["", Validators.required],
    commentaire : ["", Validators.required]
  })


  formForValidation = this.fb.group({
    id: [''],
    nom: [''],
    prenom: [''],
    titre: [''],
    withEmail: [''],
    withLink: [''],
    commentaire: ['']
  })

  askedByMe() {
    return this.http.get<document_rh[]>(`http://localhost:5500/api/get-my-documents`, {withCredentials: true});
  }

  askForDocument() {
    return this.http.post(`http://localhost:5500/api/ask-for-document`, this.formForAsk.value, {responseType: "text", withCredentials: true})
  }

  getAllAskedDocuments(){
    return this.http.get<document_rh[]>(`http://localhost:5500/api/get-all-demands`, {withCredentials: true})
  }

  generateDocument(){
    return this.http.put(`http://localhost:5500/api/generate-document` + `/` +  this.formForValidation.controls.id.value, {withEmail: this.formForValidation.controls.withEmail.value, withLink: true}, {responseType: 'text', withCredentials: true})
  }
}
