const fs = require('fs');

// Read the text file
fs.readFile('EJP137010123.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }


    // Use a regular expression to find all OR No. values
    const orNumbers = [];
    const regex = /OR No.:\s*(\d+)/g;

    let match;
    while ((match = regex.exec(data)) !== null) {
        orNumbers.push(match[1]); // Push the OR No. to the array
    }

    orNumbers.sort()
    
    function findMissingNumbers(array) {
        let properties = Object.values(array);
        console.log(properties)
        let arrayLength = properties.length;
        const arrayContainer = [];
    
        for (let i = 0; i < arrayLength - 1; i++) {
            let current = Number(properties[i]);
            let next = Number(properties[i + 1]);
    
            // Check if there is a gap of more than 1
            if (next - current > 1) {
                for (let j = current + 1; j < next; j++) {
                    arrayContainer.push(j);
                }
            }
        }
    
        return arrayContainer;
    }
    // Function to find missing OR numbers
    
    

    // Function to find duplicates
    function findDuplicates(numbers) {
        const counts = {};
        const duplicates = [];



        numbers.forEach(num => {
            counts[num] = (counts[num]|| 0) + 1
            });

        
        for (const [key, count] of Object.entries(counts)) {
            if (count > 1) {
                duplicates.push({[key]: count});
            }
        }

        return duplicates;
    }

    function countSpecificNumber(numbers, target) {
        // Create an object to count occurrences
        const counts = {};
        
        // Count occurrences of each number
        numbers.forEach(num => {
            counts[num] = (counts[num] || 0) + 1;
        });
    
        // Return the count for the target number or 0 if not found
        return counts[target] || 0;
    }
    


    // Find and print missing OR numbers
    const missingORNumbers = findMissingNumbers(orNumbers);
    if (missingORNumbers.length > 0) {
        console.log('Missing OR No.s:', missingORNumbers);
    } else {
        console.log('No missing OR No.s found.');
    }

    // Find and print duplicate OR numbers
    const duplicateORNumbers = findDuplicates(orNumbers);

    if (duplicateORNumbers.length > 0) {
        console.log('Duplicate OR No.s:', duplicateORNumbers);
    } else {
        console.log('No duplicate OR No.s found.');
    }
});


/*const axios = require('axios');

// Function to fetch the text file from a URL
async function fetchData(url) {
    try {
        const response = await axios.get(url);
        const data = response.data;

        // Use a regular expression to find all OR No. values
        const orNumbers = [];
        const regex = /"No":\s*(\d+)/g;

        let match;
        while ((match = regex.exec(data)) !== null) {
            orNumbers.push(match[1]); // Push the OR No. to the array
        }

        console.log(orNumbers);

        // Function to find missing OR numbers
        function findMissingNumbers(numbers) {
            if (numbers.length === 0) return []; // Handle empty array

            const missingNumbers = [];
            const numberSet = new Set(numbers.map(num => BigInt(num)));

            const min = BigInt(Math.min(...numbers.map(Number)));
            const max = BigInt(Math.max(...numbers.map(Number)));

            for (let i = min; i <= max; i++) {
                if (!numberSet.has(i)) {
                    missingNumbers.push(i.toString().padStart(19, '0'));
                }
            }

            return missingNumbers;
        }

        // Function to find duplicates
        function findDuplicates(numbers) {
            const counts = {};
            const duplicates = [];

            numbers.forEach(num => {
                counts[num] = (counts[num] || 0) + 1;
            });

            for (const [key, count] of Object.entries(counts)) {
                if (count > 1) {
                    duplicates.push({ [key]: count });
                }
            }

            return duplicates;
        }

        function countSpecificNumber(numbers, target) {
            const counts = {};
            numbers.forEach(num => {
                counts[num] = (counts[num] || 0) + 1;
            });
            return counts[target] || 0;
        }

        // Find and print missing OR numbers
        const missingORNumbers = findMissingNumbers(orNumbers);
        if (missingORNumbers.length > 0) {
            console.log('Missing OR No.s:', missingORNumbers);
        } else {
            console.log('No missing OR No.s found.');
        }

        // Find and print duplicate OR numbers
        const duplicateORNumbers = findDuplicates(orNumbers);
        if (duplicateORNumbers.length > 0) {
            console.log('Duplicate OR No.s:', duplicateORNumbers);
        } else {
            console.log('No duplicate OR No.s found.');
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Replace with your actual URL
fetchData('http://localhost:3002/api/dataRoute/');*/