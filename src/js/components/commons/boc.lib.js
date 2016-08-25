
var boc = (function (inner) {

    inner.sops = {
        util: {
            pageAfterFunction: [],
            allBranchs: [],
            handlerURL: '/boc/_layouts/15/SOPSHandler/Locator.ashx',
            sopsajax: function (data, callback, type, isasync) {
                isasync = typeof isasync == "undefined" ? true : isasync;
                type = type || "GET";
                $.ajax({
                    url: this.handlerURL,
                    type: type,
                    data: "se=" + encodeURIComponent(JSON.stringify(data)) + "&_sopsmark=" + (new Date()).valueOf(),
                    async: isasync,
                    headers: { Accept: 'application/json; odata=verbose' }
                }).done(callback)
            },
            createOperationAddress: function (data) {
                return this.handlerURL + "?se=" +
                    encodeURIComponent(JSON.stringify(data)) +
                    "&_sopsmark=" + (new Date()).valueOf();
            },
            config: {
                "ajax": {
                    "url": ""
                },
                "deferLoading" : 0,
                "bSort" : false,
                "processing": true,
                "serverSide": true,
                "columns": [],
                "columnDefs": [
                    // {
                    //     "render": function (data, type, row) {
                    //         return data ? '是' : '否';
                    //     },
                    //     "targets": [4, 5]
                    // }
                    ],
                "order": [[5, 'esc']],
                'language': {
                    'emptyTable': '没有数据',
                    'loadingRecords': '加载中...',
                    'processing': '查询中...',
                    'search': '检索:',
                    'lengthMenu': '每页 _MENU_ 条',
                    'zeroRecords': '没有数据',
                    'paginate': {
                        'first': '第一页',
                        'last': '最后一页',
                        'next': '下一页',
                        'previous': '上一页'
                    },
                    'info': '第 _PAGE_ 页 / 总 _PAGES_ 页',
                    'infoEmpty': '没有数据',
                    'infoFiltered': '(过滤总数 _MAX_ 条)'
                }
            },
            tableIdentity: "#groupContainer",
            table: {},
            subtable: {},
            viewModel: {
                close: function (msg, color) {
                    $(".ms-dlgFrameContainer div.dialog-container").appendTo("form:first");
                    inner.sops.ui.dialog.close(msg, color);
                },
               /* Branchs: ko.observableArray(),
                Branch: ko.observable()*/
            },
            AppViewModel: function () { },
            removeuser: function () { },
            detail: function () { },
            subTableFormat: function () { },
            load: function () {

/*
                if ($(this.tableIdentity).length == 0) return;
                this.table = $(this.tableIdentity).DataTable(this.config);
                this.viewModel = new this.AppViewModel();
                ko.applyBindings(this.viewModel);

                boc.sops.util.sopsajax({
                    Action: "Branch",
                    Method: "GetBranchesByUser"
                }, function (res) {
                    boc.sops.util.viewModel.Branchs(res.data);
                }, "GET")

                $(this.tableIdentity + ' tbody').on('click', 'td.edit-group', inner.sops.group.edit); //编辑组

                $(this.tableIdentity + ' tbody').on('click', 'td.details-control', this.detail); //查看组明细

                $(this.tableIdentity + ' tbody').on('click', 'td.remove-user',
                    this.removeuser); //删除组用户
*/
                //delete-action
            },
            timeMark: function (query) {
                if (query.indexOf('?') != -1)
                    return query + "&_sopsmark=" + (new Date()).valueOf();
                else
                    return query + "?_sopsmark=" + (new Date()).valueOf();
            },
            log: function (str) {
                $("#log").text(str);
            }
        },
        group: {
            edit: {},
            detail: {},
            removeuser: {}
        },
        user: {
            add: function () { }
        },
        ui: {
            statusid: [],
            dialog: {
                current: {},
                show: function (title, html, url, dialogCloseCallback) {
                    var options = SP.UI.$create_DialogOptions();
                    if (url)
                        options.url = url + '?id=' + id;
                    if (html) {

                        options.html = $(html).get(0);
                    }
                    options.title = title;
                    options.showClose = false;
                    options.autoSize = true;
                    if (dialogCloseCallback)
                        options.dialogReturnValueCallback = Function.createDelegate(null, dialogCloseCallback);
                    this.current = SP.UI.ModalDialog.showModalDialog(options);
                },
                close: function (msg, color, timeout) {

                    SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.cancel);

                    if (msg.length > 0) {
                        inner.sops.ui.notice(msg, color, timeout)
                    }
                }
            },
            notice: function (msg, color, timeout) {

                //this.statusid = SP.UI.Status.addStatus(msg);
                //SP.UI.Status.setStatusPriColor(this.statusid, color || "green");

                color = color || "green";
                msg = "<span style='color:" + color + "'>" + msg + "</span>";

                this.statusid.push(SP.UI.Notify.addNotification(msg, true))

                setTimeout(function () {
                    $(inner.sops.ui.statusid).each(function () {
                        SP.UI.Notify.removeNotification(this);
                    })
                }, timeout || 1500)

            }

        }
    }

    inner.sops.util.pageAfterFunction.push(function () {
      //  inner.sops.util.load();
    });

    return inner;
}(boc || {}));

$(function () {
      $(boc.sops.util.pageAfterFunction).each(function () { this(); });
});
 
export default boc;
 