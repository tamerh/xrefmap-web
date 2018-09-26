import xref_colf from "./Colfer.js";
import XrefConf from '../conf/DomainConf.js';

export default class Fetch {
    constructor() {
        //this.endpoint = "http://localhost:8080/ws/api?ids=";
        //this.endpoint="http://xxx:8080/ws/api?ids=";
        this.endpoint = "https://www.ebi.ac.uk/~tgur/xrefmap/api.php?ids=";
        this.xref_conf = XrefConf;
    }

    /**
     * Search id and parse with colfer.
     */
    search(id, callback, callback_params) {
        // id.replace(/ /g, '') white space clear
        fetch(this.endpoint + id)
            .then(function (response) {
                return response.arrayBuffer();
            })
            .then(function (arrayBuffer) {
                if (arrayBuffer && arrayBuffer.byteLength > 5) {

                    let offset = 0;
                    let all_results = [];

                    while (offset < arrayBuffer.byteLength - 1) {

                        let view = new DataView(arrayBuffer, offset, 4);
                        let result_type = view.getInt32();

                        if (result_type > 2) {

                            let byteArray = new Uint8Array(arrayBuffer.slice(offset + 4, offset + 4 + result_type));
                            let result = new xref_colf.Result();
                            result.unmarshal(byteArray);
                            all_results.push(result);
                            offset += result_type + 4;

                        } else if (result_type === 2) { //expanded query 
                            // 
                            offset += 4;
                            let expandQueryLen = new DataView(arrayBuffer, offset, 4).getInt32();
                            let expandQuery = new TextDecoder().decode(arrayBuffer.slice(offset + 4, offset + 4 + expandQueryLen));
                            offset += expandQueryLen + 4;

                            let sub_res_size = new DataView(arrayBuffer, offset, 4).getInt32();
                            let byteArray = new Uint8Array(arrayBuffer.slice(offset + 4, offset + 4 + sub_res_size));
                            let result = new xref_colf.Result();
                            result.unmarshal(byteArray);

                            //set expanded query //TODO maybe in model?
                            for (let key in result.results) {
                                //TODO for now in this case assigning to all sub result it should be exact one with domain_id e.g homo sapiens
                                let sub_result = result.results[key];
                                if (sub_result.domain_id === 38 || sub_result.domain_id === 8 || sub_result.domain_id === 6) {
                                    sub_result.expandedQuery = expandQuery;
                                }
                            }

                            all_results.push(result);
                            offset += sub_res_size + 4;

                        } else {
                            offset += result_type + 4;
                        }
                    }

                    callback(all_results, callback_params);

                } else {
                    callback(null, callback_params);
                }
            })
            .catch((error) => {
                callback(null, callback_params, true);
            });
    }

    /**
     * Search with filter.
     */
    searchByFilter(sub_result, callback, callback_params) {

        let url = this.endpoint + sub_result.identifier + '&src=' + sub_result.domain_id + '&filters=' + sub_result.filters;

        if (sub_result.lastFilteredPageKey && sub_result.lastFilteredPageKey.length > 0) {
            url += "&last_filtered_page=" + sub_result.lastFilteredPageKey;
        }

        fetch(url)
            .then(function (response) {
                return response.arrayBuffer();
            })
            .then(function (arrayBuffer) {
                if (arrayBuffer && arrayBuffer.byteLength > 5) {

                    let all_results = [];
                    let byteArray = new Uint8Array(arrayBuffer);
                    let sub_result_new = new xref_colf.Result();
                    sub_result_new.unmarshal(byteArray);
                    all_results.push(sub_result_new);

                    callback(all_results, sub_result, callback_params);

                } else { // TODO
                    callback(id, null);
                }
            })
            .catch((error) => {
                callback(null, sub_result, callback_params, true);
            });

    }

    /**
     * Search with filter.
     */
    searchByPageIndex(id, source_domain, page, page_total, callback, callback_params) {
        fetch(this.endpoint + id + '&src=' + source_domain + '&page=' + page + '&total=' + page_total)
            .then(function (response) {
                return response.arrayBuffer();
            })
            .then(function (arrayBuffer) {
                if (arrayBuffer && arrayBuffer.byteLength > 5) {

                    let all_results = [];
                    let byteArray = new Uint8Array(arrayBuffer);
                    let sub_result = new xref_colf.Result();
                    sub_result.unmarshal(byteArray);
                    all_results.push(sub_result);


                    callback(all_results, callback_params);

                } else { // TODO
                    callback(id, null);
                }
            }).catch((error) => {
                callback(null, callback_params, true);
            });;
    }

}