$(document).ready(function (){
    featchMealDetails();

    $(document).on("click",".meal", function(){
        let mealId=$(this).data("id");
        // console.log(mealId);
        getValueByID(mealId);
    });
    $(".close-btn").click(function(){
        $("#meal-model").fadeOut();
    })
    $(window).on("click",function(e){
        if(e.target.id==="meal-model")
        {
            $("#meal-model").fadeOut();
        }
    });
    $("#searchButton").on("click",function(){
        let item =$("#searchBox").val();
        searchFoodItem(item);
    })
});
function searchFoodItem(item)
{
    $("#meal-list").html("<p id ='loading-text'>Searching...</p>");
    $.ajax(
        {
            url:`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`,
            method:"GET",
            success:function(data){
                $("#meal-list").html("");
                $("#loading-text").hide();
                if(data.meals){
                    data.meals.forEach(element => {
                        foodCard(element);
                    });
                }
                else{
                    $("#meal-list").html("<p > Food item Not Found</p>");
                }
            }
        }
    );
}
function getValueByID(id)
{
    $.ajax(
        {
            url:`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
            method :"GET",
            success : function(data){
                const meal =data.meals[0];
                $("#meal-details h2").text(meal.strMeal);
                $("#meal-details img").attr("src",meal.strMealThumb);
                 $("#meal-details img").attr("alt",meal.strMeal);
                $("#meal-details p").html(meal.strInstructions);
                $("#meal-details a").attr("href",meal.strYoutube);
                $("#meal-model").fadeIn();
            },
            error: function(xhr, status, error) {
    console.error("AJAX Error: ", error);
}
        }
    );
}
function featchMealDetails()
{
    $("#meal-list").html("<p id ='loading-text'>Loading...</p>");
    let mealLoaded=0;

    for(let i=0;i<=15;i++)
    {
        $.ajax({
            url:`https://www.themealdb.com/api/json/v1/1/random.php`,
            method :"GET",
            success : function (meal){
                // console.log(meal.meals[0]);
                 foodCard(meal.meals[0]);
                mealLoaded++;
                if(mealLoaded ===2){
                        $("#loading-text").hide();
                    }
            },
        });
        
    }
    
}
function foodCard(meal)
{
    $("#meal-list").append(`
        <div class="meal" data-id ="${meal.idMeal}">
            <img src ="${meal.strMealThumb}" alt ="${meal.strMeal}"/>
            <h3 title='${meal.strMeal}'>${meal.strMeal}</h3>
        </div> `);
}