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
                    // Qual.sdb(data.msg);
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
      <td>{6}</td>
      <td>{7}</td>
      <td>{8}</td>
      <td>
      <div class="progress mt-1 h-50">
      {9}
      {10}
      {11}
      </div>
      </td>
      {12}
      </tr>
      */});
        var operationhtml1 = heredoc(function () {/*
        <td>
            <div class="d-flex order-actions">
                <a href="/editgoods?id={0}" class="border-warning bg-transparent editgoods mx-2" dataid="{1}"><i class="iconfont icon-bianji"></i></a>
                <a href="javascript:;" class="border-warning bg-transparent delgoods mx-2" dataid="{2}"><i class="iconfont icon-shanchu1"></i></a>
                <a href="javascript:;" class="border-warning bg-transparent singleprint mx-2" datanumber="{3}" dataid="{4}" data-bs-toggle="modal" data-bs-target="#single_print_dialog"><i class="iconfont icon-dayinji"></i></a>
            </div>
        </td>
    */});
        var operationhtml2 = heredoc(function () {/*
        <td>
        <div class="d-flex order-actions">
            <a href="/editgoods?id={0}" class="border-warning bg-transparent editgoods mx-2" dataid="{1}"><i class="iconfont icon-bianji"></i></a>
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
                    // Qual.sdb(data.msg);
                    xtip.msg(data.msg, {times: 4,icon: "w"});
                } else {
                    $("#goodslist").html("");
                    switch (data.roles) {
                        case "superadmin":
                        case "管理员":
                            $.each(data.goods, function (index, item) {
                                var shipped;
                                var cleared;
                                var arrived;
                                var shippedarray = new Array("打包,等待出库","出仓运输中","bg-warning","text-dark fw-bold");
                                var clearedarray = new Array("未抵达口岸","清关完成,转运","bg-primary","text-light fw-bold");
                                var arrivedarray = new Array("尚未抵达","抵达货运中心","bg-success","text-light fw-bold");
                                shipped = transinfo(item.shipped, shippedarray);
                                cleared = transinfo(item.cleared, clearedarray);
                                arrived = transinfo(item.arrived, arrivedarray);
                                var operation = String.format(operationhtml1, item.id,
                                    item.id,
                                    item.id,
                                    item.tracknumber,
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
                                        item.yewuyuan,
                                        item.sendgoodsdate,
                                        item.arriveddate,
                                        shipped,
                                        cleared,
                                        arrived,
                                        operation,
                                    )
                                );
                            });
                            break;
                        case "跟单员":
                        case "业务员":
                        case "国内操作员":
                        case "国外操作员":
                            $.each(data.goods, function (index, item) {
                                var shipped;
                                var cleared;
                                var arrived;
                                shipped = transinfo(item.shipped, "出仓运输中");
                                cleared = transinfo(item.cleared, "清关完成,转运");
                                arrived = transinfo(item.arrived, "抵达货运中心");
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
                                        item.yewuyuan,
                                        item.sendgoodsdate,
                                        item.arriveddate,
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
                                shipped = transinfo(item.shipped, "出仓运输中");
                                cleared = transinfo(item.cleared, "清关完成,转运");
                                arrived = transinfo(item.arrived, "抵达货运中心");
                                $("#goodslist").append(
                                    String.format(
                                        goodshtml,
                                        item.id,
                                        item.tracknumber,
                                        item.goodsnumber,
                                        item.id,
                                        item.tracknumber,
                                        item.goodsnumber,
                                        item.yewuyuan,
                                        item.sendgoodsdate,
                                        item.arriveddate,
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
                xtip.close(loading);
            },
        });
    }

    $(".editgoods").on("click", function () {
        var id = $(this).attr("dataid");
        window.location.href = "/editgoods?id=" + id;
    });

    //发货日期、到货日期
    var datecondition=0;
    //依据货物是否抵达查询
    var transportconditon=2;

    $(".sendgoodsdatebtncondition").on("click", function () {
        datecondition = 0;
        $(".sel_searchcondition").html("发货日期");
    })

    $(".arrivedgoodsdatebtncondition").on("click", function () {
        datecondition = 1;
        $(".sel_searchcondition").html("到货日期");
    })

    $(".get_sendgoodsdatebtncondition").on("click", function () {
        transportconditon = 1;
        console.log(transportconditon);
        $(".sel_getcondition_btn").html("已送达");
    })

    $(".get_arrivedgoodsdatebtncondition").on("click", function () {
        transportconditon = 0;
        console.log(transportconditon);
        $(".sel_getcondition_btn").html("未送达");
    })

    $(".get_allgoodsdatebtncondition").on("click", function () {
        transportconditon = 2;
        console.log(transportconditon);
        $(".sel_getcondition_btn").html("全部货物");
    })

    $("body").on("click", ".sel_getcondition_btn", function () {
        $("#goodslist").html("");
        var searchgoodsdate = $("#searchgoodsdate").val();
        dateFormat = /^(\d{4})-(\d{2})-(\d{2})$/;

        if (dateFormat.test(searchgoodsdate)) {
            var da = JSON.stringify({
                m: "search",
                dd: searchgoodsdate,
                datecondition: datecondition,
                transportcondition: transportconditon,
            });
            searchCondition(da);
        } else {
            // Qual.sdb(ee("日期格式不正确"));
            xtip.msg(ee("日期格式不正确"), {times: 4,icon: "e"});
            return;
        }
    })

    // $("#goodslist").on("click","tr",function(e){
    //     var dataid = $(this).children().eq(0).attr("dataid");
    //     // console.log(dataid);
    //     window.location.href = "/viewgoods?id="+dataid;
    // });

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
                    <div class="col-12"><span style='font-size: 3rem;'>扫码签收</span></div>
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
                width: 200, //宽度
                height: 200, //高度
                text: "https://app.crkargo.com/quickdeliver/?num=" + dataid
            });

            var img = document.getElementById(image_list1[i]); /// get image element
            var canvas  = document.getElementById(qrcode_list1[i]).children[0];  /// get canvas element
            img.src = canvas.toDataURL();                     /// update image
        }

        $("#printcontent").print({
            globalStyles:true,//否包父文档的样，默为true
            mediaPrint:false,//是否含media='print'的链接标签。会被globalStyles选项覆，默认false
            stylesheet:null,//外部样表的URL地，认为null
            noPrintSelector:".no-print",//不想打印元素的jQuery择器，默为".no-print"
            iframe:true,//否使用一个iframe替代打印表单的出窗，true为在页面进行印，false就是新开一页面打印，默认为true
            append:null,//将容添加到打印内的面
            prepend:null,//容添加到打印内容的前，可用来作为要打印内
            deferred:$.Deferred()//回调函数
        });

        $("#printcontent").css("display", "none");
    })

    $("body").on("click", ".sel_searchtrackinfo_btn", function () {
        var searchtrackinfo = $("#searchtrackinfo_dialog").val();
        if (isEmpty(searchtrackinfo)){
            xtip.msg(ee("对不起!搜索内容不允许为空"), {times: 4,icon: "e"});
            return;
        }
        var da = JSON.stringify({
            m: "searchtrackinfo",
            searchtrackinfo: searchtrackinfo,
        });
        $("#search_dialog").modal('hide');
        searchCondition(da);
    })

    var printdatatracknumber;
    var printdatagoodsnumber;
    $("body").on("click", ".singleprint", function () {
        printdatatracknumber = $(this).attr("datatracknumber");
        printdatagoodsnumber = $(this).attr("datagoodsnumber");
    })

    //单个面单批量打印
    $("body").on("click", ".sel_print_btn", function () {
        var print_number = $("#print_number").val();
        if (isEmpty(print_number)){
            xtip.msg(ee("对不起!打印数量不允许为空"), {times: 4,icon: "e"});
            return;
        }
        if (parseInt(print_number)<=0){
            xtip.msg(ee("对不起!打印数量不允许小于0"), {times: 4,icon: "e"});
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
                    <div class="col-12"><span style='font-size: 3rem;'>扫码签收</span></div>
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
                k,
                k,
            );
            trackcontent += content;
            qrcode_list1.push('qrcode-' +  k + "-quick");
            image_list1.push('image-' + k + "-quick");
        }
        trackcontent += "</div></div>";

        $("#printcontent").append(trackcontent);

        for (let i in qrcode_list1) {
            var dataid = qrcode_list1[i].split("-")[1];
            console.log(qrcode_list1[i]);
            $("#"+qrcode_list1[i]).qrcode({
                render: "canvas",
                width: 200, //宽度
                height: 200, //高度
                text: "https://app.crkargo.com/quickdeliver/?num=" + dataid
            });

            var img = document.getElementById(image_list1[i]); /// get image element
            var canvas  = document.getElementById(qrcode_list1[i]).children[0];  /// get canvas element
            img.src = canvas.toDataURL();                     /// update image
        }

        $("#printcontent").print({
            globalStyles:true,//否包父文档的样，默为true
            mediaPrint:false,//是否含media='print'的链接标签。会被globalStyles选项覆，默认false
            stylesheet:null,//外部样表的URL地，认为null
            noPrintSelector:".no-print",//不想打印元素的jQuery择器，默为".no-print"
            iframe:true,//否使用一个iframe替代打印表单的出窗，true为在页面进行印，false就是新开一页面打印，默认为true
            append:null,//将容添加到打印内的面
            prepend:null,//容添加到打印内容的前，可用来作为要打印内
            deferred:$.Deferred()//回调函数
        });
        $("#single_print_dialog").modal('hide');
        $("#printcontent").css("display", "none");
    })

});