$(function () {
    var contenthtml = heredoc(function () {/*
        <tr>
            <td>{0}</td>
            <td>{1}</td>
            <td>{2}</td>
            <td class="text-primary">{3}</td>
            <td class="text-primary">{4}</td>
            <td class="text-primary">{5}</td>
            <td class="text-success">{6}</td>
            <td class="text-success">{7}</td>
            <td class="text-success">{8}</td>
            <td>{9}</td>
        </tr>
        */
    });

    $(".getfinance_btn").on("click", function () {
        $("#financelist").html("");
        var startdate = $("#startdate").val();
        var enddate = $("#enddate").val();

        if (checkdate(startdate)==false){
            // Qual.sdb("起始日期不正确");
            xtip.msg(ee("起始日期不正确"), {times: 4,icon: "e"});
            return;
        }

        if (checkdate(enddate)==false){
            // Qual.sdb("结束日期不正确");
            xtip.msg(ee("结束日期不正确"), {times: 4,icon: "e"});
            return;
        }

        var da = JSON.stringify({
            m: "getfinance",
            st: startdate,
            et: enddate,
        });
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/myfinanceapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                if (data.code != 200) {
                    // Qual.sdb(data.msg);
                    xtip.msg(data.msg, {times: 4,icon: "e"});
                } else {
                    $(".rmbgongzi").html(data.rmbgongzi);
                    $(".rmbticheng").html(data.rmbticheng);

                    $(".usdgongzi").html(data.usdgongzi);
                    $(".usdticheng").html(data.usdticheng);

                    $(".surgongzi").html(data.surgongzi);
                    $(".surticheng").html(data.surticheng);

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
                                        item.tracknumber,
                                        item.sendgoodsdate,
                                        amountmethod,
                                        item.amount,
                                        item.otheramount,
                                        item.transitedamount,
                                        item.yufuamount,
                                        item.channelamount,
                                        item.ticheng,
                                        item.huobixingshi,
                                    )
                                );
                                break;
                            case "1":
                                $("#financelist").append(
                                    String.format(
                                        contenthtml,
                                        item.tracknumber,
                                        item.sendgoodsdate,
                                        amountmethod,
                                        item.amount,
                                        item.otheramount,
                                        item.transitedamount,
                                        item.yufuamount,
                                        item.channelamount,
                                        item.ticheng,
                                        item.huobixingshi,
                                    )
                                );
                                break;
                        }
                    })
                    // Qual.sdb(data.msg);
                    xtip.msg(data.msg, {times: 4,icon: "e"});
                }
                xtip.close(loading);
            },
        });
    })
})