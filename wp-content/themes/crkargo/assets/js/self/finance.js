$(function () {
    var kouchuqitachengben = 1;
    var kouchugongzi = 1;
    var contenthtml = heredoc(function () {/*
        <tr>
            <td><a href="viewgoods?id={0}" target="_blank">{1}</a></td>
            <td>{2}</td>
            <td>{3}</td>
            <td>{4}</td>
            <td>{5}</td>
            <td class="text-warning">{6}</td>
            <td class="text-warning">{7}</td>
            <td class="text-warning">{8}</td>
            <td class="text-warning">{9}</td>
            <td class="text-warning">{10}</td>
            <td class="text-warning">{11}</td>
            <td class="text-warning">{12}</td>
            <td class="text-danger">{13}</td>
            <td class="text-success">{14}</td>
            <td>{15}</td>
            <td>{16}</td>
            <td class="text-success">{17}</td>
            <td class="text-danger">{18}</td>
            <td>
                <div class="form-check form-switch">
                    <input class="form-check-input c_jiesuan" type="checkbox" dataid="{19}" {20}>
                </div>
            </td>
        </tr>
        */
    });

    $("body").on('change', ".c_jiesuan", function() {
        var isjiesuan;
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
        });

        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/financeapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                $(".getfinance_btn").click();
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

    $(".getfinance_btn").on("click", function () {
        $("#financelist").html("");
        var startdate = $("#startdate").val();
        var enddate = $("#enddate").val();

        if (checkdate(startdate)==false){
            // Qual.sdb(ee("起始日期不正确"));
            xtip.msg(ee("起始日期不正确"), {times: 4,icon: "e"});
            return;
        }

        if (checkdate(enddate)==false){
            // Qual.sdb(ee("结束日期不正确"));
            xtip.msg(ee("结束日期不正确"), {times: 4,icon: "e"});
            return;
        }

        var da = JSON.stringify({
            m: "getfinance",
            st: startdate,
            et: enddate,
            kcqitachengben: kouchuqitachengben,
            kcgongzi: kouchugongzi,
        });
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/financeapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                if (data.code != 200) {
                    // Qual.sdb(data.msg);
                    xtip.msg(data.msg, {times: 4,icon: "w"});
                } else {
                    $.ajax({
                        url: 'https://api.exchangerate-api.com/v4/latest/usd',
                        type: 'GET',
                        success: function (data) {
                            var html = "1 : ";
                            var huilv = data.rates.CNY;
                            var content = html + huilv;
                            $(".huilv").html(content);
                        }
                    });

                    $(".zongshouru").html(data.zongshouru);
                    $(".fahuochengbenzhichu").html(data.fahuochengbenzhichu);
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
                                        item.yuangongmingzi,
                                        item.gongzi,
                                        item.ticheng,
                                        item.maoli,
                                        // item.lirun,
                                        // item.huobixingshi,
                                        item.id,
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
                                        item.yuangongmingzi,
                                        item.gongzi,
                                        item.ticheng,
                                        item.maoli,
                                        // item.lirun,
                                        // item.huobixingshi,
                                        item.id,
                                        "checked",
                                    )
                                );
                                break;
                        }
                    })
                    // Qual.sdb(data.msg);
                    xtip.msg(data.msg, {times: 4,icon: "s"});
                }
                xtip.close(loading);
            },
        });
    })
})