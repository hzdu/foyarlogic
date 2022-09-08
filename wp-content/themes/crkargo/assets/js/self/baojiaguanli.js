$(function () {
  var usedchannel;
  var useproxy;
  $(".addchannelnames").on("click", function () {
    var inputchannelname = $("#inputchannelname").val();
    var inputcalcmethod = $("#inputcalcmethod").val();
    var inputusedchannel;
    var inputusedproxy;
    var inputtransportationtime = $("#inputtransportationtime").val();
    var qudaomingchengid = $("#selqudaomingcheng").val();
    switch ($("#inputusedchannel").prop("checked")) {
      case true:
        if (qudaomingchengid=="0"){
          Qual.sdb("对不起!请选择渠道报价表所属的渠道");
          return;
        }
        inputusedchannel = "1";
        break;
      case false:
        inputusedchannel = "0";
        break;
    }
    switch ($("#inputusedproxy").prop("checked")) {
      case true:
        inputusedproxy = "1";
        break;
      case false:
        inputusedproxy = "0";
        break;
    }
    if (isEmpty(inputchannelname)) {
      Qual.sdb("对不起,报价表名称不能为空");
      return;
    }
    var da = JSON.stringify({
      m: "add",
      channelname: inputchannelname,
      calcmethod: inputcalcmethod,
      usedchannel: inputusedchannel,
      usedproxy: inputusedproxy,
      transportationtime: inputtransportationtime,
      qudaomingchengid: qudaomingchengid,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/baojiaguanliapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "e"});
        } else {
          xtip.close(loading);
          window.location.reload();
        }
      },
    });
  });

  $(".delchannel").on("click", function () {
    var id = $(this).attr("dataid");
    var da = JSON.stringify({
      m: "delete",
      id: id,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/baojiaguanliapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "e"});
        } else {
          window.location.reload();
        }
        xtip.close(loading);
      },
    });
  });

  // 获取数据
  $(".editchannel").on("click", function () {
    var id = $(this).attr("dataid");
    $("#editchannelid").attr("dataid", id);
    var da = JSON.stringify({
      m: "getone",
      id: id,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/baojiaguanliapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "e"});
        } else {
          $("#ed_inputchannelname").val(data.channelname);
          $("#ed_inputcalcmethod").val(data.calculationid);
          $("#ed_selqudaomingcheng").val(data.qudaomingchengid);
          switch (data.usechannel) {
            case "0":
              $("#ed_inputusedchannel").prop("checked", false);
              break;
            case "1":
              $("#ed_inputusedchannel").prop("checked", true);
              break;
          }
          switch (data.useproxy) {
            case "0":
              $("#ed_inputusedproxy").prop("checked", false);
              break;
            case "1":
              $("#ed_inputusedproxy").prop("checked", true);
              break;
          }
          $("#ed_inputtransportationtime").val(data.transportationtime);
        }
        xtip.close(loading);
      },
    });
  });

  // 提交编辑的数据
  $(".editchannelname").on("click", function () {
    var inputchannelname = $("#ed_inputchannelname").val();
    var inputcalcmethod = $("#ed_inputcalcmethod").val();
    var inputtransportationtime = $("#ed_inputtransportationtime").val();
    var qudaomingchengid = $("#ed_selqudaomingcheng").val();
    var inputusedchannel;
    var inputusedproxy;
    switch ($("#ed_inputusedchannel").prop("checked")) {
      case true:
        inputusedchannel = "1";
        break;
      case false:
        inputusedchannel = "0";
        break;
    }
    switch ($("#ed_inputusedproxy").prop("checked")) {
      case true:
        inputusedproxy = "1";
        break;
      case false:
        inputusedproxy = "0";
        break;
    }
    if (isEmpty(inputchannelname)) {
      Qual.sdb("对不起,报价表名称不能为空");
      return;
    }
    var da = JSON.stringify({
      m: "edit",
      id: $("#editchannelid").attr("dataid"),
      channelname: inputchannelname,
      calcmethod: inputcalcmethod,
      usedchannel: inputusedchannel,
      usedproxy: inputusedproxy,
      transportationtime: inputtransportationtime,
      qudaomingchengid: qudaomingchengid,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/baojiaguanliapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "e"});
        } else {
          window.location.reload();
        }
        xtip.close(loading);
      },
    });
  });

  $("#inputusedchannel").change(function () {
    switch ($(this).prop("checked")) {
      case true:
        $(this).parent().parent().next().next().children().eq(1).children().prop("checked", false);
        break;
      case false:
        $(this).parent().parent().next().next().children().eq(1).children().prop("checked", true);
        break;
    }
  })

  $("#inputusedproxy").change(function () {
    switch ($(this).prop("checked")) {
      case true:
        $(this).parent().parent().prev().prev().children().eq(1).children().prop("checked", false);
        break;
      case false:
        $(this).parent().parent().prev().prev().children().eq(1).children().prop("checked", true);
        break;
    }
  })

  $("#ed_inputusedchannel").change(function () {
    switch ($(this).prop("checked")) {
      case true:
        $(this).parent().parent().next().next().children().eq(1).children().prop("checked", false);
        break;
      case false:
        $(this).parent().parent().next().next().children().eq(1).children().prop("checked", true);
        break;
    }
  })

  $("#ed_inputusedproxy").change(function () {
    switch ($(this).prop("checked")) {
      case true:
        $(this).parent().parent().prev().prev().children().eq(1).children().prop("checked", false);
        break;
      case false:
        $(this).parent().parent().prev().prev().children().eq(1).children().prop("checked", true);
        break;
    }
  })

  $(".c_usedchannel").change(function () {
    switch ($(this).prop("checked")) {
      case true:
        usedchannel = "1";
        useproxy = "0";
        $(this).parent().parent().next().children().children().prop("checked", false);
        break;
      case false:
        usedchannel = "0";
        useproxy = "1";
        $(this).parent().parent().next().children().children().prop("checked", true);
        break;
    }
    // console.log(usedchannel);
    var id = $(this).attr("dataid");
    var da = JSON.stringify({
      m: "setused",
      id: id,
      usedchannel: usedchannel,
      usedproxy: useproxy,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/baojiaguanliapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "e"});
        } else {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "e"});
        }
        xtip.close(loading);
      },
    });
  });

  $(".c_usedproxy").change(function () {
    switch ($(this).prop("checked")) {
      case true:
        usedchannel = "0";
        useproxy = "1";
        $(this).parent().parent().prev().children().children().prop("checked", false);
        break;
      case false:
        usedchannel = "1";
        useproxy = "0";
        $(this).parent().parent().prev().children().children().prop("checked", true);
        break;
    }
    var id = $(this).attr("dataid");
    var da = JSON.stringify({
      m: "setused",
      id: id,
      usedchannel: usedchannel,
      usedproxy: useproxy,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/baojiaguanliapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        xtip.msg(data.msg, {times: 4,icon: "e"});
        xtip.close(loading);
      },
    });
  })
});
