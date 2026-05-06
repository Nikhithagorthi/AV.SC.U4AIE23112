const weights = {
    Placement: 10,
    Result: 7,
    Event: 4
};

function calculateScore(notification) {

    const typeWeight = weights[notification.Type] || 1;

    const createdTime = new Date(notification.Timestamp).getTime();

    const now = Date.now();

    const ageMinutes = (now - createdTime) / (1000 * 60);

    const recencyScore = Math.max(0, 100 - ageMinutes);

    return typeWeight * 100 + recencyScore;
}

function getTopNotifications(notifications, topN = 10) {

    return notifications
        .map(n => ({
            ...n,
            priorityScore: calculateScore(n)
        }))
        .sort((a, b) => b.priorityScore - a.priorityScore)
        .slice(0, topN);
}

module.exports = getTopNotifications;