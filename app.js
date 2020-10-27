const express = require('express');
const ExpressError = require('./expressErrors')

const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

//route for the mean of given numbers
// app.get('/mean', function(req, res, next){
//     let nums = req.query['nums'].split(",");
//     let sum = 0;
    
//     try {
//         if (typeof("fppr") != Number) {
//             console.log("error")
//             throw new ExpressError("Hello", 400);
//         }
//         return res.send({hi: "hi there"})
//         // for (num of nums) {
//         //     console.log(num)
//         //     if (typeof (num) != Number) throw new ExpressError("Hello", 400);
//         //     sum += parseFloat(num);
//         // }
//         // let avg = (sum / (nums.length))
//         // return res.json({
//         //     operation: "mean",
//         //     value: avg,
//         // });
//     } catch (err){
//         return next(err);
//     }
// });

app.get('/test', function(req, res, next){
    let user = true;
    try{
        if(user) throw new ExpressError("testing test", 400);
        return res.send({hi: "hi there"})
    } catch(err){
        return next(err);
    }
})

//route for median of given numbers
// app.get('/median', function(req, res){
//     let nums = req.query['nums'].split(",")
//     let convertedNums = nums.map(x => parseFloat(x))
//     convertedNums.sort(function(a,b){return a - b});
//     let median;

//     if(convertedNums.length % 2 !== 0){
//         let halfway = Math.floor((nums.length) / 2)
//         median = convertedNums[halfway]
//     } else {
//         let halfway = Math.floor((nums.length) / 2);
//         median = (convertedNums[halfway - 1] + convertedNums[halfway]) / 2.0;
//     }
//     return res.send({
//         operation: "median",
//         value: median,
//     })
// })

//route for mode of given numbers
// app.get('/mode', function(req, res){
//     let nums = req.query['nums'].split(",");
//     let convertedNums = nums.map(x => parseFloat(x));
//     convertedNums.sort(function (a, b) { return a - b });
//     let countArray = [];
//     for(let i=0; i <= convertedNums[convertedNums.length - 1]; i++){
//         let count = convertedNums.filter(x => x==i).length
//         countArray.push(count)
//     }
//     let mode = 0;
//     let k = countArray[0]
//     for(let z=0; z < countArray.length; z++){
//         if(countArray[z] > k){
//             k = countArray[z]
//             mode = z;
//         }
//     }

//     return res.send({
//         operation: "mode",
//         value: mode,
//     })
// });


// app.use((req, res, next) => {
//     const e = new ExpressError("Page Not Found", 404)
//     next(e)
// })

app.use(function (err, req, res, next) {
    //default status of 500 Internal Server error
    let status = err.status || 500;
    let message = err.message;

    return res.status(status).json({
        error: { message, status }
    });
});


app.listen(3000, () => {
    console.log("Server running on port 3000")
});