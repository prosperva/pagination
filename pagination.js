$(function(){
    currentlySelected = 1;
    totalPageCount = 20;
    defaultNumOfPages = 5;
    currentPageArray = [];
    paginationElem = $(".pagination");
    totalRecordElem = $(".totalPageCount");
    
    let drawPagination = function(arr, highlightPage) {
        var pagination = '<ul><li><a href="#" class="back"><</a></li><li><a href="#" class="first"><<</a></li>';
        
        for (var i = 0; i < arr.length; i++) {
            pagination += '<li class="page"><a href="#" class="pageNum" data-pageNum ="' + arr[i] + '">' 
                + arr[i] + '</a></li>';
        }
        pagination += '<li><a href="#" class="forward">></a></li>';
        pagination += '<li><a href="#" class="last">>></a></li></ul>';

        $('.pagination').html(pagination);
        $('li').removeClass('selectedPage');
        currentlySelected = highlightPage;
        currentPageArray = arr;
        $('.pageNum[data-pagenum="' + highlightPage + '"]').parent('li').addClass('selectedPage');
    };

    let setPages = function(isForward) {
        var arr = [];
        $('.pageNum').each(function(){
            if(forward){
            arr.push($(this).data('pagenum') + 1);
            } else {
                arr.push($(this).data('pagenum') - 1);
            }
        });
        currentPageArray = arr;
        return currentPageArray;
    };

    let initializePagination = function() {
        currentPageArray = [];
        if (typeof totalPageCount == 'undefined' || 
            typeof totalPageCount !== "number" || 
            totalPageCount == 0 ||
            typeof paginationElem == "undefined"){
            return;
        }

        if (totalPageCount > defaultNumOfPages) {
            for(var i = 1; i <= defaultNumOfPages; i++){
                currentPageArray.push(i);
            }
        } else {
            for(var i = 1; i <= totalPageCount; i++){
                currentPageArray.push(i);
            }
        }

        drawPagination(currentPageArray, 1);

        if(typeof totalRecordElem !== "undefined") {
            totalRecordElem.html("Total Number of pages: " + totalPageCount);
        }
    }

    if(typeof paginationElem != 'undefined'){
        initializePagination();
    }

    $('body').on('click','.pageNum' , function(){
        $('li').removeClass('selectedPage');
        $(this).parent('li').addClass("selectedPage");
        var page = $(this).data('pagenum');
        currentlySelected = page;
    });

    $('body').on('click','.back' , function(){
        var nextPage = currentlySelected - 1;
        var highlightElement = $('.pageNum[data-pagenum="' + nextPage + '"]');
        if(highlightElement.is(":visible")) {
            $('li').removeClass('selectedPage');
            $('.pageNum[data-pagenum="' + nextPage + '"]').parent('li').addClass('selectedPage');
            currentlySelected = nextPage;
        } else {
            if(nextPage > 1 || nextPage == 1){
                drawPagination(setPages(false), nextPage);
            }
        }
    });

    $('body').on('click','.first' , function(){
        initializePagination();
    });

    $('body').on('click','.forward' , function(){
        var nextPage = currentlySelected + 1;
        var highlightElement = $('.pageNum[data-pagenum="' + nextPage + '"]');
        if(highlightElement.is(":visible")) {
            $('li').removeClass('selectedPage');
            $('.pageNum[data-pagenum="' + nextPage + '"]').parent('li').addClass('selectedPage');
            currentlySelected = nextPage;
            var arr = [];
            $('.pageNum').each(function(){
                arr.push($(this).data('pagenum'));
            });
            currentPageArray = arr;
        } else {
            setPages(true);
            if(nextPage < totalPageCount || nextPage == totalPageCount){
                drawPagination(currentPageArray, nextPage);
            }
        }
    });

    $('body').on('click','.last' , function(){
        var nextPage = totalPageCount;
        var highlightElement = $('.pageNum[data-pagenum="' + nextPage + '"]');
        if(highlightElement.is(":visible")) {
            $('li').removeClass('selectedPage');
            $('.pageNum[data-pagenum="' + nextPage + '"]').parent('li').addClass('selectedPage');
            currentlySelected = nextPage;
        } else {
            var arr = [];
            var arrCount = totalPageCount - defaultNumOfPages + 1;
            for(var s = totalPageCount; s >= arrCount; s--){
                arr.push(s);
            }
            arr.reverse();
            nextPage = arr[arr.length - 1];
            drawPagination(arr, nextPage)
        }
    });
});