import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Component({
    selector: 'plansearch',
    templateUrl: './plansearch.component.html'
})
export class PlanSearchComponent {

    private http: Http;

    public planSearchCriteria: PlanSearchCrtieria;
    public planSearchResults: PlanSearchResult[];
    public yearOptions: number[];
    public productTypeOptions: IdNamePair[];
    public lobOptions: IdNamePair[];

    constructor(http: Http) {

        this.http = http;
        this.planSearchCriteria = new PlanSearchCrtieria();
        this.yearOptions = [];
        this.productTypeOptions = [];
        this.lobOptions = [];

        http.get('/api/Plan/PlanSearchCriteriaOptions').subscribe(result => {
            var options = result.json() as PlanSearchCriteriaOptions;

            this.yearOptions = options.yearOptions;
            this.productTypeOptions = options.productTypeOptions;
            this.lobOptions = options.lobOptions;
        });
    }

    public getPlanSearchResults(event: Event): void {

        // We can use the Event object here if needed

        this.planSearchResults = [];

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post('/api/Plan/PlanSearch', JSON.stringify(this.planSearchCriteria), { headers: headers })
            .subscribe(result => {
                this.planSearchResults = result.json() as PlanSearchResult[];
            });
    }
}

class PlanSearchCrtieria {
    id: number;
    name: string;
    lobId: number;
    year: boolean;
    productTypeId: number;
    searchTerm: string;
    isPlanValidated: boolean;
}

interface PlanSearchResult {
    id: number;
    name: string;
    lob: string;
    isPlanValidated: boolean;
    opportunityDate: Date;
    productType: string;
}

interface IdNamePair {
    id: number;
    name: string;
}

interface PlanSearchCriteriaOptions {
    yearOptions: number[];
    productTypeOptions: IdNamePair[];
    lobOptions: IdNamePair[];
}

