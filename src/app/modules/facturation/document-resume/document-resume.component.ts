import { Component, OnInit } from '@angular/core';
import { FactDocumentService } from 'src/app/services/fact-document/fact-document.service';

@Component({
  selector: 'app-document-resume',
  templateUrl: './document-resume.component.html',
  styleUrls: ['./document-resume.component.scss']
})
export class DocumentResumeComponent implements OnInit {

  selectedClient = [] as any

  constructor(public factDocService: FactDocumentService) { }

  clicked = false

  ngOnInit(): void {
    this.Calcul()
    this.getSelectedClient()
  }

  cancelButton() {
    this.clicked =! this.clicked
  }

  cancelButtonAndDestroy() {
    this.factDocService.formFirst.reset()
    this.factDocService.articles = []
    this.factDocService.formAddArticle.reset()
  }

  Calcul(){
    const subTotal = this.getArraySum(this.factDocService.articles)
    this.factDocService.subtotal = subTotal
    //const factTotal = subTotal + 
  }

  getArraySum(a: any){
    var sum=0;
    for(var i in a) { 
        sum += a[i].total;
    }
    return sum;
  }

  getSelectedClient(){
    this.factDocService.get_selected_client().subscribe((result) => {
      const client = JSON.parse(JSON.stringify(result));
      this.selectedClient = client
      console.log(client)
    }, (error) => {
      console.log(error)
    })
  }

  GeneratePDF() {
    this.factDocService.generate_document().subscribe((result) => {
      console.log(result)
    }, (error) => {
      console.log(error)
    })
  }

}
