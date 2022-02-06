$(function () {
  let catchNameField = () => {
    return $('[name="name"]').val();
  };
  let catchDateField = () => {
    return $('[name="date"]').val();
  };
  let catchCastField = () => {
    return $('[name="cast"]').val();
  };
  let catchCountryField = () => {
    return $('[name="origin_country"]').val();
  };

  let createMovie = () => {
    let movieObject = {
      name: catchNameField(),
      publish_date: catchDateField(),
      cast: catchCastField(),
      origin_country: catchCountryField(),
    };
    return movieObject;
  };

  $('[ data-role="addBtn"]').click(() => {
    let movie = createMovie();
    $.post("/addMovie", movie, (movie) => {
      console.log(movie);
    });
    resetFields();
  });

  let selectMoviesList = $("<select>");

  let getAllMovies = () => {
    $.get("/allMovies", (moviesData) => {
      $.each(moviesData, (_, movie) => {
        let option = $("<option>");
        option.text(movie.name).attr("value", movie._id);
        selectMoviesList.append(option);
      });
      $(".result").append(selectMoviesList);
    });
  };

  let selectMovie = () => {
    $(selectMoviesList).change(() => {
      $.get("/movie/" + $(selectMoviesList).val(), (movie) => {
        let date = new Date(movie.publish_date).toISOString().slice(0, 10);
        $('[name="date"]').val(date);
        $.each(movie, (key, value) => {
          let input = $(`[name=${key}]`);
          input.val(value);
        });
      });
    });
  };

  $('[data-role="updateBtn"]').click(() => {
    getAllMovies();
    selectMovie();
  });

  $('[data-role="saveBtn"]').click(() => {
    let newMovie = createMovie();
    $.ajax({
      url: "/updateMovie/" + $(selectMoviesList).val(),
      type: "PUT",
      data: newMovie,
      success: function () {
        alert("Data was saved.");
      },
    });
    $(selectMoviesList).remove();
    resetFields();
  });

  $('[data-role="lastMovie"]').click(() => {
    fetch("/lastMovie")
      .then((response) => response.json())
      .then((movie) => showData(movie))
      .catch((err) => console.log(err));
  });

  function showData(movie) {
    $.each(movie, (key, value) => {
      if (key === "__v") {
        key.html("");
      }
      let movieObj = $(`<p class='movie'> ${key} :${value}</p>`);
      $(".result").append(movieObj);
    });
  }

  $('[data-role="country"]').click(() => {
    let countryInput = $("<input>");
    let findBtn = $('<input type="button">').val("Find");
    $(".result").append(countryInput, findBtn);
    $(findBtn).click(() => {
      $.get("/findMovie/" + $(countryInput).val(), (movie) => {
        showData(movie);
      });
      findBtn.remove();
      countryInput.remove();
    });
  });

  $('[data-role="movieId"]').click(() => {
    getAllMovies();
    $(selectMoviesList).change(() => {
      let movieId = $(selectMoviesList).val();
      $.get("/findMovie/" + movieId, (movie) => {
        console.log(movie);
      });
      $.get("/download", () => {
        window.open("/download");
      });
    });
  });

  let resetFields = () => {
    $("input[type=text]").val("");
    $("input[type=date]").val("");
  };
});
