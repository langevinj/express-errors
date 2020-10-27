const express = require('express');
const ExpressError = require('./expressError')
const fs = require('fs')

const app = express();

app.use(express.json());

// app.use((req, res, next) => {
//     console.log("THE SERVER GOT A REQUEST");
//     next();
// })


//route for the mean of given numbers
app.get('/mean', function(req, res, next) {
    let nums = req.query['nums'].split(",");
    try{
        if(req.query['nums'] == "") {throw new ExpressError("empty string, nums are required", 400)}
    } catch (e) {
        next(e);
    }
    for (num of nums) {
        try {
            if (isNaN(parseFloat(num))) { throw new ExpressError(`${num} is not a number.`, 400) }
        } catch (err) {
            next(err);
        }
    }
    let mean = calcMean(nums)

    return res.send({
        operation: "mean",
        value: mean,
    });
});

// route for median of given numbers
app.get('/median', function(req, res, next){
    let nums = req.query['nums'].split(",")
    try{
        if (req.query['nums'] == "") { throw new ExpressError("empty string, nums are required", 400) }
    } catch(err){
        next(err)
    }
    for (num of nums) {
        try {
            if (isNaN(parseFloat(num))) { throw new ExpressError(`${num} is not a number.`, 400) }
        } catch (err) {
            next(err);
        }
    }
    
    let median = calcMedian(nums)

    return res.send({
        operation: "median",
        value: median,
    })
});


// route for mode of given numbers
app.get('/mode', function(req, res, next){
    let nums = req.query['nums'].split(",")
    try {
        if (req.query['nums'] == "") { throw new ExpressError("empty string, nums are required", 400) }
    } catch (err) {
        next(err)
    }
    for (num of nums) {
        try {
            if (isNaN(parseFloat(num))) { throw new ExpressError(`${num} is not a number.`, 400) }
        } catch (err) {
            next(err);
        }
    }

    let mode = calcMode(nums);
    
    return res.send({
        operation: "mode",
        value: mode,
    })
});

//all three functions at once
app.get('/all', function(req, res, next){
    let nums = req.query['nums'].split(",")
    try {
        if (req.query['nums'] == "") { throw new ExpressError("empty string, nums are required", 400) }
    } catch (err) {
        next(err)
    }
    for (num of nums) {
        try {
            if (isNaN(parseFloat(num))) { throw new ExpressError(`${num} is not a number.`, 400) }
        } catch (err) {
            next(err);
        }
    }
    let mean = calcMean(nums);
    let median = calcMedian(nums);
    let mode = calcMode(nums);

    let resultJSON = {
        operation: "all",
        mean: mean,
        median: median,
        mode: mode
    }
    
    let save = req.query['save']

    if(save && save == "true"){
        fs.writeFile('./results.json', JSON.stringify(resultJSON), "utf8", function(err)  {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    }
    return res.send(resultJSON)
})


// app.use((req, res, next) => {
//     const e = new ExpressError("Page Not Found", 404)
//     next(e)
// })

//calculate mean given an array of strings representing numbers
function calcMean(nums){
    let sum = 0;
    for(num of nums){
        sum += parseFloat(num)
    }
    let avg = (sum / (nums.length))
    return avg;
}

//calculate median given an array of strings representing numbers
function calcMedian(nums){
    let convertedNums = nums.map(x => parseFloat(x))
    convertedNums.sort(function (a, b) { return a - b });
    let median;

    if (convertedNums.length % 2 !== 0) {
        let halfway = Math.floor((nums.length) / 2)
        median = convertedNums[halfway]
    } else {
        let halfway = Math.floor((nums.length) / 2);
        median = (convertedNums[halfway - 1] + convertedNums[halfway]) / 2.0;
    }
    return median;
}

//calculate mode given an array of strings representing numbers
function calcMode(nums){
    let convertedNums = nums.map(x => parseFloat(x));
    convertedNums.sort(function (a, b) { return a - b });

    let countArray = [];
    for (let i = 0; i <= convertedNums[convertedNums.length - 1]; i++) {
        let count = convertedNums.filter(x => x == i).length
        countArray.push(count)
    }
    let mode = 0;
    let k = countArray[0]
    for (let z = 0; z < countArray.length; z++) {
        if (countArray[z] > k) {
            k = countArray[z]
            mode = z;
        }
    }  
    
    return mode;
}

app.use(function (err, req, res, next) {
    //default status of 500 Internal Server error
    let status = err.status || 500;
    let message = err.msg;

    return res.status(status).json({
        error: { message, status }
    });
});


app.listen(3000, () => {
    console.log("Server running on port 3000")
});