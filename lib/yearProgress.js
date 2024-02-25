const { createCanvas } = require('canvas');
const fs = require('fs');

function drawProgressBarExact(
    percentage, 
    width = 2000, 
    height = 400, 
    barColor = 'rgb(0, 102, 204)', 
    bgColor = 'rgb(255, 255, 255)', 
    outlineColor = 'rgb(0, 0, 139)'
) {
    
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // fill background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // outer border dimensions
    const outerBorderThickness = 20;
    ctx.lineWidth = 10;
    ctx.strokeStyle = outlineColor;
    ctx.strokeRect(outerBorderThickness, outerBorderThickness, width - 2 * outerBorderThickness, height - 2 * outerBorderThickness);

    // inner border dimensions
    const innerBorderPadding = 30;
    const innerLeft = outerBorderThickness + innerBorderPadding;
    const innerTop = outerBorderThickness + innerBorderPadding;
    const innerWidth = width - 2 * (outerBorderThickness + innerBorderPadding);
    const innerHeight = height - 2 * (outerBorderThickness + innerBorderPadding);

    // calculate the length of the filled progress bar based on the percentage
    const fillLength = innerWidth * (percentage / 100.0);

    // draw the filled progress bar
    ctx.fillStyle = barColor;
    ctx.fillRect(innerLeft, innerTop, fillLength, innerHeight);

    ctx.strokeRect(innerLeft, innerTop, innerWidth, innerHeight); 

    return canvas;
}

function getCurrentYearPercentage() {
    // get today's date
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;

    // calculate the day of the year
    const dayOfYear = Math.floor(diff / oneDay);

    // check for a leap year
    const year = now.getFullYear();
    const isLeapYear = new Date(year, 1, 29).getMonth() == 1;

    // calculate the total number of days in the current year
    const totalDaysInYear = isLeapYear ? 366 : 365;

    // calculate the percentage of the year that has passed
    const percentageOfYearPassed = (dayOfYear / totalDaysInYear) * 100;

    return percentageOfYearPassed.toFixed(4)
};

function getYearPercentPayload(
    saveToImage=false
) {
    const currentYearPercent = getCurrentYearPercentage()
    const canvas = drawProgressBarExact(currentYearPercent);
    const canvasBuffer = canvas.toBuffer("image/png")

    if (saveToImage) {
        const filename = `bar_${Date.now()}.png`
        const out = fs.createWriteStream(filename);
        const stream = canvas.createPNGStream();
        stream.pipe(out);
        out.on('finish', () => console.log(`Created File: ${filename}`));
    }

    return {
        "percentage": currentYearPercent,
        "image": canvasBuffer
    }
}

module.exports = {
    getYearPercentPayload
}

