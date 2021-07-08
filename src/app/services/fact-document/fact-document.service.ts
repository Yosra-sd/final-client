import { Client } from './../../shared/models/client';
import { factDocument } from './../../shared/models/fact-document';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FactDocumentService {

  listFactDocs!: factDocument[]
  selectedDevise: string = ""
  articles = [] as any
  subtotal: number = 0
  tva_total: number = 0
  totalFacture: number = 0

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  formFirst = this.fb.group ({
    type: ["", Validators.required],
    client_name: ["", Validators.required],
    description: ["", Validators.required],
    devise: ["", Validators.required],
  })

  formAddArticle = this.fb.group ({
    ref:[""],
    prestation: ["", Validators.required],
    description: ["", Validators.required],
    prix: ["", Validators.required],
    tva: ["", Validators.required]
  })


  generate_document(){
    console.log("article table:", this.articles)
    console.log(this.formFirst.value)
    return this.http.post(`http://localhost:5500/api/create-fact-document`, {...this.formFirst.value, article_table: this.articles, withLink: true}, {withCredentials: true, responseType : "text"})
  }

  get_all_documents(){
    return this.http.get<factDocument[]>(`http://localhost:5500/api/list-fact-documents`, {withCredentials: true})
  }

  get_selected_client(){
    return this.http.put(`http://localhost:5500/api/get-selected-client`, this.formFirst.value ,{withCredentials: true})
  }




}
