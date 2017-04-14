import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Select2OptionData } from 'ng2-select2'

@Component({
    selector: 'plansearch',
    templateUrl: './plansearch.component.html'
})
export class PlanSearchComponent implements OnInit {

    private http: Http;

    public isLoadingResults: boolean;
    public planSearchCriteria: PlanSearchCrtieria;
    public planSearchResults: PlanSearchResult[];
    public yearOptions: number[];
    public productTypeOptions: IdNamePair[];
    public lobOptions: IdNamePair[];
    public defaultPlanName: string;

    public planNameOptions: Array<Select2OptionData>;
    public select2Options: Select2Options;

    constructor(http: Http) {

        this.isLoadingResults = false;
        this.http = http;
        this.planSearchCriteria = new PlanSearchCrtieria();
        this.planNameOptions = [];
        this.yearOptions = [];
        this.productTypeOptions = [];
        this.lobOptions = [];
    }

    public ngOnInit() {

        console.log('ngOnInit');

        this.select2Options = this.getSelect2Options("Enter Plan Name...", true, null, true, null);

        this.http.get('/api/Plan/PlanNameOptions').subscribe(result => {
            var options = result.json() as string[];

            var tempOptions = [];
            options.forEach((option, index) => {
                var tempOption = <Select2OptionData>{};
                tempOption.id = option; //index.toString();
                tempOption.text = option;

                tempOptions.push(tempOption);
            });

            this.planNameOptions = tempOptions;

            this.planSearchCriteria.name = "HMO Plan Name 1";
            //this.planSearchCriteria.name = "2"; if we need to use ids
        });

        this.http.get('/api/Plan/PlanSearchCriteriaOptions').subscribe(result => {
            var options = result.json() as PlanSearchCriteriaOptions;

            this.yearOptions = options.yearOptions;
            this.productTypeOptions = options.productTypeOptions;
            this.lobOptions = options.lobOptions;
        });
    }

    public ngAfterViewInit() {
        //$('#searchResultsTable').data
        console.log('ngafterviewinit');
    }

    public planNameChanged(event: any): void {
        this.planSearchCriteria.name = event.value;
    }

    public getPlanSearchResults(event: Event): void {

        // We can use the Event object here if needed

        this.isLoadingResults = true;
        this.planSearchResults = [];

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post('/api/Plan/PlanSearch', JSON.stringify(this.planSearchCriteria), { headers: headers })
            .subscribe(result => {
                this.planSearchResults = result.json() as PlanSearchResult[];
            },
            null,
            () => {
                this.isLoadingResults = false;
            }
        );
    }

    private getSelect2Options(placeHolder?: string, allowClear: boolean = false, minLength?: number, isFreeText?: boolean, ajaxUrl?: string) : Select2Options {
        var select2Options = <Select2Options>{};

        select2Options.allowClear = allowClear;

        select2Options.width = '100%';

        if (placeHolder) {
            select2Options.placeholder = placeHolder;
        }

        if (minLength) {
            select2Options.minimumInputLength = minLength;
        }

        if (isFreeText === true) {
            select2Options.tags = true;

            select2Options['createTag'] = (params) => {
                return {
                    id: params.term,
                    text: params.term,
                    newOption: true
                }
            };
        }

        if (ajaxUrl) {
            select2Options.ajax = <any>{
                url: ajaxUrl,
                delay: 250,
                dataType: 'json',
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: function (params: any) {
                    var query = {
                        searchTerm: params.term,
                        resultSize: 100
                    }

                    // Query paramters will be ?searchTerm=[term]&resultSize=[page]
                    return JSON.stringify(query)
                },
                processResults: function (data, params) {
                    // parse the results into the format expected by Select2
                    var items = [];

                    if (params.term) {
                        items.push({ id: params.term, text: params.term });
                    }

                    $.map(data, (data, ix) => {
                        var jsonData = JSON.parse(data);

                        for (var prop in jsonData) {
                            // skip loop if the property is from prototype
                            if (!jsonData.hasOwnProperty(prop)) continue;

                            items.push({ id: jsonData[prop], text: jsonData[prop] });
                        }
                    });

                    return {
                        results: items
                    };
                }
            }
        }

        return select2Options;
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

