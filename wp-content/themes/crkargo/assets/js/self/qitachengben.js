$(function () {
    var noweditid;

    $(".getdata_btn").on("click", function () {
        var contenthtml = heredoc(function () {/*
<tr>
<td dataid="{0}">{1}</td>
<td>{2}</td>
<td>{3}</td>
<td>{4}</td>
<td>
<div class="btn-group">
<a href="javascript:;" class="btn btn btn-primary editchengben" dataid="{5}" data-bs-toggle="modal" data-bs-target="#edit_chengben"><i class="bx bxs-pencil"></i></a>
<a href="javascript:;" class="btn btn btn-primary delchengben" dataid="{6}"><i class="bx bx-unlink"></i></a>
</div>
</td>
</tr>
        */})
        $("#chengbenlist").html("");
        $(".hejizhichu").html("");
        var startdate = $("#startdate").val();
        var enddate = $("#enddate").val();
        if (checkdate(startdate)==false){
            // Qual.sdb(ee("起始日期格式不正确"));
            xtip.msg(ee("起始日期格式不正确"), {times: 4,icon: "e"});
            return;
        }
        if (checkdate(enddate)==false){
            // Qual.sdb(ee("结束日期格式不正确"));
            xtip.msg(ee("结束日期格式不正确"), {times: 4,icon: "e"});
            return;
        }
        var da = JSON.stringify({
            m: "search",
            st: startdate,
            et: enddate,
        });
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/qitachengbenapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                if (data.code != 200) {
                    // Qual.sdb(data.msg);
                    xtip.msg(data.msg, {times: 4,icon: "w"});
                }else{
                    $(".hejizhichu").html(data.heji);
                    $.each(data.data,function (idx, item) {
                        $("#chengbenlist").append(
                            String.format(
                                contenthtml,
                                item.id,
                                item.riqi,
                                item.mingcheng,
                                item.jine,
                                item.username,
                                item.id,
                                item.id,
                            )
                        );
                    })
                    // Qual.sdb(data.msg);
                    xtip.msg(data.msg, {times: 4,icon: "s"});
                }
                xtip.close(loading);
            },
        });
    })

    $(".delchengben").on("click", function () {
        var id = $(this).attr("dataid");
        var da = JSON.stringify({
            m: "delete",
            id: id,
        });
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/qitachengbenapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                if (data.code != 200) {
                    // Qual.sdb(data.msg);
                    xtip.msg(data.msg, {times: 4,icon: "w"});
                }else{
                    window.location.reload();
                }
                xtip.close(loading);
            },
        });
    })

    $(".savechengbenbtn").on("click", function () {
        var riqi = $("#usedate").val();
        var xiangmumingcheng = $("#inputxiangmumingcheng").val();
        var xiangmujine = $("#inputjine").val();
        var da = JSON.stringify({
            m: "add",
            riqi: riqi,
            mingcheng: xiangmumingcheng,
            jine: xiangmujine,
        });
        if (checkdate(riqi)==false){
            // Qual.sdb(ee("日期格式不正确"));
            xtip.msg(ee("日期格式不正确"), {times: 4,icon: "e"});
            return;
        }
        if (isEmpty(xiangmumingcheng)){
            // Qual.sdb(ee("项目名称不能为空"));
            xtip.msg(ee("项目名称不能为空"), {times: 4,icon: "e"});
            return;
        }
        if (isEmpty(xiangmujine) || parseInt(xiangmujine)<0){
            // Qual.sdb(ee("项目金额不能为空或小于0"));
            xtip.msg(ee("项目金额不能为空或小于0"), {times: 4,icon: "e"});
            return;
        }
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/qitachengbenapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                if (data.code != 200) {
                    // Qual.sdb(data.msg);
                    xtip.msg(data.msg, {times: 4,icon: "w"});
                }else{
                    // Qual.sdb(data.msg);
                    xtip.msg(data.msg, {times: 4,icon: "s"});
                }
                xtip.close(loading);
            },
        });
    })
    $("#inputjine").on("input", function () {
        this.val(checkfloatnumber(this));
    });
    //获取需要编辑的数据
    $(".editchengben").on("click", function () {
        var id = $(this).attr("dataid");
        noweditid = id;
        var da = JSON.stringify({
            m: "getone",
            id: id,
        });
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/qitachengbenapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                if (data.code != 200) {
                    Qual.sdb(data.msg);
                }else{
                    $("#ed_usedate").val(data.shitichengben.riqi);
                    $("#ed_inputxiangmumingcheng").val(data.shitichengben.mingcheng);
                    $("#ed_inputjine").val(data.shitichengben.jine);
                    $("#ed_selfuzeren").val(data.shitichengben.userid);
                }
                xtip.close(loading);
            },
        });
    })
})