$(document).ready(function() {
    let key = "api_key=961d2e531ab267675e3b02f11529ca96";
    let base = "https://api.themoviedb.org/3";
    let lang = "&language=ko-KR"
    let apiUrl = base + "/discover/movie?sort_by=popularity.desc&" + key + lang;

    const genreIdList = function(id) {
        switch(id) {
            case 28 : return "액션";
            case 12 : return "모험";
            case 16 : return "애니메이션";
            case 35 : return "코메디";
            case 80 : return "범죄";
            case 99 : return "다큐멘터리";
            case 18 : return "드라마";
            case 10751 : return "가족";
            case 14 : return "판타지";
            case 36 : return "사극";
            case 27 : return "호러";
            case 10402 : return "음악";
            case 9648 : return "미스터리";
            case 10749 : return "로맨스";
            case 878 : return "SF";
            case 10770 : return "TV";
            case 53 : return "스릴러";
            case 10752 : return "전쟁";
            case 37 : return "서부극";
        }
    }

    function printMovies(movie) {
        let result = movie.results //arr

        result.forEach(function(item, i) {
            let genreKr = item.genre_ids.map(function(genre) {
                return genreIdList(genre)
            });

            const movieCard = `
                <div class="swiper-slide" data-movie-id="${item.id}">
                    <div class="poster">
                        <div class="rank">${i+1}</div>
                        <img src="https://image.tmdb.org/t/p/original/${item.poster_path}" alt="">
                        <div class="rating">${item.vote_average}</div>
                    </div>
                    <div class="info">
                        <div class="title">${item.title}</div>
                        <div class="release">${item.release_date.split("-")[0]}</div>
                        <div class="genre">${genreKr}</div>
                    </div>
                </div>
            `
            $(".swiper-wrapper").append(movieCard);
        })//foreach
    }

    function renderInfo(data) {
        console.log(data);
        let title = data.title;
        let release = data.release_date;
        let summary = data.overview;
        // let genres = genreIdList(data.genre_ids);
        let genres = data.genres.map(function(genre) {
            return genre.name;
        });
        console.log(genres)
        let img = data.backdrop_path;

        $(".information .title").text(title);
        $(".information .release").text(release);
        $(".information .summary").text(summary);
        $(".information .genre").text(genres);
        $(".information .thumb").append(`<img src="https://image.tmdb.org/t/p/original/${img}">`)
    }

    fetch(apiUrl)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            // 성공
            // console.log(data.results[0]);
            printMovies(data);

        })
        .catch(function(err) {
            console.log(err);
        });

    $(document).on("click",".swiper-slide",function() {
        $(".information").css("display","block");
        let id = $(this).attr("data-movie-id");

        let idUrl = base + "/movie/" + id + "?" + key + lang
        fetch(idUrl)
            .then(function(res) {
                return res.json();
            })
            .then(function(data) {
                renderInfo(data);
            })
            .catch(function(err) {
                console.log(err);
            })
    });

});