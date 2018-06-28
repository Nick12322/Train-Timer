var config = {
    apiKey: "AIzaSyAyzLLX0tGQNNp-p57RhZnbOULbco06uYs",
    authDomain: "bootcamp-first-firebase.firebaseapp.com",
    databaseURL: "https://bootcamp-first-firebase.firebaseio.com",
    projectId: "bootcamp-first-firebase",
    storageBucket: "bootcamp-first-firebase.appspot.com",
    messagingSenderId: "648640496565"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#trainSubmit").on("click", function() {
      var trainName = $("#trainAdd").val().trim();
      var trainDestination = $("#destinationAdd").val().trim();
      var firstTime = $("#firstTime").val().trim();
      var frequency = $("#frequencyAdd").val().trim();
      var currentTime = moment();
      var firstArrivalConverted = moment(firstTime, "HH:mm").subtract(1, "years");
      var diffTime = moment().diff(moment(firstArrivalConverted), "minutes")
      var tRemainder = diffTime % frequency;
      var minsUntilArrival = frequency - tRemainder;
      var nextArrival = moment().add(minsUntilArrival, "minutes");


      database.ref().push({
          trainName: trainName,
          trainDestination: trainDestination,
          firstTime: firstTime,
          frequency: frequency,
          nextArrival: moment(nextArrival).format("hh:mm"),
          minsUntilArrival: minsUntilArrival
        });
      
      $("input").val(""); 


      
  });

  database.ref().on("child_added", function (snapshot){
      var trainAdded = "<tr>" + "<td>" + snapshot.val().trainName + "<td>" + snapshot.val().trainDestination + "<td>" + snapshot.val().frequency + "<td>" + snapshot.val().nextArrival + "<td>" + snapshot.val().minsUntilArrival;
      $("tbody").append(trainAdded);
  })

