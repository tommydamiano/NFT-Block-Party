const numberWithCommas = (num) => { 
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const calculateSummaryStats = (usersToBlock) => {
    let mostFollowers = 0
    let oldestAcctDate = new Date('2022-03-04')
    let locations = {}
    let randomProfileName = ''
    let linkToProfile = ''
    const randomProfileNameNum = Math.floor(Math.random() * (usersToBlock.length - 1)) + 1

    for (userNum in usersToBlock) {
        if (usersToBlock[userNum]['followers'] > mostFollowers) {
            mostFollowers = numberWithCommas(usersToBlock[userNum]['followers'])
        }
        if (usersToBlock[userNum]['acct_created_date'] < oldestAcctDate) {
            oldestAcctDate = usersToBlock[userNum]['acct_created_date']
        }
        if (userNum == randomProfileNameNum) {
            randomProfileName = usersToBlock[userNum]['profile_name']
            linkToProfile = usersToBlock[userNum]['profile_url']
        }
        if (locations[usersToBlock[userNum]['location']]) {
            locations[usersToBlock[userNum]['location']]++
        } else {
            if (usersToBlock[userNum]['location'] != '') {
                locations[usersToBlock[userNum]['location']] = 1
            }
        }
    }
    
    const mostPopularLocation = Object.keys(locations).reduce((a, b) => locations[a] > locations[b] ? a : b)
    const usersOfMostPopularLocation = locations[mostPopularLocation]

    const summaryStats = {
        mostFollowers: mostFollowers, 
        oldestAcctDate: oldestAcctDate.toLocaleDateString(), 
        mostPopularLocation: mostPopularLocation, 
        usersOfMostPopularLocation: usersOfMostPopularLocation,
        randomProfileName: randomProfileName, 
        linkToProfile: linkToProfile
    }

    return summaryStats
}

module.exports = {
    calculateSummaryStats: calculateSummaryStats,
}
