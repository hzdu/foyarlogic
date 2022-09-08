$(function () {
    function createChart(chart_title, chart_xiangmu, data_array, data_obj ){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('charts1'));
        window.onresize = function(){
            myChart.resize();
        }
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: chart_title
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: chart_xiangmu,
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: data_array
            },
            yAxis: {
                type: 'value'
            },
            series: data_obj,
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

    $("#get_qudao_analysis_btn").on("click", function () {
        $("#chartmain").css("display", "none");
        $(".zongpiaoshu").html("");
        $(".zongzhongliang").html("");
        $(".zongyingshou").html("");
        $(".zongyingfu").html("");
        $(".zongmaoli").html("");

        var qudaomingchengid = $("#sel_qudaomingcheng").val();
        var qudaomingcheng  = $("#sel_qudaomingcheng").find("option:selected").text();
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
        if (qudaomingchengid=="null"){
            // Qual.sdb(ee("请选择需要用作数据分析的渠道"));
            xtip.msg(ee("请选择需要用作数据分析的渠道"), {times: 4,icon: "w"});
            return;
        }

        var da = JSON.stringify({
            m: "search",
            id: qudaomingchengid,
            qudaomingcheng: qudaomingcheng,
            st: startdate,
            et: enddate,
        });
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/analysisapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                if (data.code != 200) {
                    // Qual.sdb(data.msg);
                    xtip.msg(data.msg, {times: 4,icon: "w"});
                } else {
                    $(".zongpiaoshu").html(data.datacount);
                    $(".zongzhongliang").html(data.weightcollection);
                    $(".zongyingshou").html(data.zongyingshou);
                    $(".zongyingfu").html(data.zongyingfu);
                    $(".zongmaoli").html(data.zongmaoli);
                    $("#chartmain").removeAttr("style");
                    createChart(data.title, data.xiangmuarray, data.riqiarray, data.obj);
                    xtip.close(loading);
                }
            },
        });
    })
})