const _colorFromStr = (str) => {
    return "#" + parseInt(parseInt(str, 36).toExponential().slice(2)  & 0xFFFFFF).toString(16).toUpperCase()
}

const timeAgo =  (timestamp) => {
    let date = timestamp.toDate()
    // we need Unix timestamp so we have to get rid of last three difits.
    let diff = (Date.now()/1000) - (date.getTime()/1000)
    if (diff <= 60)
        return (diff == 1) ? 'Just now' : `${diff} secs ago`
    else if (diff >= 60 && diff <= 3600)
        return (diff / 60 == 1) ? "mint ago" : `${Math.round(diff / 60)} mins ago`
    else if (diff >= 3600 && diff <= 86400)
            return (diff / 3600 == 1) ? "An hr ago" : `${Math.round(diff / 3600)} hrs ago`
    else if (diff >= 86400 && diff <= 604800)
            return (diff / 86400 == 1) ? "Day ago" : `${Math.round(diff / 86400)} days ago`
    else if (diff >= 604800 && diff <= 2600640)
            return (diff / 604800 == 1) ? "Week ago" : `${Math.round(diff / 604800)} weeks ago`
    else if (diff >= 2600640 && diff <= 31207680)
            return (diff / 2600640 == 1) ? "Month ago" : `${Math.round(diff / 2600640)} Months ago`
    else if (diff >= 31207680)
        return (diff / 31207680 == 1) ? "Yr ago" : `${Math.round(diff / 31207680)} yrs ago`
}

export {
    _colorFromStr,
    timeAgo
}