export default class XrefModel {

    constructor(xref_conff, app_conff) {
        this.xref_conf = xref_conff;
        this.app_conf = app_conff;
        this.all_sub_results = [];
        this.sub_result_counter = 0;
    }

    processResults(data_results, callback_params) {
        this.all_sub_results = [];

        if (data_results == null) {
            //TODO write no result
            return
        }

        for (let key in data_results) {
            let results = data_results[key].results;

            //first sort by count
            results.sort(function (a, b) {
                if (a.count < b.count) return 1;
                if (a.count > b.count) return -1;
                return 0;
            });

            for (let key2 in results) {
                this.prepeare4UI(results[key2], data_results[key], 0);
                this.all_sub_results.push(results[key2]);
            }
        }



    }
    processSelectedXref(results, callback_params) {

        for (let key in results) {
            let result = results[key];
            for (let key2 in result.results) {
                let sub_result = result.results[key2];
                if (result.identifier === callback_params[2] && sub_result.domain_id === callback_params[3]) {

                    // now add this result to the selected Xrefs
                    this.prepeare4UI(sub_result, result, callback_params[4].depth + 1);
                    callback_params[4].selectedXrefs.unshift(sub_result);
                    callback_params[5].selected = true;
                    callback_params[5].style["background-color"] = this.app_conf.selected_box_color;

                    return sub_result;
                }
            }
        }

    }

    initialFilterApply(sub_result) {

        let domain_counts = sub_result.domain_counts;
        let filterSet = new Set();
        for (var key in domain_counts) {
            let domain_count = domain_counts[key];
            if (domain_count.selected) {
                filterSet.add(domain_count.domain_id);
            }
        }

    }

    prepeare4UI(sub_result, result, depth) {

        this.sub_result_counter++;
        sub_result.counter = this.sub_result_counter;
        sub_result.showResults = true;
        sub_result.filterModalActive = false;
        sub_result.treeModal = false;
        sub_result.selectedXrefs = [];
        sub_result.displayEntries = [];
        sub_result.identifier = result.identifier;
        sub_result.depth = depth;


        this.setupPaging(sub_result);

        let domain_counts = sub_result.domain_counts;
        //first sort by count
        domain_counts.sort(function (a, b) {
            if (a.count < b.count) return 1;
            if (a.count > b.count) return -1;
            return 0;
        });
        for (let key3 in domain_counts) {
            let domain_count = domain_counts[key3];
            domain_count.selected = true;
            try {
                domain_count.filterLabel = this.xref_conf[domain_count.domain_id].name + '(' + domain_count.count.toLocaleString() + ')';
            } catch (e) {
                domain_count.filterLabel = domain_count.domain_id;
            }
        }

        // check the labels

        let domain_conf = this.xref_conf[sub_result.domain_id];

        if (domain_conf.trim_after) {
            sub_result.url = domain_conf.url.replace("£{id}", sub_result.identifier.substring(0, sub_result.identifier.indexOf(domain_conf.trim_after)));
        } else {
            sub_result.url = domain_conf.url.replace("£{id}", sub_result.identifier);
        }

    }

    setupPaging(sub_result) {

        sub_result.clientPage = 0;
        sub_result.maxClientPage = 0;
        sub_result.serverPage = 0;
        sub_result.maxServerPage = 0;

        if (sub_result.hasFilter) { //if filter active total count is equal to selected ones
            let filter_total = 0;
            for (let key in sub_result.domain_counts) {
                let domain_count = sub_result.domain_counts[key];
                if (domain_count.selected) {
                    filter_total += domain_count.count;
                }
            }
            sub_result.count = filter_total;
        }

        if (sub_result.count > this.app_conf.page_size) {

            sub_result.maxClientPage = Math.ceil(sub_result.count / this.app_conf.page_size) - 1;

            if (sub_result.count > this.app_conf.server_result_page_size) {
                sub_result.maxServerPage = Math.ceil(sub_result.count / this.app_conf.server_result_page_size);
            }

            sub_result.displayEntries = sub_result.entries.slice(0, this.app_conf.page_size);

        } else {

            sub_result.displayEntries = sub_result.entries;

        }

        this.setupEntries(sub_result);
    }

    resetPaging() {

        for (let key in this.all_sub_results) {
            this.setupPaging(this.all_sub_results[key]);
        }

    }

    resetBoxColors() {

        for (let key in this.all_sub_results) {
            let sub_result = this.all_sub_results[key];

            changeColors(sub_result, this.app_conf);

            change_all_sub_entries(sub_result, this.app_conf);

        }

        function change_all_sub_entries(sub_result, app_conf) {

            for (let key in sub_result.selectedXrefs) {
                let sel_sub_result = sub_result.selectedXrefs[key];
                changeColors(sel_sub_result, app_conf);
                change_all_sub_entries(sel_sub_result, app_conf);
            }
        }

        function changeColors(sub_result, app_conf) {

            for (let key3 in sub_result.entries) {
                let entry = sub_result.entries[key3];
                if (entry.selected) {
                    entry.style["background-color"] = app_conf.selected_box_color;
                } else {
                    entry.style["background-color"] = app_conf.box_color;
                }
            }
        }

    }

    setupEntries(sub_result) {

        for (let key in sub_result.entries) {

            let entry = sub_result.entries[key];

            let domain_conf = this.xref_conf[entry.domain_id];
            if (domain_conf.trim_after) {
                entry.url = domain_conf.url.replace("£{id}", entry.xref_id.substring(0, entry.xref_id.indexOf(domain_conf.trim_after)));
            } else {
                entry.url = domain_conf.url.replace("£{id}", entry.xref_id);
            }

            if (entry.xref_id.length <= 12) {
                entry.label = entry.xref_id;
                entry.title = '';
            } else {
                entry.label = entry.xref_id.substring(0, 10) + '...';
                entry.title = entry.xref_id;
            }

            entry.style = {
                'background-color': this.app_conf.box_color
            }
        }

    }

    processFilteredResults(data_results, sub_result, fromPaging) {


        this.setupEntries(data_results[0].results[0]);

        if (fromPaging) {
            Array.prototype.push.apply(sub_result.entries, data_results[0].results[0].entries);
        } else {
            sub_result.entries = data_results[0].results[0].entries;
            this.setupPaging(sub_result);
        }

        sub_result.lastFilteredPageKey = data_results[0].identifier; //this is magic for now.
    }

    processPaginResults(results, sub_result_org) {

        sub_result_org.serverPage++;

        for (let key in results) {
            let result = results[key];
            for (let key2 in result.results) {
                let sub_result = result.results[key2];
                if (result.identifier === sub_result_org.identifier && sub_result.domain_id === sub_result_org.domain_id) {
                    // now add all the result entries to existing entries
                    //eclipse issue
                    //sub_result_org.entries.push(...sub_result.entries);
                    this.setupEntries(sub_result);
                    Array.prototype.push.apply(sub_result_org.entries, sub_result.entries);
                }
            }
        }

    }

}