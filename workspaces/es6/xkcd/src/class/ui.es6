 class Ui {
    constructor () {
        this.infinite = null;
    }
    listen () {
        this.infinite = new Waypoint.Infinite({
          element: $('footer')[0]
        })
        $(window).scroll(function() {   
            if($(window).scrollTop() + $(window).height() == $(document).height()) {
                console.log(
                    $(window).scrollTop(),
                    '+',
                    $(window).height(),
                    ' == ',
                    $(document).height()
                    );
                var e = $.Event('bottomreached');
                $('body').trigger(e);
            }
        });
    }
}