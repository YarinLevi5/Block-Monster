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

  let getAllMovies = (selectMovie) => {
    $.get("/allMovies", (moviesData) => {
      $.each(moviesData, (_, movie) => {
        let option = $("<option>");
        option.text(movie.name);
        option.attr("value", movie._id);
        selectMoviesList.append(option);
      });
      $(".wrapper").append(selectMoviesList);
    });
    selectMovie();
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
    getAllMovies(selectMovie);
  });

  $('[data-role="saveBtn"]').click(() => {
    let newMovie = createMovie();
    $.ajax({
      url: "/updateMovie/" + $(selectMoviesList).val(),
      type: "PUT",
      data: newMovie,
      success: function (data) {
        alert("Data was saved.");
      },
    });
    resetFields();
  });

  let resetFields = () => {
    $("input[type=text]").val("");
    $("input[type=date]").val("");
  };
});
