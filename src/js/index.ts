import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

import { json2table100 } from "./generictable";


interface ICar {
    id: number;
    model: string;
    vendor: string;
    price: number;
}

let baseUri: string = "http://anbo-carsrest.azurewebsites.net/api/cars";

let buttonElement: HTMLButtonElement = <HTMLButtonElement>document.getElementById("getAllButton");
buttonElement.addEventListener("click", showAllCars);

let outputElement: HTMLDivElement = <HTMLDivElement>document.getElementById("content");

let buttonDeleteElement: HTMLButtonElement = <HTMLButtonElement>document.getElementById("deleteButton");
buttonDeleteElement.addEventListener("click", deleteCar);

let addButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addButton");
addButton.addEventListener("click", addCar);

let updateButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("updateButton");
updateButton.addEventListener("click", UpdateCar);

let deleteDropdown: HTMLSelectElement = <HTMLSelectElement>document.getElementById("deleteSelect");







function showAllCars(): void {
    axios.get<ICar[]>(baseUri)
        .then(function (response: AxiosResponse<ICar[]>): void {
            // element.innerHTML = generateSuccessHTMLOutput(response);
            // outputHtmlElement.innerHTML = generateHtmlTable(response.data);
            // outputHtmlElement.innerHTML = JSON.stringify(response.data);
            let result: string = json2table100(response.data);
            outputElement.innerHTML = result;

            let OutputItems: HTMLScriptElement = <HTMLScriptElement>document.getElementById("deleteItems")


            var newOption = document.createElement("option");
          
            
            for (var car of response.data) {
                var num = car.id;
                newOption.text = num.toString();
                newOption.value = car.id.toString();
                deleteDropdown.appendChild(newOption);
            }
        })
        .catch(function (error: AxiosError): void { // error in GET or in generateSuccess?
            if (error.response) {
                // the request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
                outputElement.innerHTML = error.message;
            } else { // something went wrong in the .then block?
                outputElement.innerHTML = error.message;
            }
        });
    
}

function deleteCar(): void {
    let output: HTMLDivElement = <HTMLDivElement>document.getElementById("contentDelete");
    let inputElement: HTMLInputElement = <HTMLInputElement>document.getElementById("deleteInput");
    let id: string = inputElement.value;
    let uri: string = baseUri + "/" + id;
    axios.delete<ICar>(uri)
        .then(function (response: AxiosResponse<ICar>): void {
            // element.innerHTML = generateSuccessHTMLOutput(response);
            // outputHtmlElement.innerHTML = generateHtmlTable(response.data);
            console.log(JSON.stringify(response));
            output.innerHTML = response.status + " " + response.statusText;
        })
        .catch(function (error: AxiosError): void { // error in GET or in generateSuccess?
            if (error.response) {
                // the request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
                output.innerHTML = error.message;
            } else { // something went wrong in the .then block?
                output.innerHTML = error.message;
            }
        });
}





function UpdateCar(): void {
    let output: HTMLDivElement = <HTMLDivElement>document.getElementById("contentAdd");
    let inputElement: HTMLInputElement = <HTMLInputElement>document.getElementById("deleteInput");
    let addModelElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addModel");
    let addVendorElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addVendor");
    let addPriceElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addPrice");
    let myModel: string = addModelElement.value;
    let myVendor: string = addVendorElement.value;
    let myPrice: number = Number(addPriceElement.value);

    let id: string = inputElement.value;
    let uri: string = baseUri + "/" + id;
    axios.put<ICar>(uri, { model: myModel, vendor: myVendor, price: myPrice})

        .then(function (response: AxiosResponse<ICar>): void { 
            // element.innerHTML = generateSuccessHTMLOutput(response);
            // outputHtmlElement.innerHTML = generateHtmlTable(response.data);
            console.log(JSON.stringify(response));
            output.innerHTML = response.status + " " + response.statusText;
        })
        .catch(function (error: AxiosError): void { // error in GET or in generateSuccess?
            if (error.response) {
                // the request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
                output.innerHTML = error.message;
            } else { // something went wrong in the .then block?
                output.innerHTML = error.message;
            }
        });
}




function addCar(): void {
    let addModelElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addModel");
    let addVendorElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addVendor");
    let addPriceElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addPrice");
    let myModel: string = addModelElement.value;
    let myVendor: string = addVendorElement.value;
    let myPrice: number = Number(addPriceElement.value);
    let output: HTMLDivElement = <HTMLDivElement>document.getElementById("contentAdd");
    // id is generated by the back-end (REST service)
    axios.post<ICar>(baseUri, { model: myModel, vendor: myVendor, price: myPrice })
        .then((response: AxiosResponse) => {
            let message: string = "response " + response.status + " " + response.statusText;
            output.innerHTML = message;
            console.log(message);
        })
        .catch((error: AxiosError) => {
            output.innerHTML = error.message;
            console.log(error);
        });
}