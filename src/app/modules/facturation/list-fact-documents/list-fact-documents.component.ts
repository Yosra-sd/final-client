import { factDocument } from './../../../shared/models/fact-document';
import { FactDocumentService } from 'src/app/services/fact-document/fact-document.service';
import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-list-fact-documents',
  templateUrl: './list-fact-documents.component.html',
  styleUrls: ['./list-fact-documents.component.scss']
})
export class ListFactDocumentsComponent implements OnInit {

  constructor(public factDocService: FactDocumentService) { }


  dtOptions: DataTables.Settings = {}

  ngOnInit(): void {
    this.getAllDocuments()

    this.dtOptions = {
      
      language: {
        lengthMenu: "Affichage de _MENU_ enregistrements",
        info: "Affichage de _START_ à _END_ de _TOTAL_ enregistrements",
        search: "Chercher:",
        paginate: {
          first: "Premier",
          last: "Dernier",
          next: "Suivant",
          previous: "Précédent",
        },
        emptyTable: "Aucune donnée disponible!",
        zeroRecords:"Aucune donnée trouvée!"
      },
      order: [[3, 'desc'],[1, 'asc']],
      stateSave: true
    };
  }

  getAllDocuments (){
    this.factDocService.get_all_documents().subscribe((response) => {
      this.factDocService.listFactDocs = response as factDocument[]
    }, (error) => {
      console.log(error)
    })
  }

  downloadPdf(pdfUrl: string, pdfName: string) {
    saveAs(pdfUrl, pdfName);
  }

}
