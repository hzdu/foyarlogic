$(function () {
    var kouchuqitachengben = 1;
    var kouchugongzi = 1;
    var contenthtml = heredoc(function () {/*
        <tr>
            <td><a href="viewgoods?id={0}" target="_blank" class="text-light">{1}</a></td>
            <td>{2}</td>
            <td>{3}</td>
            <td>{4}</td>
            <td>{5}</td>
            <td class="text-warning">{6}</td>
            <td class="text-warning">{7}</td>
            <td class="text-warning">{8}</td>
            <td class="text-success">{9}</td>
            <td class="text-success">{10}</td>
            <td class="text-success">{11}</td>
            <td class="text-success">{12}</td>
            <td class="text-danger">{13}</td>
            <td class="text-success">{14}</td>
            <td>{15}</td>
            <td>{16}</td>
            <td class="text-success">{17}</td>
            <td class="text-success">{18}</td>
            <td class="text-danger">{19}</td>
            <td class="text-warning showshoukuansuozaidi" data-bs-toggle="modal" data-bs-target="#edit_shoukuansuozaidi_dialog" style="cursor:pointer;" dataid="{20}">{21}</td>
            <td>
                <div class="form-check form-switch">
                    <input class="form-check-input qudao_jiesuan" type="checkbox" dataid="{22}" datanumber="{23}" {24}>
                </div>
            </td>
            <td>
                <div class="form-check form-switch">
                    <input class="form-check-input caiwu_jiesuan" type="checkbox" dataid="{25}" datanumber="{26}" {27}>
                </div>
            </td>
        </tr>
        */
    });

    var singleshoukuandizhi;
    var singleshoukuandizhiid;
    $("body").on("click", ".showshoukuansuozaidi",function () {
        singleshoukuandizhiid = $(this).attr("dataid");
        singleshoukuandizhi = $(this);
        var da = JSON.stringify({
            m: "getoneshoukuandi",
            id: singleshoukuandizhiid,
        });
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/financeapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                xtip.close(loading);
                if (data.code != 200) {
                    xtip.msg(data.msg, {times: 4,icon: "w"});
                } else {
                    $("#cbshoukuanweizhi").val(data.val);
                }
            },
        });
    })

    $("body").on("click", ".save_shoukuandizhi_btn",function () {
        var da = JSON.stringify({
            m: "saveshoukuandizhi",
            id: singleshoukuandizhiid,
            val: $("#cbshoukuanweizhi").val(),
        });
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/financeapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                xtip.close(loading);
                $("#edit_shoukuansuozaidi_dialog").modal('hide');
                if (data.code != 200) {
                    xtip.msg(data.msg, {times: 4,icon: "w"});
                } else {
                    switch (data.val) {
                        case "0":
                            singleshoukuandizhi.html(ee("国内"));
                            break;
                        case "1":
                            singleshoukuandizhi.html(ee("国外"));
                            break;
                    }
                    $("#cbshoukuanweizhi").val(data.val);
                    xtip.msg(data.msg, {times: 4,icon: "s"});
                }
            },
        });
    })

    var caiwujiesuanthis;
    $("body").on('change', ".caiwu_jiesuan", function() {
        caiwujiesuanthis = $(this);
        var isjiesuan;
        var tracknumber = $(this).attr("datanumber");
        switch ($(this).prop("checked")) {
            case true:
                isjiesuan = "1";
                break;
            case false:
                isjiesuan = "0";
                break;
        }
        var da = JSON.stringify({
            m: "editjiesuan",
            trakcid:$(this).attr("dataid"),
            jiesuan:isjiesuan,
            tracknumber: tracknumber,
        });

        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/financeapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                if (data.code!=200){
                    caiwujiesuanthis.prop('checked', false);
                    xtip.msg(ee(data.msg), {times: 6,icon: "e"});
                }else{
                    caiwujiesuanthis.prop('checked', true);
                    xtip.msg(ee(data.msg), {times: 4,icon: "s"});
                }
            },
        });
    });

    var qudaojiesuanthis;
    $("body").on('change', ".qudao_jiesuan", function() {
        qudaojiesuanthis = $(this);
        var isjiesuan;
        var tracknumber = $(this).attr("datanumber");
        switch ($(this).prop("checked")) {
            case true:
                isjiesuan = "1";
                break;
            case false:
                isjiesuan = "0";
                break;
        }
        var da = JSON.stringify({
            m: "editqudaojiesuan",
            trakcid:$(this).attr("dataid"),
            qudaojiesuan:isjiesuan,
            tracknumber: tracknumber,
        });

        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/financeapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                if (data.code!=200){
                    qudaojiesuanthis.prop('checked', false);
                    xtip.msg(ee(data.msg), {times: 6,icon: "e"});
                }else{
                    qudaojiesuanthis.prop('checked', true);
                    xtip.msg(ee(data.msg), {times: 4,icon: "s"});
                }
            },
        });
    });

    $("#cbqitachengben").change(function () {
        switch ($(this).prop("checked")) {
            case true:
                kouchuqitachengben = 1;
                break;
            case false:
                kouchuqitachengben = 0;
                break;
        }
    })

    var ajaxhuilv = 0;
    $("#cbtongji").change(function () {
        switch ($(this).prop("checked")) {
            case true:
                switch (ajaxhuilv) {
                    case 0:
                        loading = xtip.load();
                        $.ajax({
                            url: 'https://api.exchangerate-api.com/v4/latest/usd',
                            type: 'GET',
                            success: function (data) {
                                xtip.close(loading);
                                var html = "1 : ";
                                var huilv = data.rates.CNY;
                                var content = html + huilv;
                                $(".huilv").html(content);
                            }
                        });
                        ajaxhuilv = 1;
                        break;
                }
                $(".shujutongji").removeAttr("style");
                break;
            case false:
                $(".shujutongji").css("display", "none");
                break;
        }
    })

    $("#cbgongzi").change(function () {
        switch ($(this).prop("checked")) {
            case true:
                kouchugongzi = 1;
                break;
            case false:
                kouchugongzi = 0;
                break;
        }
    })

    var qudaohtml = heredoc(function () {/*
<select class="single-select" id="sel_qudao" style="width:100%;">
    {0}
</select>
    */})
    qudaohtml = String.format(qudaohtml, qudaoselhtml);

    var yewuyuanhtml = heredoc(function () {/*
<select class="single-select" id="sel_yewuyuan" style="width:100%;">
    {0}
</select>
    */})
    yewuyuanhtml = String.format(yewuyuanhtml, yewuyuanselhtml);

    var xingshi;
    $("#sel_zhangdanxingshi").change(function () {
        switch ($("#sel_zhangdanxingshi").val()) {
            case "null":
            case "0":
            case "1":
                $(".qudaotip").css("display", "none");
                $(".yewuyuantip").css("display", "none");
                break;
            case "9":
                //获取渠道的ID
                xtip.win({
                    type: 'confirm', //alert 或 confirm
                    btn: [ee("提交")],
                    tip: qudaohtml,
                    // icon: 'success',
                    title: ee("渠道"),
                    min: false,
                    width: '200px',
                    maxWidth: '100%',
                    shade: true,
                    shadeClose: true,
                    lock: true,
                    btn1: function(){
                        xingshi = $("#sel_qudao").val();
                        $(".qudaotip").html(ee("当前操作的对象为【渠道】:")+$("#sel_qudao").find("option:selected").text());
                        $(".qudaotip").removeAttr("style");
                        $(".yewuyuantip").css("display", "none");
                    },
                    btnbg: [true],
                    zindex: 99999,
                });
                break;
            case "10":
                //业务员账单
                xtip.win({
                    type: 'confirm', //alert 或 confirm
                    btn: [ee("提交")],
                    tip: yewuyuanhtml,
                    // icon: 'success',
                    title: ee("业务账号"),
                    min: false,
                    width: '300px',
                    maxWidth: '100%',
                    shade: true,
                    shadeClose: true,
                    lock: true,
                    btn1: function(){
                        xingshi = $("#sel_yewuyuan").val();
                        $(".yewuyuantip").html(ee("当前操作的对象为【业务员】:")+$("#sel_yewuyuan").find("option:selected").text());
                        $(".qudaotip").css("display", "none");
                        $(".yewuyuantip").removeAttr("style");
                    },
                    btnbg: [true],
                    zindex: 99999,
                });
                break;
        }
    })

    $(".getfinance_btn").on("click", function () {
        $("#financelist").html("");
        $(".zongshouru").html("");
        $(".zongzhichu").html("");
        $(".qudaozongchengben").html("");
        $(".qudaoyijiesuanchengben").html("");
        $(".qudaoweijiesuanchengben").html("");
        $(".tichengzonge").html("");
        $(".qitazhichuzonge").html("");
        $(".zonggongzi").html("");
        $(".chunlirun").html("");
        $(".zongpiaoshu").html("");
        $(".zongzhongliang").html("");


        var startdate = $("#startdate").val();
        var enddate = $("#enddate").val();
        var zhangdanxingshi = $("#sel_zhangdanxingshi").val();

        if (checkdate(startdate)==false){
            xtip.msg(ee("起始日期不正确"), {times: 4,icon: "e"});
            return;
        }

        if (checkdate(enddate)==false){
            xtip.msg(ee("结束日期不正确"), {times: 4,icon: "e"});
            return;
        }

        if (zhangdanxingshi=="null"){
            xtip.msg(ee("请选择需要获取的财务账单形式"), {times: 4,icon: "e"});
            return;
        }

        switch (orginal) {
            case 0:
                var da = JSON.stringify({
                    m: "getfinance",
                    st: startdate,
                    et: enddate,
                    kcqitachengben: kouchuqitachengben,
                    kcgongzi: kouchugongzi,
                    zhangdanxingshi: zhangdanxingshi,
                    xingshi: xingshi,
                    orginalid: "null",
                });
                break;
            case 1:
                var da = JSON.stringify({
                    m: "getfinance",
                    st: startdate,
                    et: enddate,
                    kcqitachengben: kouchuqitachengben,
                    kcgongzi: kouchugongzi,
                    zhangdanxingshi: zhangdanxingshi,
                    xingshi: xingshi,
                    orginalid: $("#sel_orginals").val(),
                });
                break;
        }
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/financeapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                xtip.close(loading);
                if (data.code != 200) {
                    xtip.msg(data.msg, {times: 4,icon: "w"});
                } else {
                    $(".zongshouru").html(data.zongshouru);
                    $(".zongzhichu").html(data.zongzhichu);
                    $(".qudaozongchengben").html(data.qudaozongchengben);
                    $(".qudaoyijiesuanchengben").html(data.qudaoyijiesuanchengben);
                    $(".qudaoweijiesuanchengben").html(data.qudaoweijiesuanchengben);
                    $(".tichengzonge").html(data.tichengzonge);
                    $(".qitazhichuzonge").html(data.qitazhichuzonge);
                    $(".zonggongzi").html(data.zonggongzi);
                    $(".chunlirun").html(data.chunlirun);
                    $(".zongpiaoshu").html(data.zongpiaoshu);
                    $(".zongzhongliang").html(data.zongzhongliang);

                    $.each(data.finance, function (index, item) {
                        var amountmethod;
                        switch (item.amountstatusid) {
                            case "1":
                                amountmethod = "现付";
                                break;
                            case "2":
                                amountmethod = "预付";
                                break;
                            case "3":
                                amountmethod = "到付";
                                break;
                        }
                        switch (item.shoukuanweizhi) {
                            case "0":
                                amountmethod = "国内";
                                break;
                            case "1":
                                amountmethod = "国外";
                                break;
                        }
                        var qudaojiesuan;
                        switch (item.qudaojiesuan){
                            case "0":
                                qudaojiesuan = "";
                                break;
                            case "1":
                                qudaojiesuan = "checked";
                                break;
                        }
                        switch (item.jiesuan) {
                            case "0":
                                $("#financelist").append(
                                    String.format(
                                        contenthtml,
                                        item.id,
                                        item.tracknumber,
                                        item.sendgoodsdate,
                                        item.arriveddate,
                                        item.weight,
                                        amountmethod,
                                        item.gongbujiazonge,
                                        item.shishoubaoxianfei,
                                        item.dabaofei,
                                        item.zhifubaoxianfei,
                                        item.luodifei,
                                        item.transitedamount,
                                        item.yufuamount,
                                        item.yingshou,
                                        item.amount,
                                        item.qudaomingcheng,
                                        item.yuangongmingzi,
                                        item.gongzi,
                                        item.ticheng,
                                        item.maoli,
                                        item.id,
                                        item.shoukuanweizhi,
                                        item.id,
                                        item.tracknumber,
                                        qudaojiesuan,
                                        item.id,
                                        item.tracknumber,
                                        "",
                                    )
                                );
                                break;
                            case "1":
                                $("#financelist").append(
                                    String.format(
                                        contenthtml,
                                        item.id,
                                        item.tracknumber,
                                        item.sendgoodsdate,
                                        item.arriveddate,
                                        item.weight,
                                        amountmethod,
                                        item.gongbujiazonge,
                                        item.shishoubaoxianfei,
                                        item.dabaofei,
                                        item.zhifubaoxianfei,
                                        item.luodifei,
                                        item.transitedamount,
                                        item.yufuamount,
                                        item.yingshou,
                                        item.amount,
                                        item.qudaomingcheng,
                                        item.yuangongmingzi,
                                        item.gongzi,
                                        item.ticheng,
                                        item.maoli,
                                        item.id,
                                        item.shoukuanweizhi,
                                        item.id,
                                        item.tracknumber,
                                        qudaojiesuan,
                                        item.id,
                                        item.tracknumber,
                                        "checked",
                                    )
                                );
                                break;
                        }
                    })
                }
            },
        });
    })
})