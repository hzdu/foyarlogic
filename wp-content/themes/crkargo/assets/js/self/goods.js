$(function () {
    $(".delgoods").on("click", function () {
        var id = $(this).attr("dataid");
        var da = JSON.stringify({
            m: "delete",
            id: id,
        });
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/goodsapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                if (data.code != 200) {
                    xtip.msg(data.msg, {times: 4,icon: "w"});
                } else {
                    window.location.href = "/goods";
                }
                xtip.close(loading);
            },
        });
    });

    function transinfo(condition, fonts) {
        var res;
        switch (condition) {
            case "0":
                res = '<div class="progress-bar bg-light w-100">';
                res += '<span class="text-info">' + fonts[0] + "</span>";
                res += "</div>";
                break;
            case "1":
                res = '<div class="progress-bar '+fonts[2]+' w-100">';
                res += '<span class="'+fonts[3]+'">' + fonts[1] + "</span>";
                res += "</div>";
                break;
        }
        return res;
    }

    function searchCondition(postdata) {
        var goodshtml = heredoc(function () {/*
      <tr>
      <td dataid="{0}" datatracknumber="{1}" datagoodsnumber="{2}">
        <input class="form-check-input xuanhang" type="checkbox">
      </td>
      <td><a href="/viewgoods/?id={3}" target="_blank">{4}</a></td>
      <td>{5}</td>
      <td><a href='javascript:;' data-bs-toggle='modal' data-bs-target='#show_customer_dialog' class="text-warning showcustomerinfo" dataid='{6}'>{7}</a></td>
      <td>{8}</td>
      <td>{9}</td>
      <td>{10}</td>
      <td>{11}</td>
      <td class="hedanui text-warning showhedandialog" data-bs-toggle='modal' data-bs-target='#show_hedan_dialog' dataid='{12}' style="cursor: pointer;">{13}</td>
      <td>
      <div class="progress mt-1 h-50">
      {14}
      {15}
      {16}
      </div>
      </td>
      {17}
      </tr>
      */});
        var operationhtml1 = heredoc(function () {/*
        <td>
            <div class="d-flex order-actions">
                <a target="_blank" href="/editgoods?id={0}" class="border-warning bg-transparent editgoods mx-2" dataid="{1}" data-tootik="????????????" data-tootik-conf="warning"><i class="iconfont icon-bianji"></i></a>
                <a href="javascript:;" class="border-warning bg-transparent editqudaobtn mx-2" dataid="{2}" data-bs-toggle="modal" data-bs-target="#edit_qudao_dialog" data-tootik="????????????" data-tootik-conf="warning"><i class="iconfont icon-piliangbianji"></i></a>
                <a href="javascript:;" class="border-warning bg-transparent singleprint mx-2" datatracknumber="{3}" datagoodsnumber="{4}" dataid="{5}" data-bs-toggle="modal" data-bs-target="#single_print_dialog" data-tootik="????????????" data-tootik-conf="warning"><i class="iconfont icon-dayinji"></i></a>
                <a href="/invoice/?id={6}" target="_blank" class="border-warning bg-transparent mx-2 exportgoodsinvoice" data-tootik="????????????" data-tootik-conf="warning"><i class="iconfont icon-pdf"></i></a>
                <a href="javascript:;" class="border-warning bg-transparent delgoods mx-2" dataid="{7}" data-tootik="????????????" data-tootik-conf="warning"><i class="iconfont icon-shanchu1"></i></a>
            </div>
        </td>
    */});
        var operationhtml2 = heredoc(function () {/*
        <td>
        <div class="d-flex order-actions">
            <a target="_blank" href="/editgoods?id={0}" class="border-warning bg-transparent editgoods mx-2" dataid="{1}" data-tootik="????????????" data-tootik-conf="warning"><i class="iconfont icon-bianji"></i></a>
        </div>
      </td>
    */});
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/goodsapi.php",
            contentType: "application/json;charset=UTF-8",
            data: postdata,
            success: function (data) {
                if (data.code != 200) {
                    xtip.msg(data.msg, {times: 4,icon: "w"});
                } else {
                    xtip.close(loading);
                    $("#goodslist").html("");
                    switch (data.roles) {
                        case "superadmin":
                        case "?????????":
                            $.each(data.goods, function (index, item) {
                                var shipped;
                                var cleared;
                                var arrived;
                                var shippedarray = new Array("??????,????????????","???????????????","bg-warning","text-dark fw-bold");
                                var clearedarray = new Array("???????????????","????????????,??????","bg-primary","text-light fw-bold");
                                var arrivedarray = new Array("????????????","??????????????????","bg-success","text-light fw-bold");
                                shipped = transinfo(item.shipped, shippedarray);
                                cleared = transinfo(item.cleared, clearedarray);
                                arrived = transinfo(item.arrived, arrivedarray);
                                var operation = String.format(
                                    operationhtml1,
                                    item.id,
                                    item.id,
                                    item.id,
                                    item.tracknumber,
                                    item.goodsnumber,
                                    item.id,
                                    item.id,
                                    item.id,
                                    );
                                $("#goodslist").append(
                                    String.format(
                                        goodshtml,
                                        item.id,
                                        item.tracknumber,
                                        item.goodsnumber,
                                        item.id,
                                        item.tracknumber,
                                        item.goodsnumber,
                                        item.id,
                                        item.customer,
                                        item.yewuyuan,
                                        item.qudaobaojiabiao,
                                        item.sendgoodsdate,
                                        item.arriveddate,
                                        item.id,
                                        item.yundanhesuan,
                                        shipped,
                                        cleared,
                                        arrived,
                                        operation,
                                    )
                                );
                            });
                            break;
                        case "?????????":
                        case "?????????":
                        case "???????????????":
                        case "???????????????":
                            $.each(data.goods, function (index, item) {
                                var shipped;
                                var cleared;
                                var arrived;
                                var shippedarray = new Array("??????,????????????","???????????????","bg-warning","text-dark fw-bold");
                                var clearedarray = new Array("???????????????","????????????,??????","bg-primary","text-light fw-bold");
                                var arrivedarray = new Array("????????????","??????????????????","bg-success","text-light fw-bold");
                                shipped = transinfo(item.shipped, shippedarray);
                                cleared = transinfo(item.cleared, clearedarray);
                                arrived = transinfo(item.arrived, arrivedarray);
                                var operation = String.format(operationhtml2, item.id,
                                    item.id,
                                    item.id,);
                                $("#goodslist").append(
                                    String.format(
                                        goodshtml,
                                        item.id,
                                        item.tracknumber,
                                        item.goodsnumber,
                                        item.id,
                                        item.tracknumber,
                                        item.goodsnumber,
                                        item.id,
                                        item.customer,
                                        item.yewuyuan,
                                        item.qudaobaojiabiao,
                                        item.sendgoodsdate,
                                        item.arriveddate,
                                        item.id,
                                        item.yundanhesuan,
                                        shipped,
                                        cleared,
                                        arrived,
                                        operation,
                                    )
                                );
                            });
                            break;
                        case "customer":
                            $.each(data.goods, function (index, item) {
                                var shipped;
                                var cleared;
                                var arrived;
                                var shippedarray = new Array("??????,????????????","???????????????","bg-warning","text-dark fw-bold");
                                var clearedarray = new Array("???????????????","????????????,??????","bg-primary","text-light fw-bold");
                                var arrivedarray = new Array("????????????","??????????????????","bg-success","text-light fw-bold");
                                shipped = transinfo(item.shipped, shippedarray);
                                cleared = transinfo(item.cleared, clearedarray);
                                arrived = transinfo(item.arrived, arrivedarray);
                                $("#goodslist").append(
                                    String.format(
                                        goodshtml,
                                        item.id,
                                        item.tracknumber,
                                        item.goodsnumber,
                                        item.id,
                                        item.tracknumber,
                                        item.goodsnumber,
                                        item.id,
                                        item.customer,
                                        item.yewuyuan,
                                        item.qudaobaojiabiao,
                                        item.sendgoodsdate,
                                        item.arriveddate,
                                        item.id,
                                        item.yundanhesuan,
                                        shipped,
                                        cleared,
                                        arrived,
                                        "",
                                    )
                                );
                            });
                            break;
                    }
                    xtip.msg(data.msg, {times: 4,icon: "s"});
                }
            },
        });
    }

    $(".editgoods").on("click", function () {
        var id = $(this).attr("dataid");
        window.location.href = "/editgoods?id=" + id;
    });

    //???????????????????????????
    var datecondition=0;
    //??????????????????????????????
    var transportconditon=2;

    $(".sendgoodsdatebtncondition").on("click", function () {
        datecondition = 0;
        $(".sel_searchcondition").html("????????????");
    })

    $(".arrivedgoodsdatebtncondition").on("click", function () {
        datecondition = 1;
        $(".sel_searchcondition").html("????????????");
    })

    $(".get_sendgoodsdatebtncondition").on("click", function () {
        transportconditon = 1;
        console.log(transportconditon);
        $(".sel_getcondition_btn").html("?????????");
    })

    $(".get_arrivedgoodsdatebtncondition").on("click", function () {
        transportconditon = 0;
        console.log(transportconditon);
        $(".sel_getcondition_btn").html("?????????");
    })

    $(".get_allgoodsdatebtncondition").on("click", function () {
        transportconditon = 2;
        console.log(transportconditon);
        $(".sel_getcondition_btn").html("????????????");
    })

    $("body").on("click", ".sel_getcondition_btn", function () {
        $("#goodslist").html("");
        var searchgoodsstartdate = $("#searchgoodsstartdate").val();
        var searchgoodsenddate = $("#searchgoodsenddate").val();
        dateFormat = /^(\d{4})-(\d{2})-(\d{2})$/;
        if (dateFormat.test(searchgoodsstartdate) && dateFormat.test(searchgoodsenddate)) {
            var da = JSON.stringify({
                m: "search",
                sd: searchgoodsstartdate,
                ed: searchgoodsenddate,
                datecondition: datecondition,
                transportcondition: transportconditon,
            });
            searchCondition(da);
        } else {
            xtip.msg(ee("?????????????????????"), {times: 4,icon: "e"});
            return;
        }
    })

    $(".xuanquanbu").change(function () {
        var c = $(this).prop("checked");
        switch (c) {
            case true:
                $(".xuanhang").prop("checked", true);
                break;
            case false:
                $(".xuanhang").prop("checked", false);
                break;
        }
    });

    $("body").on("click",".chukubtn",function () {
        var checkids = new Array();
        $("#goodslist tr").each(function() {
            if ($(this).children().eq(0).children().eq(0).prop("checked") && $(this).children().eq(0).attr("dataid")!="null"){
                checkids.push($(this).children().eq(0).attr("dataid"));
            }
        });

        var da = JSON.stringify({
            m: "batchchuku",
            ids: checkids,
        });
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/goodsapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                xtip.close(loading);
                if (data.code != 200) {
                    xtip.msg(data.msg, {times: 4,icon: "w"});
                    return;
                } else {
                    window.location.reload();
                }
            },
        });
    })

    $("body").on("click",".zhuanyunbtn",function () {
        var checkids = new Array();
        $("#goodslist tr").each(function() {
            if ($(this).children().eq(0).children().eq(0).prop("checked") && $(this).children().eq(0).attr("dataid")!="null"){
                checkids.push($(this).children().eq(0).attr("dataid"));
            }
        });

        var da = JSON.stringify({
            m: "batchzhuanyun",
            ids: checkids,
        });
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/goodsapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                if (data.code != 200) {
                    // Qual.sdb(data.msg);
                    xtip.msg(data.msg, {times: 4,icon: "w"});
                } else {
                    window.location.reload();
                }
                xtip.close(loading);
            },
        });
    })

    $("body").on("click",".batcharrivedbtn",function () {
        var checkids = new Array();
        $("#goodslist tr").each(function() {
            if ($(this).children().eq(0).children().eq(0).prop("checked") && $(this).children().eq(0).attr("dataid")!="null"){
                checkids.push($(this).children().eq(0).attr("dataid"));
            }
        });

        var da = JSON.stringify({
            m: "batcharrived",
            ids: checkids,
        });
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/goodsapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                xtip.close(loading);
                if (data.code != 200) {
                    xtip.msg(data.msg, {times: 4,icon: "w"});
                } else {
                    window.location.reload();
                }
            },
        });
    })

    $(".body").on("click", ".arrivedbtn", function () {

    })

    var trackid_hedan;
    var single_hedan;
    $("body").on("click", ".showhedandialog", function () {
        trackid_hedan = $(this).attr("dataid");
        single_hedan = $(this);
        //    ?????????????????????????????????????????????
        var da = JSON.stringify({
            m: "getonehedan",
            id: trackid_hedan,
        });
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/goodsapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                xtip.close(loading);
                if (data.code != 200) {
                    xtip.msg(data.msg, {times: 4,icon: "w"});
                } else {
                    switch (data.hedan) {
                        case "0":
                            $(".cbhedan").prop("checked", false);
                            break;
                        case "1":
                            $(".cbhedan").prop("checked", true);
                            break;
                    }
                }
            },
        });
    })

    $("body").on("click", ".sel_hedan_btn", function () {
        $("#show_hedan_dialog").modal('hide');
        var track_hedan_status;
        switch ($(".cbhedan").prop("checked")) {
            case true:
                track_hedan_status = 1;
                break;
            case false:
                track_hedan_status = 0;
                break;
        }
        //???????????????????????????????????????UI
        var da = JSON.stringify({
            m: "updateonehedan",
            id: trackid_hedan,
            hd: track_hedan_status,
        });
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/goodsapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                xtip.close(loading);
                if (data.code != 200) {
                    xtip.msg(data.msg, {times: 4,icon: "w"});
                } else {
                    switch (data.hd) {
                        case 0:
                            single_hedan.html(ee("?????????"));
                            break;
                        case 1:
                            single_hedan.html(ee("?????????"));
                            break;
                    }
                    xtip.msg(ee(data.msg), {times: 4,icon: "s"});
                }
            },
        });
    })

    $(".printgoodsbtn").on("click",function () {
        $("#printcontent").html("");
        $("#printcontent").removeAttr("style");
        var trackcontent = "<div class='card'><div class='card-body'>";
        var qrcode_list1 = new Array();
        var image_list1 = new Array();
        $("#goodslist tr").each(function() {
            if ($(this).children().eq(0).children().eq(0).prop("checked") && $(this).children().eq(0).attr("dataid")!="null"){
                var dataid = $(this).children().eq(0).attr("dataid");
                var datatracknumber = $(this).children().eq(0).attr("datatracknumber");
                var datagoodsnumber = $(this).children().eq(0).attr("datagoodsnumber");
                for (let k = 1; k <= datagoodsnumber; k++) {
                    var html = heredoc(function () {/*
                    <table class="mt-1 mb-3 w-100">
                    <thead>
                    <tr>
                    <th>
                    <span style='font-size: 5rem;'>{0}-{1}</span>
                    </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                    <td align="center">
                    <div class="col-12"><img id='image-{2}-{3}-quick' src='' style='width:300px;height:300px;'></div>
                    <div class="col-12"><span style='font-size: 3rem;'>????????????</span></div>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <div id='qrcode-{4}-{5}-quick' class='no-print'></div>
                    <div style="page-break-after:always;"></div>
                */})
                    var content = String.format(
                        html,
                        datatracknumber,
                        datagoodsnumber,
                        dataid,
                        k,
                        dataid,
                        k,
                    );
                    trackcontent += content;
                    qrcode_list1.push('qrcode-' + dataid + '-' + k + "-quick");
                    image_list1.push('image-' + dataid + '-' + k + "-quick");
                }
            }
        });
        trackcontent += "</div></div>";

        $("#printcontent").append(trackcontent);

        for (let i in qrcode_list1) {
            var dataid = qrcode_list1[i].split("-")[1];
            console.log(qrcode_list1[i]);
            $("#"+qrcode_list1[i]).qrcode({
                render: "canvas",
                width: 200, //??????
                height: 200, //??????
                text: "https://app.crkargo.com/quickdeliver/?num=" + dataid
            });

            var img = document.getElementById(image_list1[i]); /// get image element
            var canvas  = document.getElementById(qrcode_list1[i]).children[0];  /// get canvas element
            img.src = canvas.toDataURL();                     /// update image
        }

        $("#printcontent").print({
            globalStyles:true,//??????????????????????????????true
            mediaPrint:false,//?????????media='print'????????????????????????globalStyles??????????????????false
            stylesheet:null,//???????????????URL????????????null
            noPrintSelector:".no-print",//?????????????????????jQuery???????????????".no-print"
            iframe:true,//???????????????iframe??????????????????????????????true????????????????????????false???????????????????????????????????????true
            append:null,//??????????????????????????????
            prepend:null,//????????????????????????????????????????????????????????????
            deferred:$.Deferred()//????????????
        });

        $("#printcontent").css("display", "none");
    })

    $("body").on("click", ".sel_searchtrackinfo_btn", function () {
        var searchtrackinfo = $("#searchtrackinfo_dialog").val();
        if (isEmpty(searchtrackinfo)){
            xtip.msg(ee("?????????!???????????????????????????"), {times: 4,icon: "e"});
            return;
        }
        var da = JSON.stringify({
            m: "searchtrackinfo",
            searchtrackinfo: searchtrackinfo,
        });
        $("#search_dialog").modal('hide');
        searchCondition(da);
    })

    //??????????????????????????????
    var printdatatracknumber;
    var printdatagoodsnumber;
    var printdataid;
    $("body").on("click", ".singleprint", function () {
        printdatatracknumber = $(this).attr("datatracknumber");
        printdatagoodsnumber = $(this).attr("datagoodsnumber");
        printdataid = $(this).attr("dataid");
        console.log("printdataid:"+printdataid);
    })
    $("body").on("click", ".sel_print_btn", function () {
        var print_number = $("#print_number").val();
        if (isEmpty(print_number)){
            xtip.msg(ee("?????????!???????????????????????????"), {times: 4,icon: "e"});
            return;
        }
        if (parseInt(print_number)<=0){
            xtip.msg(ee("?????????!???????????????????????????0"), {times: 4,icon: "e"});
            return;
        }
        $("#printcontent").html("");
        $("#printcontent").removeAttr("style");
        var qrcode_list1 = new Array();
        var image_list1 = new Array();
        var trackcontent = "<div class='card'><div class='card-body'>";
        for (let k = 1; k <= print_number; k++) {
            var html = heredoc(function () {/*
                    <table class="mt-1 mt-3 mb-3 w-100">
                    <thead>
                    <tr>
                    <th>
                    <span style='font-size: 5rem;'>{0}-{1}</span>
                    </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                    <td align="center">
                    <div class="col-12"><img id='image-{2}-quick' src='' style='width:300px;height:300px;'></div>
                    <div class="col-12"><span style='font-size: 3rem;'>????????????</span></div>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <div id='qrcode-{3}-quick' class='no-print'></div>
                    <div style="page-break-after:always;"></div>
                */})
            var content = String.format(
                html,
                printdatatracknumber,
                printdatagoodsnumber,
                printdataid,
                printdataid,
            );
            trackcontent += content;
            qrcode_list1.push('qrcode-' +  printdataid + "-quick");
            image_list1.push('image-' + printdataid + "-quick");
        }
        trackcontent += "</div></div>";

        $("#printcontent").append(trackcontent);

        for (let i in qrcode_list1) {
            var dataid = qrcode_list1[i].split("-")[1];
            console.log(qrcode_list1[i]);
            $("#"+qrcode_list1[i]).qrcode({
                render: "canvas",
                width: 200, //??????
                height: 200, //??????
                text: "https://app.crkargo.com/quickdeliver/?num=" + dataid
            });

            var img = document.getElementById(image_list1[i]); /// get image element
            var canvas  = document.getElementById(qrcode_list1[i]).children[0];  /// get canvas element
            img.src = canvas.toDataURL();                     /// update image
        }

        $("#printcontent").print({
            globalStyles:true,//??????????????????????????????true
            mediaPrint:false,//?????????media='print'????????????????????????globalStyles??????????????????false
            stylesheet:null,//???????????????URL????????????null
            noPrintSelector:".no-print",//?????????????????????jQuery???????????????".no-print"
            iframe:true,//???????????????iframe??????????????????????????????true????????????????????????false???????????????????????????????????????true
            append:null,//??????????????????????????????
            prepend:null,//????????????????????????????????????????????????????????????
            deferred:$.Deferred()//????????????
        });
        $("#single_print_dialog").modal('hide');
        $("#printcontent").css("display", "none");
    })
    //??????????????????????????????

    var editid;
    var goodsqudaoui;
    //?????????????????????????????????????????????
    $("body").on("click", ".editqudaobtn", function () {
        var dataid = $(this).attr("dataid");
        goodsqudaoui = $(this).parent().parent().prev().prev().prev().prev();
        editid = dataid;
        var da = JSON.stringify({
            m: "getonequdao",
            trackid: dataid,
        });
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/goodsapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                xtip.close(loading);
                if (data.code != 200) {
                    xtip.msg(data.msg, {times: 4,icon: "w"});
                } else {
                    $("#sel_qudaoxianlu").val(data.channelid);
                    $("#input_qudao_yunfeidanjia").val(data.qudaodanjia);
                    $("#input_qudao_yunfeizonge").val(data.qudaozonge);
                }
            },
        });
    })

    //????????????????????????
    $("body").on("click", ".calcchannelamount", function () {
        if ($("#sel_qudaoxianlu").val()=="null"){
            xtip.msg(ee("????????????????????????????????????"),{times: 4,icon: "e"});
            return;
        }
        var da = JSON.stringify({
            m: "calcchannelamount",
            trackid: editid,
            channelid: $("#sel_qudaoxianlu").val(),
        });
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/goodsapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                xtip.close(loading);
                if (data.code != 200) {
                    xtip.msg(data.msg, {times: 4,icon: "w"});
                } else {
                    $(".showfangshi").html(data.fangshi);
                    $("#input_qudao_yunfeidanjia").val(data.danjia);
                    $("#input_qudao_yunfeizonge").val(data.zonge);
                }
            },
        });
    })

    //??????????????????????????????????????????
    $("body").on("click", ".sel_edit_qudao_btn", function () {
        if ($("#sel_qudaoxianlu").val()=="null"){
            xtip.msg(ee("????????????????????????????????????"),{times: 4,icon: "e"});
            return;
        }
        if (isEmpty($("#input_qudao_yunfeidanjia").val())){
            xtip.msg(ee("?????????!????????????????????????"),{times: 4,icon: "e"});
            return;
        }
        if (isEmpty($("#input_qudao_yunfeizonge").val())){
            xtip.msg(ee("?????????!????????????????????????"),{times: 4,icon: "e"});
            return;
        }
        if (parseInt($("#input_qudao_yunfeidanjia").val())<0){
            xtip.msg(ee("?????????!????????????????????????0"),{times: 4,icon: "e"});
            return;
        }
        if (parseInt($("#input_qudao_yunfeizonge").val())<0){
            xtip.msg(ee("?????????!????????????????????????0"),{times: 4,icon: "e"});
            return;
        }
        $("#edit_qudao_dialog").modal('hide');
        var da = JSON.stringify({
            m: "editqudao",
            id: editid,
            qudaoid: $("#sel_qudaoxianlu").val(),
            danjia: $("#input_qudao_yunfeidanjia").val(),
            zonge: $("#input_qudao_yunfeizonge").val(),
        });
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/goodsapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                xtip.close(loading);
                xtip.msg(data.msg, {times: 4,icon: "s"});
                goodsqudaoui.html($("#sel_qudaoxianlu").find("option:selected").text());
                $(".hedanui").html(ee("?????????"));
            },
        });
    })

    $("body").on("click", ".showcustomerinfo", function () {
        var trackid = $(this).attr("dataid");
        var da = JSON.stringify({
            m: "getonecustomer",
            trackid: trackid,
        });
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/goodsapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                xtip.close(loading);
                if (data.code != 200) {
                    xtip.msg(data.msg, {times: 4,icon: "w"});
                } else {
                    $("#input_kehubianma").val(data.bianma);
                    $("#input_kehuxingming").val(data.xingming);
                    $("#input_kehudianhua").val(data.dianhua);
                    $("#input_kehudizhi").val(data.dizhi);
                }
            },
        });
    })

});
