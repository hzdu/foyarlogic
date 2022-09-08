$(function () {
  var contenthtml = heredoc(function () {/*
  <tr>
  <td>{0}</td>
  <td>{1}</td>
  <td>{2}</td>
  <td>{3}</td>
  <td>{4}</td>
  </tr>
  */})

  $("#inputweight").keypress(function (even) {
    if (even.which == 13) {
      $(".getprice_btn").click();
    }
  });

  $("body").on("click", ".getprice_btn", function () {
    var inputweight = $("#inputweight").val();
    var inputvolume = $("#inputvolume").val();
    if (isEmpty(inputweight) || parseInt(inputweight)<0) {
      // Qual.sdb(ee("对不起!重量不能为空或小于0"));
      xtip.msg(ee("对不起!重量不能为空或小于0"), {times: 4,icon: "e"});
      return;
    }
    if (isEmpty(inputvolume) || parseInt(inputvolume)<0) {
      // Qual.sdb("对不起!体积不能为空或小于0");
      xtip.msg(ee("对不起!体积不能为空或小于0"), {times: 4,icon: "e"});
      return;
    }
    $("#pricelist").html("");
    var da = JSON.stringify({
      m: "queryprice",
      weight: inputweight,
      volume: inputvolume,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/querypriceapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          // Qual.sdb("价格获取失败,请稍后重试");
          xtip.msg(ee("价格获取失败,请稍后重试"), {times: 4,icon: "e"});
        } else {
          $.each(data.c_price,function (idx, item) {
            $("#pricelist").append(
                String.format(
                    contenthtml,
                    item.channelname,
                    item.weight,
                    item.price,
                    item.transportationtime,
                    item.amount,
                )
            );
          })
        }
        xtip.close(loading);
      },
    });
  });
});
