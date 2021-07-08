import { document_rh } from './../../../shared/models/document-rh';
import { Component, OnInit } from '@angular/core';
import { DocumentRhService } from 'src/app/services/documents-rh/document-rh.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-mes-demandes',
  templateUrl: './mes-demandes.component.html',
  styleUrls: ['./mes-demandes.component.scss']
})
export class MesDemandesComponent implements OnInit {

  constructor(public DocumentRhService : DocumentRhService) { }
  dtOptions: DataTables.Settings = {}

  ngOnInit(): void {
    this.getDocumentsByMe()
    this.dtOptions = {
      // pagingType: 'full_numbers',
      pageLength: 5,
      lengthChange: false,
      language: {
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
      order: [[2, 'desc']]

    };
  }

  getDocumentsByMe (){
    this.DocumentRhService.askedByMe().subscribe((response) => {
      this.DocumentRhService.listDocsRh = response as document_rh[]
    }, (error) => {
      console.log(error)
    })
  }

  downloadPdf(pdfUrl: string, pdfName: string) {
    //const pdfUrl = './assets/sample.pdf';
    //const pdfName = 'your_pdf_file';
    saveAs(pdfUrl, pdfName);
  }

}
