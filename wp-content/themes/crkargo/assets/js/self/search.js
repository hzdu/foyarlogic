$(function () {
    var contenthtml = heredoc(function () {/*
        <div class="accordion-item mb-3">
            <h2 class="accordion-header" id="{0}">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#track-{1}" aria-expanded="true" aria-controls="track-{2}">
                    {3}
                </button>
            </h2>
            <div id="track-{4}" class="accordion-collapse collapse show" aria-labelledby="{5}" data-bs-parent="#trackinfo">
                <div class="accordion-body">
                    <div class="card-body">
                        <dl class="row mt-3">
                            <dt class="col-sm-3 text-light">{6}</dt>
                            <dd class="col-sm-3 text-light">{7}</dd>
                            <dt class="col-sm-3 text-light">{8}</dt>
                            <dd class="col-sm-3 text-light">{9}</dd>
                            <dt class="col-sm-3 text-light">{10}</dt>
                            <dd class="col-sm-3 text-light">{11}</dd>
                            <dt class="col-sm-3 text-light">{12}</dt>
                            <dd class="col-sm-3 text-light">{13}</dd>
                            <dt class="col-sm-3 text-light">{14}</dt>
                            <dd class="col-sm-3 text-light">{15}</dd>
                            <dt class="col-sm-3 text-light">{16}</dt>
                            <dd class="col-sm-3 text-light">{17}</dd>
                        </dl>
                        <dl class="row mt-3">
                        {18}
                        <script>
                            $('#responsiveness').swipeslider({sliderHeight:'50%'});
                        </script>
                        </dl>
                        <dl class="row mt-3">
                            <div class="col">
                                <span>{19}</span>
                            </div>
                            <div class="progress_bar">
                                <div class="pro-bar">
                                    <small class="progress_bar_title">
                                        {20}
                                    <span class="progress_number">{21}</span>
                                    </small>
                                    <span class="progress-bar-inner" style="background-color: #fdba04; width: {22}%;" data-value="{23}" data-percentage-value="{24}"></span>
                                </div>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    */})

    $("body").on("click", "#searchtrackinfobtn", function () {
        $("#trackinfo").html("");
        var tracknumber = $('#tracknumber').val();
        if (isEmpty(tracknumber)) {
            xtip.msg(ee("对不起,追踪运单不能为空"), {times: 4,icon: "e"});
            return;
        }
        loading = xtip.load();
        var da = JSON.stringify({
            m: "track",
            num: tracknumber,
        });
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/searchapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                xtip.closeAll();
                if (data.code != 200) {
                    xtip.msg(data.msg, {times: 4,icon: "w"});
                } else {
                    var html="";

                    $.each(data.trackinfo, function (index, item){
                        html += String.format(
                            contenthtml,
                            item.tracknumber,
                            item.id,
                            item.id,
                            item.tracknumber,
                            item.id,
                            item.tracknumber,
                            item.goodsnumbertitle,
                            item.goodsnumber,
                            item.updateinfodatetitle,
                            item.updateinfodate,
                            item.shippingtime_title,
                            item.shippingtime,
                            item.now_shippingtime_title,
                            item.now_shippingtime,
                            item.yujididashijian_title,
                            item.yujididashijian,
                            item.dabaofangshi_title,
                            item.dabaofangshi,
                            item.pics,
                            item.googlemap,
                            item.transtitle,
                            item.nexttranstitle,
                            item.transstatus,
                            item.transstatus,
                            item.transstatus,
                        );
                    })
                    $("#trackinfo").html(html);
                }
            },
        });
    })

})